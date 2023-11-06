import Posts from "./Posts/Display/Display";
import Create from "./Posts/Create/Create";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import Home from "./Home/Home";

export const nav = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
    isMenu: false,
    isPrivate: false,
  },
  {
    path: "/login",
    name: "Login",
    element: <Login />,
    isMenu: false,
    isPrivate: false,
  },
  {
    path: "/signup",
    name: "Sign Up",
    element: <SignUp />,
    isMenu: false,
    isPrivate: false,
  },
  {
    path: "/posts",
    name: "Posts",
    element: <Posts />,
    isMenu: true,
    isPrivate: true,
  },
  {
    path: "/create",
    name: "Create Post",
    element: <Create />,
    isMenu: true,
    isPrivate: true,
  },
  {
    path:"*",
    name:"Not Found",
    element: <Home />,
    isMenu: false,
    isPrivate: false,
  }
];
