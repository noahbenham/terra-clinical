/**
 * Given a route configuration and size, returns an Array of ordered routing data objects
 * representing the routes available at that size.
 */
const flattenRouteConfig = (routeConfig, size, parentPaths) => {
  if (!routeConfig) {
    return undefined;
  }

  const routes = Object.keys(routeConfig).map((routeKey) => {
    const config = routeConfig[routeKey];

    let componentConfig;

    if (typeof (config.component) === 'object') {
      const configForSize = config.component[size];

      if (configForSize) {
        componentConfig = configForSize;
      }

      if (configForSize === undefined && config.component.default) {
        componentConfig = config.component.default;
      }
    }

    let routeData = [];
    if (config.children) {
      let updatedParentPaths = [];
      if (parentPaths) {
        updatedParentPaths = updatedParentPaths.concat(parentPaths);
      }

      if (componentConfig) {
        updatedParentPaths.push(config.path);
      }

      routeData = flattenRouteConfig(config.children, size, updatedParentPaths);
    }

    // If a component does not exist for the route, and if the route has no child routes, then we can ignore it.
    if (!componentConfig && !routeData.length) {
      return undefined;
    }

    if (componentConfig && componentConfig.componentClass) {
      routeData.push({
        path: config.path,
        parentPaths,
        exact: config.exact,
        strict: config.strict,
        key: config.key || config.path,
        meta: config.meta,
        componentClass: componentConfig.componentClass,
        componentProps: config.props,
      });
    }

    return routeData;
  });

  return [].concat(...routes);
};

export { flattenRouteConfig };
