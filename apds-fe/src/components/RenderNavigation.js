import { Link, Route, Routes } from "react-router-dom";
import { AuthData } from "../auth/AuthWrapper";
import { nav } from "./Navigation";
import Cookies from "universal-cookie";
import "./Menu/Menu.css";


//Code Attribution
//Link: https://www.youtube.com/watch?v=q94v5AhgrW4
//Github: https://github.com/KodieCode/react-private-routes-authentication
export const RenderRoutes = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  return (
    // Render the routes
    <Routes>
      {nav.map((r, i) => {
        if (r.isPrivate && token) {
          // If the route is private and the user is logged in
          return <Route key={i} path={r.path} element={r.element} />;       
        } else if (!r.isPrivate) {
          //Check if the route is not private
          return <Route key={i} path={r.path} element={r.element} />;
        } else return false;
        //Return false if the route is private and the user is not logged in
      })}
    </Routes>
  );
};

export const RenderMenu = () => {
  const { logout } = AuthData();
  const cookies = new Cookies();
  const token = cookies.get("token");

  const MenuItem = ({ r }) => {
    return (
      <div className="menuItem">
        <Link to={r.path}>{r.name}</Link>
      </div>
    );
  };
  return (
    <div className="menu-list">
      {nav.map((r, i) => {
        // Render the menu item if its not private or if the user is logged in
        if (!r.isPrivate && r.isMenu) {
          return <MenuItem className="menuItem" key={i} r={r} />;
        } else if (token && r.isMenu) {
          return <MenuItem className="menuItem" key={i} r={r} />;
        } else return false;
      })}

      {token ? (
        <div className="menuItem">
          <Link to={"/"} onClick={logout}>
            Logout
          </Link>
        </div>
      ) : (
        <>
          <div className="menuItem">
            <Link to={"login"}>Log in</Link>
          </div>
          <div className="menuItem">
            <Link to={"signup"}>Sign up</Link>
          </div>
        </>
      )}
    </div>
  );
};
