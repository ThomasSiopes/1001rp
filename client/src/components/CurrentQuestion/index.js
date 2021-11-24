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
        end: false
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

            temp = [...scores.localScores]
            temp.push(parseInt(event.target.getAttribute('name')))
            setScores({...scores, localScores: temp});

            if(scoreboard && (question.totalIndex < scoreboard.questions.length-1)) {
                setquestion({...question, totalIndex: question.totalIndex+1});                
            } else {
                console.log("End");

                setquestion({...question, end: true});
                setScores({...scores, localScores: handleLocalScores(temp), imgPath: handleImagePath(temp)});
                console.log(temp);
            }
        } catch (err) {
            console.log(err);
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

    if(loading) return <p>Loading...</p>

    const scoreboard = data.scoreboard[0];

    return (
        <Card>
            <Card.Header className="text-center">Questionnaire</Card.Header>
            <Card.Body className="text-center">
                { question.end === false &&
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
                            <Col xs={6}>
                                <GlobalScores input={scores.localScores}/>
                            </Col>
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