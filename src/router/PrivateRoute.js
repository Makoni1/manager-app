// Файл PrivateRoute.js

import {Navigate, Route} from "react-router-dom";

const PrivateRoute = props => {
  return (
    <Route
      element={props.auth ? <props.component /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
