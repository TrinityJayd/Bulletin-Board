import { createContext, useContext } from "react";
import { RenderMenu, RenderRoutes } from "../components/RenderNavigation";
import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const login = (username, password) => {
    return new Promise((res, rej) => {
      const data = {
        username: username,
        password: password,
      };

      axios
        .post("https://localhost:3000/api/users/login", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const token = response.data.token;

          if (token) {
            cookies.set("token", token, {
              path: "/",
            });
            res();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          if (error.response.status === 401) {
            rej("Incorrect username or password. Please try again.");
          } else if (error.response.status === 429) {
            rej("Too many failed login attempts. Please try again later.");
          } else {
            rej("Login failed. Please try again.");
          }
        });
    });
  };

  const logout = () => {
    navigate("/login");
    cookies.remove("token");
  };

  const signup = (username, password, department) => {
    return new Promise((res, rej) => {
      const data = {
        username: username,
        password: password,
        department: department,
      };

      axios
        .post("https://localhost:3000/api/users/signup", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          res();
        })
        .catch((error) => {
          console.error("Error:", error);
          if (error.response.status === 429) {
            rej("Too many failed sign up attempts. Please try again later.");
          } else {
            rej("Sign up failed. Please try again.");
          }
        });
    });
  };

  return (
    <AuthContext.Provider value={{ login, logout, signup }}>
      <>
        <RenderMenu />
        <RenderRoutes />
      </>
    </AuthContext.Provider>
  );
};
