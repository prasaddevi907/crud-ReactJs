import React from "react";
import { Card, CardBody } from "reactstrap";

function Header() {
    const mystyle = {
        color: "black",
        backgroundColor: "lightblue",
        padding: "20px",
        textAlign: "center"
    };
    return (
        <div>
            <Card>
                <CardBody>
                    <h1 style={mystyle}>Welcome to Courses Application</h1>
                </CardBody>
            </Card>

        </div>
    );
}
export default Header;