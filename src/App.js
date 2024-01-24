import React from "react";
import Home from './components/Home';
import Header from './components/Header';
import Course from './components/Course';
import SideBar from './components/SideBar';
import AddCourse from './components/AddCourse';
import About from './components/About'
import Contact from "./components/Contact";
import { ToastContainer } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";





function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Container style={{ padding: "20px", border: "groove" }}>
          <Row>
            <Col md={4}><SideBar /></Col>
            <Col md={8}>
              <Routes>
                <Route path="/" element={<Home />} exact />
                <Route path="/add-course" element={<AddCourse />} exact />
                <Route path="/view-course" element={<Course />} exact />
                <Route path="/about" element={<About />} exact />
                <Route path="/contact" element={<Contact/>} exact />
              </Routes>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </div>
  );
};

export default App;
