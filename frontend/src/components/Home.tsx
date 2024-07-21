import { useState } from "react";

import { toast } from "react-toastify";

import List from "./List";

import { addInitialChallenge } from "../utils/props";
import { addChallenge } from "../utils/api";

function Home() {
    const [challengeFields, setChallengeFields] = useState(addInitialChallenge);
    const [loading, setLoading] = useState(false); 

    function handleChangeChallengesField(e : React.ChangeEvent<HTMLInputElement>) {
        setChallengeFields({
            ...challengeFields,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        try {
            await addChallenge(challengeFields);
            toast.success("Challenge added successfully");
        }
        catch (err) {
            toast.error("Error adding challenge");
        }
        
        setLoading(true);
    }

    if(loading) {
        return <Home />
    }

    return (
        <div className="container">
            <h2 className="w-100 d-flex justify-content-center p-3">Competition Challenges CRUD</h2>

            <div className="row">
                <div className="col-md-3">
                    <div className="mb-3 mt-3">
                        <label htmlFor="type" className="form-label">Challenge Type</label>
                        <input type="text" className="form-control" id="type" placeholder="Enter Type" name="type" onChange={e => handleChangeChallengesField(e)} />
                    </div>

                    <div className="mb-3 mt-3">
                        <label htmlFor="ageCategory" className="form-label">Challenge Age Category</label>
                        <input type="text" className="form-control" id="ageCategory" placeholder="Enter Age Category" name="ageCategory" onChange={e => handleChangeChallengesField(e)} />
                    </div>

                    <div className="mb-3 mt-3">
                        <label htmlFor="noParticipants" className="form-label">Challenge Number of Participants</label>
                        <input type="number" className="form-control" id="noParticipants" placeholder="Enter Number of Participants" name="noParticipants" onChange={e => handleChangeChallengesField(e)} />
                    </div>

                    <button className="btn btn-primary" type="submit" onClick={e => handleSubmit(e)}>Add Challenge</button>
                </div>

                <div className="col-md-9">
                    <List />
                </div>
            </div>
        </div>
    )
}

export default Home;