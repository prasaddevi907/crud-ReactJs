import React from "react";
import { Link } from "react-router-dom";
import { ListGroup} from "reactstrap";

const Sidebar=()=>{

    return(
        <div>
        <ListGroup action="true">
            <Link className="list-group-item list-group-item-action" tag="a" to=""  style={{background:"#a6d96a"}}>Home</Link>
            <Link className="list-group-item list-group-item-action" tag="a" to="/add-course"  style={{background:"#8ca9b9"}}>Add Course </Link>
            <Link className="list-group-item list-group-item-action" tag="a" to="/view-course"  style={{background:"#99d2be"}}>View Courses</Link>
            <Link className="list-group-item list-group-item-action" tag="a" to="/about"  style={{background:"#f7e4ee"}}> About Us</Link>
            <Link className="list-group-item list-group-item-action" tag="a" to="/contact" style={{background:"#f4cccc"}}> Contact Us</Link>
        </ListGroup>    
        </div>
    );
}
export default Sidebar;