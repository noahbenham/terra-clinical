import React from 'react';
import ReactDOM from 'react-dom';

// import PatientApplication from './demo/patient-application/PatientApplication';
import PatientApplication from './navigation-application/powerchart-web/PowerchartWebApplication';
import LayoutApplication from './navigation-application/layout-example/LayoutApplication';

import './index.scss';

(function () {
  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
}());

ReactDOM.render(<LayoutApplication userInfo={{ name: 'Biethman, Tyler', location: 'Children\'s Mercy' }} />, document.getElementById('terra-ApplicationMount'));

