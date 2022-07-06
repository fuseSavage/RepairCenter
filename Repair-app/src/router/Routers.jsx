import React from "react";
// import React, { useEffect, useState } from "react";
// Router
import {
  BrowserRouter as AppRouter,
  Route,
  Switch,
} from "react-router-dom";

// Routes
import { Routes } from "./routes";

// Layouts
import VerticalLayout from "../Layouts/VerticalLayout";
import FullLayout from "../Layouts/FullLayout";
// import DashboardLayout from "../Layouts/DashboardLayout";

// Components

import ProtectedRoute from "../ProtectdRoute";

export default function Routers() {


  // Default Layout
  const DefaultLayout = null; // FullLayout or VerticalLayout

  // All of the available layouts
  const Layouts = { VerticalLayout, FullLayout };


  // Return Filtered Array of Routes & Paths for default page
  const LayoutRoutesAndPaths = (layout) => {
    const LayoutRoutes = [];
    const LayoutPaths = [];
    if (Routes) {
      // Checks if Route layout or Default layout matches current layout
      Routes.filter(
        (route) =>
          (route.layout === layout || DefaultLayout === layout) &&
          (LayoutRoutes.push(route), LayoutPaths.push(route.path))
      );
    }

    return { LayoutRoutes, LayoutPaths };
  };



  // Return Route to Render
  const ResolveRoutes =  () => {
  
    return  Object.keys(Layouts).map((layout, index) => {
      const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout);
      const LayoutTag = Layouts[layout];
      return (
        <Route path={LayoutPaths} key={index}>
          <LayoutTag>
            <Switch>
              {LayoutRoutes.map((route) => {
                return (
                  <ProtectedRoute
                    key={route.path}
                    path={route.path}
                    exact
                    component={route.component}
                  />
                );
              })}
            </Switch>
          </LayoutTag>
        </Route>
      );
    });
  };

  // Return Route to Render
  // const ResolveRoutesDash =  () => {
  //   console.log("local2", checkLocal);
  //   return  Object.keys(LayoutsDashboard).map((layout, index) => {
  //     const { LayoutRoutes2, LayoutPaths2 } =
  //       LayoutRoutesAndPathsDashboard(layout);
  //     const LayoutTag = LayoutsDashboard[layout];
  //     return (
  //       <Route path={LayoutPaths2} key={index}>
  //         <LayoutTag>
  //           <Switch>
  //             {LayoutRoutes2.map((route) => {
  //               return (
  //                 <ProtectedRoute
  //                   key={route.path}
  //                   path={route.path}
  //                   exact
  //                   component={route.component}
  //                 />
  //               );
  //             })}
  //           </Switch>
  //         </LayoutTag>
  //       </Route>
  //     );
  //   });
  // };

  // let ContentMain;

  // const Resolve = () => {
  //   // {checkLocal === null ? ResolveRoutes() : ResolveRoutesDash()}
  //   return (
  //     <>
  //       {checkLocal === null ? <ResolveRoutes /> : <ResolveRoutesDash />}
  //     </>
  //   )
  // }

  // if (checkLocal === null) {
    
  //   history.push("/");
  // } else {
  //   history.push("/dashboard/add-detail");
  // }


  return (
    <AppRouter>
      <Switch>
        {ResolveRoutes()}
      </Switch>
    </AppRouter>
  );
}
