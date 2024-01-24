import React, { useEffect, useState } from "react";
import { Spinner, Button, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, Label, Input, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import Table from 'react-bootstrap/Table';
import base_url from './../Api/url';
import axios from "axios";
import { toast } from "react-toastify";

// Function to convert numeric index to Roman numerals
function toRoman(num) {
    const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
    return romanNumerals[num - 1] || num.toString();
}

function Corces() {
    const [loading, setLoading] = useState(true);
    const [values, setValues] = useState({
        id: "",
        title: "",
        descrption: "",
        results: [],
    });

    const [updateModal, setUpdateModal] = useState(false);
    const [updatedCourse, setUpdatedCourse] = useState({
        id: "",
        title: "",
        descrption: "",
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage] = useState(5);

    useEffect(() => {
        document.title = "All Courses";
        axios.get(`${base_url}/cources`).then(
            (response) => {
                const data = response.data;
                setValues((prevValues) => ({ ...prevValues, results: data }));
                // Set loading to false after fetching data
                setLoading(false);
            }, (error) => {
                console.log(error.message);
                toast.error("Something Went Wrong !!!", {
                    position: "bottom-center",
                });
                // Set loading to false in case of an error
                setLoading(false);
            }
        );
    }, []); // Empty dependency array

    const toggleUpdateModal = () => {
        setUpdateModal(!updateModal);
    }

    const deleteCourse = (id) => {
        axios.delete(`${base_url}/cources/${id}`).then(
            (response) => {
                toast.success("Course Deleted");
                window.location.reload();
            }, (error) => {
                toast.error("Course not Deleted\n Id Not Matched !!!");
            })
    }

    const updateCourse = (course) => {
        setUpdatedCourse({
            id: course.id,
            title: course.title,
            descrption: course.descrption,
        });
        toggleUpdateModal();
    }

    const handleUpdate = () => {
        axios.put(`${base_url}/cources/${updatedCourse.id}`, updatedCourse)
            .then((response) => {
                toast.success("Course Updated");
                toggleUpdateModal();
            })
            .catch((error) => {
                toast.error("Course not Updated");
            });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedCourse((prevCourse) => ({
            ...prevCourse,
            [name]: value,
        }));
    }

    // Pagination
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = values.results.slice(indexOfFirstCourse, indexOfLastCourse);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        // Display the spinner while loading
        return (
            <Spinner className="m-5" color="primary">
                Loading...
            </Spinner>
        );
    }

    // Render the table once loading is complete
    return (
        <div>
            {currentCourses.length > 0 ? (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr style={{ textAlign: "center" }}>
                                <th>Sr.No</th>
                                <th>Course Id</th>
                                <th>Course Name</th>
                                <th>Course Title</th>
                                <th align="center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCourses.map((course, index) => (
                                <tr key={course.id} style={{ textAlign: "center" }}>
                                    <td>{toRoman(indexOfFirstCourse + index + 1)}</td>
                                    <td>{course.id}</td>
                                    <td>{course.title}</td>
                                    <td>{course.descrption}</td>
                                    <td>
                                        <Button color="danger" onClick={() => deleteCourse(course.id)} outline>Delete</Button>{' '}
                                        <Button color="warning" onClick={() => updateCourse(course)} outline> Update</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Pagination className="d-flex justify-content-center" style={{ alignItems: "center" }}>
                        {[...Array(Math.ceil(values.results.length / coursesPerPage)).keys()].map(number => (
                            <PaginationItem key={number + 1} active={number + 1 === currentPage}>
                                <PaginationLink onClick={() => paginate(number + 1)} style={{margin:" 0 5px"}}>
                                    {number + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                    </Pagination>
                </>
            ) : (
                <div className="text-center">
                    <h1>No courses available.</h1>
                </div>
            )}

            {/* Update Course Modal */}
            <Modal isOpen={updateModal} toggle={toggleUpdateModal}>
                <ModalHeader toggle={toggleUpdateModal}>Update Course</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="id">Id</Label>
                        <Input type="text" name="id" id="id" value={updatedCourse.id} disabled/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" value={updatedCourse.title} onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="descrption">Description</Label>
                        <Input type="textarea" name="descrption" id="description" value={updatedCourse.descrption} onChange={handleInputChange} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter >
                    <Button color="primary" outline onClick={handleUpdate}>Update</Button>{' '}
                    <Button color="secondary" outline onClick={toggleUpdateModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Corces;
