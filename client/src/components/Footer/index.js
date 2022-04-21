import React from "react";
import { Link } from "react-router-dom";
import { useQuery} from "@apollo/client";
import { Container, Row, Col, Card } from "react-bootstrap";

import { GET_QOTD } from "../../utils/queries";

const FooterPage = () => {
    let { loading, data } = useQuery(GET_QOTD);

    if(loading) return <p>Loading...</p>

    const dailyQuote = data.QOTD;

    return (
        <Card id="footer-supreme" bg={"theme"} className="text-center text-white mt-4 py-4">
            <Container className="px-5">
                <Row>
                    <Col xs={12} md={4} className="d-flex font-Lato">
                        <Container className="align-self-center">
                            <Link to={`/`} className="navbar-brand link-theme"><img src="/assets/images/thumbnails/background-copy.png" id="footer-img" alt="Footer Icon"/></Link>
                        </Container>
                    </Col>
                    <Col xs={12} md={4} className="align-self-center mb-3">
                        <span>Website Description. Maybe about us section? Copyright info? Anything relevant in text form.</span>
                    </Col>
                    <Col xs={12} md={4}>
                        Quick Links
                        <hr></hr>
                        <Row>
                            <Col xs={6} className="mb-3"><i><Link className="text-white" to={`/`}>Home</Link></i></Col>
                            <Col xs={6} className="mb-3"><i><Link className="text-white" to={`/authors`}>Authors</Link></i></Col>
                            <Col xs={6} className="mb-3"><i><Link className="text-white" to={`/topics`}>Topics</Link></i></Col>
                            <Col xs={6} className="mb-3"><i><Link className="text-white" to={`/quote/${dailyQuote[0].storedID}`}>Quote of the Day</Link></i></Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Card>
    )
}

export default FooterPage;
