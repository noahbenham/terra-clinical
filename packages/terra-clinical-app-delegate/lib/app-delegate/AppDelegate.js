'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The ComponentDisclosureRegistry will hold a mapping of string to Component values that users of the AppDelegate
 * can use to construct component instances from data in the disclose API.
 *
 * It is not exposed, expect through the AppDelegate, to prevent unneccesary manipulation.
 */

var ComponentDisclosureRegistry = {};

var getComponent = function getComponent(key) {
  return ComponentDisclosureRegistry[key];
};

var registerComponent = function registerComponent(key, Component) {
  ComponentDisclosureRegistry[key] = Component;
};

var AppDelegateInstance = function AppDelegateInstance(data) {
  _classCallCheck(this, AppDelegateInstance);

  // Required API's
  this.disclose = data.disclose;

  // Optional API's
  this.dismiss = data.dismiss;
  this.closeDisclosure = data.closeDisclosure;
  this.goBack = data.goBack;
  this.maximize = data.maximize;
  this.minimize = data.minimize;
};

var create = function create(data) {
  return Object.freeze(new AppDelegateInstance(data));
};

var createDescendant = function createDescendant(delegate, data) {
  var ancestorDelegate = delegate || {};

  return create({
    disclose: data.disclose || ancestorDelegate.disclose,
    dismiss: data.dismiss || ancestorDelegate.dismiss,
    closeDisclosure: data.closeDisclosure || ancestorDelegate.closeDisclosure,
    goBack: data.goBack || ancestorDelegate.goBack,
    maximize: data.maximize || ancestorDelegate.maximize,
    minimize: data.minimize || ancestorDelegate.minimize
  });
};

// Factory to limit the creation of these App objects.
var AppDelegate = {
  propType: _react.PropTypes.instanceOf(AppDelegateInstance),
  create: create,
  createDescendant: createDescendant,
  registerComponent: registerComponent,
  getComponent: getComponent
};

exports.default = AppDelegate;