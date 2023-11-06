import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

export const createPost = async (title, content) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const decodedToken = jwtDecode(token);

  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const data = {
    username: decodedToken.username,
    title: title,
    content: content,
    date: new Date().toLocaleDateString("en-ZA", options),
    department: decodedToken.department,
  };

  try {
    const response = await axios.post(
      "https://localhost:3000/api/posts/",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllPosts = async () => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  try {
    const response = await axios.get("https://localhost:3000/api/posts/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.posts;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (postId) => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  try {
    await axios.delete(`https://localhost:3000/api/posts/${postId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};
