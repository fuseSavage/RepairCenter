import React, { Suspense } from "react";
import { Route } from "react-router-dom";
// import Cookies from 'js-cookie'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Suspense fallback={null}>
          <Component {...props} />
        </Suspense>
      )}
    />
  );
};

export default ProtectedRoute;
