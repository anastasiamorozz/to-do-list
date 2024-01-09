import React from "react";
import { publicRoutes, userRoutes } from "../router/routes";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { UserRoleContext } from "../context/UserContext";

const AppRouter = () => {
    const { userRole } = useContext(UserRoleContext);

    let routesToRender;

    switch (userRole) {
      case "user":
        routesToRender = [...userRoutes, ...publicRoutes];
        break;
      default:
        routesToRender = publicRoutes;
    }
  
    return (
      <Routes>
        {routesToRender.map((el) => (
          <Route path={el.path} element={<el.element />} key={el.path} />
        ))}
      </Routes>
    );
}

export default AppRouter;