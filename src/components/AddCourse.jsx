import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { Button, CardBody, Card } from "reactstrap";
import axios from "axios";
import base_url from "../Api/url";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
    const navigate = useNavigate();


    useEffect(() => {
        document.title = "Add Course";
    }, []);

    const mystyle = {
        color: "black",
        backgroundColor: "lightblue",
        textAlign: "center"
    };

    const [course, setCourses] = useState({});

    const handleForm = (e) => {
        e.preventDefault();
        console.log(course);
        addCourse(course);
    }

    const addCourse = (data) => {
        axios.post(`${base_url}/cources`, data).then(
            (response) => {
                console.log(response);
                toast.success("Successfully Added !!!");
                // Reset the form after successful addition
                setCourses({});
                // Navigate to another page
                navigate("/view-course"); // Replace "/other-page" with the path to the desired page
                //history.push("/view-course"); // Replace "/other-page" with the path to the desired page
            }, (error) => {
                toast.error("Course Not Added !!!");
            }
        )
    }

    return (
        <>
            <Card>
                <CardBody>
                    <h1 style={mystyle}>Add Course</h1>
                </CardBody>
            </Card>
            <Form onSubmit={handleForm}>
                <Form.Group className="mb-3">
                    <Form.Label>Course Id</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Course Id"
                        name="courseId"
                        id="id"
                        onChange={(e) => {
                            setCourses({ ...course, id: e.target.value })
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Course Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Course Title"
                        name="courseTitle"
                        id="title"
                        onChange={(e) => {
                            setCourses({ ...course, title: e.target.value })
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Course Description"
                        name="descrption"
                        id="descrption"
                        onChange={(e) => {
                            setCourses({ ...course, descrption: e.target.value })
                        }}
                    />
                </Form.Group>
                <Container style={{ textAlign: "center" }}>
                    <Button type="submit" color="primary" outline >Add Course</Button>{' '}
                    <Button type="reset" color="warning ml=5" outline>Reset Form</Button>
                </Container>
            </Form>
        </>
    );
};

export default AddCourse;
