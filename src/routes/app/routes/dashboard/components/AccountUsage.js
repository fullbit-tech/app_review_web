import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';


class InstanceCreditUsage extends React.Component {
  constructor(props) {
    super(props);
    var daysInMonth = this.props.monthDayRange();
    var creditLimitData = this.props.createMonthlyLimitData(100);
    this.options = {
      tooltip: {
        trigger: 'axis'
      },
      calculable: true,
      xAxis: [
        {
          name: "Day of the Month",
          nameLocation: 'middle',
          nameGap: 35,
          type: 'category',
          boundaryGap: false,
          data: daysInMonth,
          splitLine: {
            lineStyle: {
              color: CHARTCONFIG.color.splitLine
            }
          }
        }
      ],
      yAxis: [
        {
          name: "Credits Used",
          nameLocation: 'middle',
          nameGap: 35,
          type: 'value',
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: CHARTCONFIG.color.text
            }
          },
          splitLine: {
            lineStyle: {
              color: CHARTCONFIG.color.splitLine
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: CHARTCONFIG.color.splitArea
            }
          }
        }
      ],
      series: [
        {
          name: 'Avaialable Credits',
          type: 'line',
          data: creditLimitData,
          markPoint: {
            data: [
              {type: 'max', name: 'Max'},
            ]
          },
          markLine: {
            data: [
              {type: 'max', name: 'Max'}
            ]
          }
        },
        {
          name: 'Credits Used',
          type: 'line',
          data: [1, 2, 5, 8, 12, 14, 14, 23, 34, 56, 56, 56, 61],
          markPoint: {
            data: [
              {type: 'max', name: 'Max'},
            ]
          },
        }
      ]
    };
  }


  render() {
    return(
      <div className="box box-default">
        <div className="box-heading">Credit Usage {"(61/100 credits)"}</div>
        <div className="box-body">
          <ReactEcharts option={this.options} showLoading={false} />
        </div>
      </div>
    );
  }
}

class AccountUsage extends React.Component {

  daysInThisMonth() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  }

  monthDayRange() {
    var days = this.daysInThisMonth();
    return Array.from(new Array(days), (val, index) => index + 1);
  }

  createMonthlyLimitData(limit) {
    return Array.from(new Array(this.daysInThisMonth()), (val, index) => limit);
  }

  render() {
    return(
      <InstanceCreditUsage
        monthDayRange={this.monthDayRange.bind(this)}
        createMonthlyLimitData={this.createMonthlyLimitData.bind(this)}
        daysInThisMonth={this.daysInThisMonth.bind(this)} />
    );
  }
};

module.exports = AccountUsage;
