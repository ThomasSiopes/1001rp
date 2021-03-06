import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import MetaTags from "react-meta-tags";

import { Container, Row, Col, Card } from "react-bootstrap";

import { QUERY_TOPIC_ALL } from "../utils/queries";

function TopicNavigation () {
    let { loading, data } = useQuery(QUERY_TOPIC_ALL);

    if(loading) return <span>Loading...</span>

    const topicList = data.topics;

    let sortedList = []

    for(let index of topicList) {
        sortedList.push(index)
    }

    let orderSwitch = true;
    for(let index1 of sortedList) {
        console.log(index1.topicName);
        if(index1.topicName === null) orderSwitch = false;
    }

    if(orderSwitch) sortedList = sortedList.sort((a,b) => a.topicName.localeCompare(b.topicName));
    else sortedList = sortedList.sort((a,b) => a.name.localeCompare(b.name));

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
                <title>1001 Red Pills - Topics</title>
            </MetaTags>
            <Card>
            <Card.Header><Link className="link-theme" to={`/`}>Home</Link> {`>`} Topics</Card.Header>
                <Card.Header className="text-center py-3">
                    <Card.Title>Topics</Card.Title>
                </Card.Header>
                <Card.Body>
                    <input type="text" id="myInput" onKeyUp={searchFunction} placeholder="Search for topics..." className="mb-3"/>
                    <Row id="myGroup">
                        {sortedList.map((index) => (
                            <Col xs={12} sm={6} md={4} lg={3} key={index.name} className="text-center mb-3">
                                <Link to={`/topic/${index._id}`} className="link-theme">{index.name}</Link>
                            </Col>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default TopicNavigation;