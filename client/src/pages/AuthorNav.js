import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import MetaTags from "react-meta-tags";

import { Container, Row, Col, Card } from "react-bootstrap";

import { QUERY_AUTHOR_ALL } from "../utils/queries";

function Freethinkers () {
    let { loading, data } = useQuery(QUERY_AUTHOR_ALL);

    if(loading) return <span>Loading...</span>

    let authorList = [];
    for(let index of data.authors){
        console.log(index);
        if(index.quotes.length >= 1) authorList.push(index);
    }

    let orderSwitch = true;
    for(let index1 of authorList) {
        if(index1.lastName === null) orderSwitch = false;
    }

    if(orderSwitch) authorList = authorList.sort((a,b) => a.lastName.localeCompare(b.lastName));
    else authorList = authorList.sort((a, b) => a.name.localeCompare(b.name));

    const searchFunction = () => {
        let input, filter, group, elements, body, textValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        group = document.getElementById("myGroup");
        elements = group.getElementsByClassName("col-12")

        for(let i = 0; i < elements.length; ++i) {
            body = elements[i].getElementsByTagName("a")[0];
            textValue = body.textContent || body.innerText;
            if(textValue.toUpperCase().indexOf(filter) > -1) elements[i].style.display="";
            else elements[i].style.display="none";
        }
    }

    return (
        <Container>
            <MetaTags>
                <title>1001 Red Pills - Authors</title>
            </MetaTags>
            <Card>
                <Card.Header><Link className="link-theme" to={`/`}>Home</Link> {`>`} Authors</Card.Header>
                <Card.Header className="text-center py-3">
                    <Card.Title>Authors</Card.Title>
                </Card.Header>
                <Card.Body>
                    <input type="text" id="myInput" onKeyUp={searchFunction} placeholder="Search for author names..." className="mb-3"/>
                    <Row id="myGroup">
                        {authorList.map((index) => (
                            <Col xs={12} sm={6} md={4} lg={3} key={index.name} className="text-center mb-3">
                                <Link to={`/author/${index._id}`} className="link-theme">{index.name}</Link>
                            </Col>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Freethinkers;