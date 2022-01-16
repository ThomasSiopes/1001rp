import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Card, Row, Col, Button } from "react-bootstrap";
import { GiDonkey, GiElephant } from "react-icons/gi";

import { QUERY_SCOREBOARD, QUERY_SCORES } from "../../utils/queries";
import { MOD_SCORE } from "../../utils/mutations";

import GlobalScores from "./globalScores";

const CurrentQuestion = () => {    
    const queryScores = useQuery(QUERY_SCORES);
    
    const [question, setquestion] = useState({
        totalIndex: 0,
        end: false,
        oppositePage: false,
        lastAnswer: 0
    });

    const [scores, setScores] = useState({
        localScores: [],
        imgPath: 0
    });

    let temp;

    const [modScore, {error}] = useMutation(MOD_SCORE);

    const handleChange = async (event) => {
        event.preventDefault();

        try {
            let { data } = modScore({
                variables: { value: parseInt(event.target.getAttribute('name')), score: 1 },
            });
            let newInt = parseInt(event.target.getAttribute('name'))
            console.log("New Int: " + newInt);
            
            setquestion({...question, lastAnswer: newInt, oppositePage: true})
            console.log("Question: ")
            console.log(question)
        } catch (err) {
            console.log(err);
        }
    }

    const nextQuestion = (event) => {
        event.preventDefault();

        temp = [...scores.localScores]
        temp.push(question.lastAnswer);
        setScores({...scores, localScores: temp});

        if(scoreboard && (question.totalIndex < scoreboard.questions.length-1)) {
            setquestion({...question, totalIndex: question.totalIndex+1, oppositePage: false});       
        } else {
            console.log("End");

            setquestion({...question, oppositePage: false, end: true});
            setScores({...scores, localScores: handleLocalScores(temp), imgPath: handleImagePath(temp)});
            console.log(temp);
        }
    }

    const handleLocalScores = (input) => {
        let copy = queryScores.data.scores;
        let newArr = []
        for(let i of copy) {
            newArr.push({...i, score: 0})
        }

        for(let index of input) {
            if(index === 1) newArr[0].score++
            else newArr[1].score++
        }
        
        return(newArr);
    }

    const handleImagePath = (input) => {
        let option = 0;

        for(let index of input) {
            if(index === 1) option++;
        }

        return ("/assets/images/results/option" + option + ".png");
    }

    const restart = async (event) => {
        event.preventDefault();
        console.log(question);

        try {
            setquestion({...question, totalIndex: 0, end: false});
            setScores({localScores: []})
        } catch (err) {
            console.log(err);
        }
    }

    let { loading, data } = useQuery(QUERY_SCOREBOARD);

    if(loading || !data) return <p>Loading...</p>

    const scoreboard = data.scoreboard[0];

    return (
        <Card>
            <Card.Header className="text-center">Questionnaire</Card.Header>
            <Card.Body className="text-center">
                { (question.end === false) && (question.oppositePage === false) &&
                    <div className="card-text">
                            <p>{scoreboard.questions[question.totalIndex].text}</p>
                            <div>
                                {scoreboard.questions[question.totalIndex].choices.map((index) => (
                                    <Button variant={"theme"} className="mx-2 mb-2" id={"value" + index.value} name={String(index.value)} key={index.name} onClick={handleChange}>
                                        {(index.value === 1) ? <GiElephant name={String(index.value)}/> : <GiDonkey name={String(index.value)}/>}
                                    </Button>
                                ))}
                            </div>
                    </div>
                }
                {
                    (question.end === false) && (question.oppositePage === true) &&
                    <div className="card-text">
                        <Row>
                            <Col>
                                <Card className="bg-theme text-white">
                                    <Card.Body>
                                    <Card.Text>{scoreboard.questions[question.totalIndex].answer}</Card.Text>
                                    <p>
                                        {question.lastAnswer === 1 && 
                                            <GiElephant/>
                                        }
                                        {question.lastAnswer === 2 &&
                                            <GiDonkey/>
                                        }
                                    </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="bg-theme text-white">
                                    <Card.Body>
                                    <Card.Text>{scoreboard.questions[question.totalIndex].opposite}</Card.Text>
                                    <p>
                                        {question.lastAnswer === 1 && 
                                            <GiDonkey/>
                                        }
                                        {question.lastAnswer === 2 &&
                                            <GiElephant/>
                                        }
                                    </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={12}>
                                <Button variant={"theme"} className="mt-3" onClick={nextQuestion}>Next</Button>
                            </Col>
                        </Row>
                    </div>
                }
                { question.end === true &&
                    <div className="card-text">
                        <Row>
                            <Col>
                                <div>
                                    <p>Results:</p>
                                    <Row>
                                        {scores.localScores.map((n) => (
                                            <Col key={n.name + n.value}>
                                                <p>{(n.value === 1) ? <GiElephant/> : <GiDonkey/>} : {n.score}</p>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            </Col>
                            {/* <Col xs={6}>
                                <GlobalScores input={scores.localScores}/>
                            </Col> */}
                        </Row>
                        <Row>
                            <img src={scores.imgPath}/>
                        </Row>
                        {/* <Button variant={"theme"} onClick={restart}>Start Over</Button> */}
                    </div>
                }
            </Card.Body>
        </Card>
    )
}

export default CurrentQuestion;