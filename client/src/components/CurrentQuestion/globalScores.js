import React from "react";
import { useQuery } from "@apollo/client";
import { Row, Col } from "react-bootstrap";

import { QUERY_SCORES } from "../../utils/queries";

const GlobalScores = (input) => {
    let {loading, data} = useQuery(QUERY_SCORES);

    if(loading) return <p>Loading...</p>

    const localScores = input.input;
    const globalScores = data.scores;

    let currentList = [];

    for(let i = 0; i < localScores.length; ++i) {
        currentList.push({...globalScores[i], score: globalScores[i].score + localScores[i].score});
    }

    console.log("New list: ");
    console.log(currentList);

    return (
        <div>
            <p>Global Results:</p>
            <Row>
                {currentList.map((n) => (
                    <Col key={n.name + n.value}>
                        <p>{n.name} : {n.score}</p>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default GlobalScores;