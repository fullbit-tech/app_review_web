import React from 'react';
import { Link, hashHistory } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import 'jquery-slimscroll/jquery.slimscroll.min';


class SidebarContent extends React.Component {

  componentDidMount() {
    const nav = this.nav;
    const $nav = $(nav);

    // scroll
    $nav.slimscroll({
      height: '100%'
    });


    // Append icon to submenu
    // Append to child `div`
    $nav.find('.prepend-icon').children('div').prepend('<i class="material-icons">keyboard_arrow_right</i>');


    // AccordionNav
    const slideTime = 250;
    const $lists = $nav.find('ul').parent('li');
    $lists.append('<i class="material-icons icon-has-ul">arrow_drop_down</i>');
    const $As = $lists.children('a');

    // Disable A link that has ul
    $As.on('click', event => event.preventDefault());

    // Accordion nav
    $nav.on('click', (e) => {

      const target = e.target;
      const $parentLi = $(target).closest('li'); // closest, insead of parent, so it still works when click on i icons
      if (!$parentLi.length) return; // return if doesn't click on li
      const $subUl = $parentLi.children('ul');


      // let depth = $subUl.parents().length; // but some li has no sub ul, so...
      const depth = $parentLi.parents().length + 1;

      // filter out all elements (except target) at current depth or greater
      const allAtDepth = $nav.find('ul').filter(function () {
        if ($(this).parents().length >= depth && this !== $subUl.get(0)) {
          return true;
        }
        return false;
      });
      allAtDepth.slideUp(slideTime).closest('li').removeClass('open');

      // Toggle target
      if ($parentLi.has('ul').length) {
        $parentLi.toggleClass('open');
      }
      $subUl.stop().slideToggle(slideTime);

    });


    // HighlightActiveItems
    const $links = $nav.find('a');
    const currentLocation = hashHistory.getCurrentLocation();
    function highlightActive(pathname) {
      const path = `#${pathname}`;

      $links.each((i, link) => {
        const $link = $(link);
        const $li = $link.parent('li');
        const href = $link.attr('href');
        // console.log(href);

        if ($li.hasClass('active')) {
          $li.removeClass('active');
        }
        if (path.indexOf(href) === 0) {
          $li.addClass('active');
        }
      });
    }
    highlightActive(currentLocation.pathname);
    hashHistory.listen((location) => {
      highlightActive(location.pathname);
    });
  }


  render() {

    return (
      <ul className="nav" ref={(c) => { this.nav = c; }}>
        <li className="nav-header"><span>Where To?</span></li>
        <li><FlatButton href="#/app/dashboard"><i className="nav-icon material-icons">dashboard</i><span className="nav-text">Dashboard</span></FlatButton></li>
        <li><FlatButton href="#/app/instances"><i className="nav-icon material-icons">cloud</i><span className="nav-text">Pull Request Instances</span></FlatButton></li>
        <li><FlatButton href="#/app/repositories"><i className="nav-icon material-icons">link</i><span className="nav-text">Linked Repositories</span></FlatButton></li>
        <li><FlatButton href="#/app/recipes"><i className="nav-icon material-icons">code</i><span className="nav-text">Recipes</span></FlatButton></li>
        <li>
          <FlatButton href="#/app/account"><i className="nav-icon material-icons">account_box</i><span className="nav-text">Account</span></FlatButton>
          <ul>
            <li><FlatButton href="#/app/account/settings"><i className="nav-icon material-icons">settings</i><span>Settings</span></FlatButton></li>
            <li><FlatButton href="#/app/account/billing"><i className="nav-icon material-icons">credit_card</i><span>Billing Information</span></FlatButton></li>
            <li><FlatButton href="#/app/account/invoices"><i className="nav-icon material-icons">attach_money</i><span>Invoices</span></FlatButton></li>
            <li><FlatButton href="#/app/account/usage"><i className="nav-icon material-icons">multiline_chart</i><span>Instance Usage</span></FlatButton></li>
          </ul>
        </li>
        <li>
          <FlatButton href="#/app/support"><i className="nav-icon material-icons">help</i><span className="nav-text">Support</span></FlatButton>
          <ul>
            <li><FlatButton href="#/app/support/faq"><i className="nav-icon material-icons">question_answer</i><span>FAQs</span></FlatButton></li>
            <li><FlatButton href="#/app/account/report-bug"><i className="nav-icon material-icons">bug_report</i><span>Report Bug</span></FlatButton></li>
            <li><FlatButton href="#/app/account/contact"><i className="nav-icon material-icons">email</i><span>Contact</span></FlatButton></li>
          </ul>
        </li>
        <li className="nav-divider" />
      </ul>
    );
  }
}

module.exports = SidebarContent;
