import React,{ useEffect } from "react";
import Container from 'react-bootstrap/Container';
import { Button } from "reactstrap";
import {toast} from 'react-toastify';

function Home(){
    useEffect(() => {
       document.title="Home";
    }, []);

    const wKbtnHandler=()=>{
        toast.success("Just Checking Bro !!",{position:"top-center"})
      }
    return(
        <div>
        <Container fluid>
            <h1>Learn Code With Devi Prasad</h1>
            <p>This is Develope by Devi Prasad For Learning Purpose Backend is on Spring Boot And FrontEnd on React Js</p>
            <Container>
                <Button color="primary" outline onClick={wKbtnHandler}>Start Using My Application</Button>
            </Container>
        </Container>
    </div>
    );
}
export default Home;