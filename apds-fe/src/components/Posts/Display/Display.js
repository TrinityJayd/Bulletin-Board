import { useEffect, useState } from "react";
import "./Display.css";
import Card from "react-bootstrap/Card";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import Button from "react-bootstrap/Button";
import { getAllPosts, deletePost } from "../../../components/Posts/PostService";

function Display() {
  const [errorMessage, setErrorMessage] = useState("");
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const cookies = new Cookies();
  const token = cookies.get("token");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
        const decodedToken = jwtDecode(token);
        setCurrentUser(decodedToken.username);
  
        if (data.length !== 0) {
          setErrorMessage("");
        } else {
          setErrorMessage("No posts found");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setErrorMessage("Error fetching posts");
      }
    };
  
    fetchPosts();
  }, [token]);

  const handleDelete = (postId) => {
    try{
      deletePost(postId);
      window.location.reload();
    }catch(error){
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      <h1>All Posts</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {posts.map((post) => (
        <Card className="card" key={post.id}>
          <Card.Body>
            <Card.Title>{post.title} </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Posted on: {post.date} <br/> Department: {post.department}
            </Card.Subtitle>
            <Card.Text>Author: {post.username}</Card.Text>
            <Card.Text>
              Message <br /> {post.content}
            </Card.Text>

            {currentUser === post.username && (
              <div style={{ textAlign: "end" }}>
                <Button variant="danger" onClick={() => handleDelete(post._id)}>
                  Delete
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Display;
