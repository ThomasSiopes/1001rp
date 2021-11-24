import { gql } from "@apollo/client";

export const MOD_SCORE = gql`
    mutation modScore($value: Int!, $score: Int!) {
        modScore(value: $value, score: $score) {
            name
            value
            score
        }
    }
`;

export const SET_QOTD = gql`
    mutation setQOTD($newID: ID!) {
        setQOTD(newID: $newID) {
            storedID
        }
    }
`;

export const CLEAR_SCORE = gql`
    mutation clearScore {
        clearScore {
            name
            value
            score
        }
    }
`;