import axios from "axios";
import { AddChallengeProps, ChallengeProps } from "./props";

const baseUrl = "http://localhost:8080/api/challenges";

export async function addChallenge(challengeFields: AddChallengeProps) {
    try {
        const res = await axios.post(baseUrl, challengeFields);
        return Promise.resolve(res.data);
    }
    catch (error) {
        throw new Error(error as string);
    }
}

export async function fetchChallenge(id: string | undefined) {
    try {
        const result = await axios.get(`${baseUrl}/${id}`);
        return Promise.resolve(result.data);
    }
    catch (error) {
        throw new Error(error as string);
    }
}

export async function updateChallenge(challengeFields: ChallengeProps) {
    try {
        const res = await axios.put(baseUrl, challengeFields);
        return Promise.resolve(res.data);
    }
    catch (error) {
        throw new Error(error as string);
    }
}

export async function deleteChallenge(id: number) {
    try {
        const res = await axios.delete(`${baseUrl}/${id}`);
        return Promise.resolve(res.data);
    }
    catch (error) {
        throw new Error(error as string);
    }
}

export async function fetchChallenges() {
    try {
        const result = await axios.get(baseUrl);
        return Promise.resolve(result.data);
    }
    catch (error) {
        throw new Error(error as string);
    }
}
