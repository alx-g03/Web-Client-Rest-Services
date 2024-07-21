import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { ChallengeProps, initialChallenge } from "../utils/props";
import { fetchChallenge } from "../utils/api";

function View() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [challenge, setChallenge] = useState<ChallengeProps>(initialChallenge);

    useEffect(() => {
        async function fetchData(id: string | undefined) {
            const res = await fetchChallenge(id);
            setChallenge(res);
        }

        fetchData(id);
    }, [id]);

    function handleBack() {
        navigate("/");
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Challenge Details</h1>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Type</th>
                                    <th>AgeCategory</th>
                                    <th>NoParticipants</th>
                                </tr>
                            </thead>

                            <tbody>
                                {challenge && (
                                    <tr>
                                        <td>{challenge.id}</td>
                                        <td>{challenge.type}</td>
                                        <td>{challenge.ageCategory}</td>
                                        <td>{challenge.noParticipants}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="container d-flex justify-content-center">
                    <div>
                        <button className="btn btn-primary" onClick={handleBack}>Back To Home</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default View;