import { normalize, schema } from 'normalizr';
import {
  UPDATE_FIELD_INSTANCE,
} from "constants/ActionTypes";


const repositorySchema = new schema.Entity('repositories');
const instanceSchema = new schema.Entity('instances', {
  repository_link: repositorySchema,
});
const pullOwnerSchema = new schema.Entity('pullRequestOwners');
const pullRequestSchema = new schema.Entity('pullRequests', {
    instance: instanceSchema,
    user: pullOwnerSchema,
});
const pullRequestSchemaList = new schema.Array(pullRequestSchema);

const initialState = {
  loading: false,
  instances: {},
  pullRequests: {},
  pullRequestOwners: {},
  repositories: {},
  error: null,
}

const instances = (state=initialState, action) => {
  switch (action.type) {
    case 'GET_INSTANCES_REJECTED':
      return { ...initialState, ...action.payload.data, loading: false };

    case 'GET_INSTANCES_FULFILLED':
      var data = normalize(action.payload.data, pullRequestSchemaList);
      return {
        ...state,
        ...data.entities,
        loading: false,
      };

    case 'GET_INSTANCES_PENDING':
      return { ...state, loading: true };

    case 'TERMINATE_INSTANCE_PENDING':
    case 'START_INSTANCE_PENDING':
    case 'STOP_INSTANCE_PENDING':
      var instance_id = action.meta.instance.id
      var instances = { ...state.instances };
      instances[instance_id].loading = true;
      return { ...state, instances: instances };

    case 'TERMINATE_INSTANCE_FULFILLED':
    case 'STOP_INSTANCE_FULFILLED':
    case 'START_INSTANCE_FULFILLED':
    case 'TERMINATE_INSTANCE_REJECTED':
    case 'START_INSTANCE_REJECTED':
    case 'STOP_INSTANCE_REJECTED':
      if (action.error) {
        var payload = action.payload.response.data;
      } else {
        var payload = action.payload.data;
      }
      var data = normalize(payload, pullRequestSchema);
      var pullRequests = { ...state.pullRequests };
      var instances = { ...state.instances };
      var repositories = { ...state.repositories };

      for (var key in data.entities.pullRequests) {
        var pullRequest = data.entities.pullRequests[key];
        pullRequests[key] = pullRequest;
      }

      for (var key in data.entities.instances) {
        var instance = data.entities.instances[key];
        instance.loading = false;
        instances[key] = instance;
      }

      for (var key in data.entities.repositories) {
        var repo = data.entities.repositories[key];
        repositories[key] = repo;
      }

      return { ...state, pullRequests, instances, repositories };


    case UPDATE_FIELD_INSTANCE:
      var instances = { ...state.instances };
      instances[action.instanceId][action.key] = action.value
      return { ...state, instances: instances };

    default:
      return { ...state };
  }
};

export default instances;
