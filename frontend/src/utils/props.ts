export interface ChallengeProps {
    id: number;
    type: string;
    ageCategory: string;
    noParticipants: number;
}

export interface AddChallengeProps {
    type: string;
    ageCategory: string;
    noParticipants: number;
}

export const initialChallenge = {
    id: 0,
    type: "",
    ageCategory: "",
    noParticipants: 0
}

export const addInitialChallenge = {
    type: "",
    ageCategory: "",
    noParticipants: 0
}
