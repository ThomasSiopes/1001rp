import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Navbar, Nav, Container, Form, Row, Col } from "react-bootstrap";

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '', go: false };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) { 
        this.setState({value: event.target.value}); 
    }
    
    handleSubmit(event) {
      event.preventDefault();
      this.setState({go: true});
    }

    render() {
        if(this.state.go) {
            this.setState({go: false});
            return <Redirect to={`/search/${this.state.value}`}/>
        }
        else {        
            return(
                <Navbar variant="dark" expand="md" className="mb-3">
                    <Container>
                        <Link className="navbar-brand" to={`/`}><img id="nav-icon" className="me-3" src="/assets/images/thumbnails/background-copy.png" alt="Icon Here"/></Link>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="text-center">
                            <Nav className="me-auto">
                                {/* Small Navbar */}
                                <Row className="d-flex d-md-none mt-2">
                                    <Col xs={12}><Link className="nav-link btn btn-theme my-2" to={`/`}><strong>Home</strong></Link></Col>
                                    <Col xs={12}><Link className="nav-link btn btn-theme my-2" to={`/authors`}><strong>Authors</strong></Link></Col>
                                    <Col xs={12}><Link className="nav-link btn btn-theme my-2" to={`/topics`}><strong>Topics</strong></Link></Col>
                                </Row>
                                
                                {/* Big Navbar */}
                                <div className="d-none d-md-flex">
                                    <span className="mx-1 hoverable"><Link className="nav-link" to={`/`}>Home</Link></span>
                                    <span className="mx-1 hoverable"><Link className="nav-link" to={`/authors`}>Authors</Link></span>
                                    <span className="mx-1 hoverable"><Link className="nav-link" to={`/topics`}>Topics</Link></span>
                                </div>
                            </Nav>
                            <Nav className="text-center">
                                <Form className="d-flex justify-content-center align-items-center" onSubmit={this.handleSubmit}>
                                    <input type="text" id="searchTerm" placeholder="Search by name or text..." className="me-2 my-2" onChange={this.handleChange}></input>
                                    <input type="submit" className="btn btn-theme fw-bold" value="GO"></input>
                                </Form>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            )
        }
    }
}

export default NavBar;