// Файл Routes.js

import {Navigate, Route, Routes as ReactRoutes, useLocation} from "react-router-dom";

const Routes = ({ routes, auth }) => {
  const location = useLocation();
  const RoutesMap = routes.map(
    ({ Private, exact = true, Layout = ({ children }) => <>{children}</>, modules, Component, path }) => {
      const ComponentWithLayout = () => {
        return (
          <Layout>
            <Component />
          </Layout>
        );
      };
      return Private
        ? [
          <Route
            exact={exact}
            element={<ComponentWithLayout />}
            path={path}
          />,
          modules &&
          modules.map(childrenProps => (
            <Route
              exact={childrenProps.exact}
              element={
                <Layout>
                  <childrenProps.Component />
                </Layout>
              }
              path={path + childrenProps.path}
            />
          ))
        ]
        : [
          <Route
            exact={exact}
            element={<ComponentWithLayout />}
            path={path}
          />,
          modules &&
          modules.map(childrenProps => (
            <Route
              exact={childrenProps.exact}
              element={
                <Layout>
                  <childrenProps.Component />
                </Layout>
              }
              path={path + childrenProps.path}
            />
          ))
        ];
    }
  );
  return <ReactRoutes location={location}>
    {RoutesMap}
    <Route path="*" element={<Navigate to="/main" replace />} />
  </ReactRoutes>;
};

export default Routes;
