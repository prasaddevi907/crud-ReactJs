import {React,useEffect} from "react";
import Container from 'react-bootstrap/Container';

const Contact =()=>{
    useEffect(() => {
        document.title="Contact Us";
     }, []);
     
    return(
        <>
         <Container fluid>
            <h1>Learn Code With Devi Prasad</h1>
            <p>This is Develope by Devi Prasad For Learning Purpose Backend is on Spring Boot And FrontEnd on React Js</p>
        </Container>
        </>
    );
}
export default Contact;