import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import { ChallengeProps } from "../utils/props";
import { fetchChallenges, deleteChallenge } from "../utils/api";

function List() {
    const [challengeData, setChallengeData] = useState<ChallengeProps[]>([]);

    async function fetchData() {
        const res = await fetchChallenges();
        setChallengeData(res);
    }

    useEffect(() => {
        fetchData();
    }, []);

    async function handleDelete(id: number) {
        await deleteChallenge(id);
        fetchData();
        toast.success("Challenge deleted successfully");
    }

    return (
        <div className="container">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Type</th>
                        <th>AgeCategory</th>
                        <th>NoParticipants</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {challengeData && challengeData.map((challenge) => {
                        return (
                            <tr key={challenge.id}>
                                <td>{challenge.id}</td>
                                <td>{challenge.type}</td>
                                <td>{challenge.ageCategory}</td>
                                <td>{challenge.noParticipants}</td>
                                <td>
                                    <NavLink to={`/view/${challenge.id}`} className="btn btn-success mx-2">View</NavLink>
                                    <NavLink to={`/edit/${challenge.id}`} className="btn btn-info mx-2">Edit</NavLink>
                                    <button className="btn btn-danger" onClick={() => handleDelete(challenge.id)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default List;