import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Create.css";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../Posts/PostService";
import DOMPurifyI from "dompurify";

function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleCreate = (event) => {
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

      const sanitizedTitle = DOMPurify.sanitize(title);
      const sanitizedContent = DOMPurify.sanitize(content);

      try {
        createPost(sanitizedTitle, sanitizedContent);
        navigate("/posts");
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <Form
      id="create-form"
      noValidate
      validated={validated}
      onSubmit={handleCreate}
    >
      <h1 className="form-labels">Add Post</h1>
      <Form.Group className="mb-3 form-labels" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a title.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3 form-labels" controlId="formContent">
        <Form.Label>Content</Form.Label>
        <Form.Control
          required
          as="textarea"
          rows={3}
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please enter content fot the message.
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
          Post
        </Button>
      </div>
    </Form>
  );
}

export default Create;
