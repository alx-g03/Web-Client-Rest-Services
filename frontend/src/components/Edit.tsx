import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { ChallengeProps, initialChallenge } from "../utils/props";
import { fetchChallenge, updateChallenge } from "../utils/api";

function Edit() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [challenge, setChallenge] = useState<ChallengeProps>(initialChallenge);
    const [challengeFields, setChallengeFields] = useState<ChallengeProps>(initialChallenge);

    useEffect(() => {
        async function fetchData() {
            const res = await fetchChallenge(id);
            
            setChallengeFields(res);
            setChallenge(res);
        }

        fetchData();
    }, [id]);

    function handleChangeChallengesField(e: React.ChangeEvent<HTMLInputElement>) {
        setChallengeFields({
            ...challengeFields,
            [e.target.name]: e.target.value
        });
    }

    function handleBack() {
        navigate("/");
    }

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        try {
            await updateChallenge(challengeFields);
            toast.success("Challenge updated successfully");
        }
        catch (err) {
            toast.error("Error updating challenge");
        }

    }

    return (
        <div className="container">
            <h2>Edit Challenge</h2>

            <form>
                {challenge && (
                    <>
                        <div className="mb-e mt-3">
                            <label htmlFor="id" className="form-label">Challenge Id</label>
                            <input type="text" className="form-control" id="id" name="id" value={challengeFields.id} disabled />
                        </div>

                        <div className="mb-3 mt-3">
                            <label htmlFor="type" className="form-label">Challenge Type</label>
                            <input type="text" className="form-control" id="type" placeholder="Enter Type" name="type" value={challengeFields.type} onChange={e => handleChangeChallengesField(e)} />
                        </div>

                        <div className="mb-3 mt-3">
                            <label htmlFor="ageCategory" className="form-label">Challenge Age Category</label>
                            <input type="text" className="form-control" id="ageCategory" placeholder="Enter Age Category" name="ageCategory" value={challengeFields.ageCategory} onChange={e => handleChangeChallengesField(e)} />
                        </div>

                        <div className="mb-3 mt-3">
                            <label htmlFor="noParticipants" className="form-label">Challenge Number of Participants</label>
                            <input type="number" className="form-control" id="noParticipants" placeholder="Enter Number of Participants" name="noParticipants" value={challengeFields.noParticipants} onChange={e => handleChangeChallengesField(e)} />
                        </div>
                    </>
                )}
                

                <button className="btn btn-primary" type="submit" onClick={e => handleSubmit(e)}>Update</button>
            </form>

            <div className="container d-flex justify-content-center">
                <button className="btn btn-primary" onClick={handleBack}>Back To Home</button>
            </div>
        </div>
    );
}

export default Edit;