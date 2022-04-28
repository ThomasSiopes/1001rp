import React from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import { useQuery} from "@apollo/client";
import MetaTags from "react-meta-tags";

import { Container, Row, Col, Card, Carousel, Button } from "react-bootstrap";
import { FaTwitter, FaFacebookF, FaShareSquare } from "react-icons/fa";

import TopicButton from "../components/TopicButton";
import AuthorButton from "../components/AuthorButton";
import MoreAuthor from "../components/MoreAuthor";
import MoreTopic from "../components/MoreTopic";

// import { QUERY_QUOTE_ID } from "../utils/queries";
import { QUERY_QUOTE_REALID } from "../utils/queries";

function Quote () {
    const { quoteRealId } = useParams();
    let { loading, data } = useQuery(QUERY_QUOTE_REALID, {
        variables: {quoteRealId: quoteRealId},
    })

    if(!quoteRealId || quoteRealId === null || quoteRealId === "undefined") return (<Redirect to={`/`}/>);

    if(loading) {
        return <div className="loadingPage">Loading...</div>;
    }

    if(!data) return (<Redirect to={`/404error`}/>);

    const quote = data.quoteR;

    return (
        <Container>
            <MetaTags>
                <title>1001 Red Pills - {quote.author} - {quote.quoteText}</title>
            </MetaTags>
            <Card>
                <Card.Header><Link to={`/`} className="link-theme">Home</Link> {`>`} <Link to={`/authors`} className="link-theme">Authors</Link> {`>`} <AuthorButton type={"link"} name={quote.author}/> {`>`} Quotes</Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs={12} lg={8}>
                            <Card className="mb-3">
                                <div id="quote-page">
                                    <Card.Body>
                                        <Card.Text className="display-6"><span className="quote-body font-poppins" id="main-quote">"{quote.quoteText}"</span></Card.Text>
                                        <Card.Text><strong><AuthorButton type={"link"} name={quote.author}/></strong></Card.Text>
                                    </Card.Body>
                                    <Card.Body className="text-center">
                                        <Link title="Share on Twitter" className="mx-2 share-button" to={`https://twitter.com/intent/tweet?url=${window.location.href}`} id="share-twitter"><FaTwitter/></Link>
                                        <Link title="Share on Facebook" className="mx-2 share-button" to={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} id="share-facebook"><FaFacebookF/></Link>
                                        {navigator.share && 
                                            <button title="Share" className="mobile-share border-0 p-0 mx-2" onClick={function() {
                                                navigator.share({
                                                    title: "1001 Red Pills",
                                                    text: quote.quoteText,
                                                    url: window.location.href
                                                })
                                            }}
                                            ><FaShareSquare/></button>
                                        }
                                    </Card.Body>
                                </div>
                                {quote.topics.length !== 0 && 
                                    <Card.Footer className="text-center py-3">
                                            {quote.topics.map((index) => (
                                                <TopicButton key={index} type={"button"} name={index}/>
                                            ))}
                                    </Card.Footer>
                                }
                            </Card>
                        </Col>
                        <Col xs={12} lg={4}>
                            <Row>
                                <MoreAuthor parent={quote} name={quote.author}/>
                                { quote.topics[0] &&
                                    <Col className="mb-3">
                                        {quote.topics.length === 1 &&
                                            <MoreTopic parent={quote} name={quote.topics[0]}/>
                                        }
                                        {quote.topics.length > 1 &&
                                            <Carousel indicators={false} nextIcon={<Button variant={"light"}><strong>{`>`}</strong></Button>} prevIcon={<Button variant={"light"}><strong>{`<`}</strong></Button>}>
                                                {quote.topics.map((index) => (
                                                    <Carousel.Item key={index}>
                                                        <MoreTopic parent={quote} name={index}/>
                                                    </Carousel.Item>
                                                ))}
                                            </Carousel>
                                        }
                                    </Col>
                                }
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Quote;