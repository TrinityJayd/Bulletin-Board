import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { AuthData } from "../../auth/AuthWrapper";
import DOMPurifyI from "dompurify";

function SignUp() {
  //https://bobbyhadz.com/blog/react-onclick-redirect
  const navigate = useNavigate();
  const [department, setDepartment] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { signup } = AuthData();
  const [validated, setValidated] = useState(false);

  const handleSignUp = (event) => {
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

      const sanitizedDepartment = DOMPurify.sanitize(department);
      const sanitizedUsername = DOMPurify.sanitize(username);
      const sanitizedPassword = DOMPurify.sanitize(password);

      signup(sanitizedUsername, sanitizedPassword, sanitizedDepartment) 
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          console.error("Error:", error);
          setErrorMessage(error);
        });
    }
  };

  return (
    <Form
      id="signup-form"
      noValidate
      validated={validated}
      onSubmit={handleSignUp}
    >
      <h1>Sign Up</h1>

      <Form.Group className="mb-3 form-labels" controlId="formDepartment">
        <Form.Label>Department</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid department.
        </Form.Control.Feedback>
      </Form.Group>

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
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid password. Must be at least 8 characters, include
          one uppercase letter, one lowercase letter, and one number.
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
          Sign Up
        </Button>
      </div>
    </Form>
  );
}

export default SignUp;
