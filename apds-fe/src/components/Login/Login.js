import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css";
import { AuthData } from "../../auth/AuthWrapper";
import { useNavigate } from "react-router-dom";
import DOMPurifyI from "dompurify";

function Login() {
  const { login } = AuthData();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    //Code Attribution
    //Title: Validation
    //Link:https://react-bootstrap.netlify.app/docs/forms/validation/?
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    if (form.checkValidity()) {
      const DOMPurify = DOMPurifyI(window);

      const sanitizedUsername = DOMPurify.sanitize(username);
      const sanitizedPassword = DOMPurify.sanitize(password);

      login(sanitizedUsername, sanitizedPassword)
        .then(() => {
          navigate("/posts");
        })
        .catch((error) => {
          console.error("Error:", error);
          setErrorMessage(error);
        });
    }
  };

  return (
    <Form
      id="login-form"
      noValidate
      validated={validated}
      onSubmit={handleLogin}
    >
      <h1 className="form-labels">Login</h1>
      <Form.Group className="mb-3 form-labels" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid username.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3 form-labels" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid password.
        </Form.Control.Feedback>
      </Form.Group>
      {errorMessage && (
        <p
          className="text-danger"
          style={{ marginTop: "10px", textAlign: "left" }}
        >
          {errorMessage}
        </p>
      )}
      <div className="button-container">
        <Button variant="dark" type="submit">
          Login
        </Button>
      </div>
    </Form>
  );
}

export default Login;
