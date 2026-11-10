
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import './ProfilePage.css';

function ProfilePage() {

    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Retrieve all past workouts from MongoDB
    useEffect(() => {

        const fetchWorkouts = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/workouts"
                );

                if (!response.ok) {
                    throw new Error("Failed to retrieve workouts.");
                }

                const data = await response.json();

                setWorkouts(data);

            } catch (error) {
                console.error(error);
                setError("Unable to load workout history.");
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();

    }, []);

    return (
        <div>

            <h1>EZ-Fit</h1>

            <nav className="home-nav">
                <div className="nav-left">
                    <Link to="/home">Home</Link>
                    <Link to="/profile">Profile/Past Workouts</Link>
                </div>

                <div className="nav-right">
                    <Link to="/login">Logout</Link>
                </div>
            </nav>

            <div className="profile-container">

                {/* Left - User Information */}
                <div className="user-info">
                    <h2>John Doe</h2>
                    <p>Age: 32</p>
                    <p>Join Date: 11/09/2026</p>
                </div>

                {/* Right - Overall Stats */}
                <div className="overall-stats">
                    <h2>Overall Stats</h2>
                    <p>Total Calories Burned:</p>
                    <p>Total Volume Moved:</p>
                </div>

            </div>

            <hr />

            {/* Past Workout History */}
            <div className="workout-history">

                <h2>Past Workouts</h2>

                {loading ? (

                    <p>Loading workout history...</p>

                ) : error ? (

                    <p role="alert">{error}</p>

                ) : workouts.length === 0 ? (

                    <p>No past workouts recorded yet.</p>

                ) : (

                    workouts
                        .slice()
                        .sort((a, b) =>
                            new Date(b.date) - new Date(a.date)
                        )
                        .map((workout) => (

                            <div
                                className="workout-card"
                                key={workout._id}
                            >

                                <h3>{workout.exercise}</h3>

                                <p>
                                    Weight: {workout.weight} lbs
                                </p>

                                <p>
                                    Reps: {workout.reps}
                                </p>

                                <p>
                                    Date: {
                                        new Date(workout.date)
                                            .toLocaleString()
                                    }
                                </p>

                            </div>

                        ))

                )}

            </div>

        </div>
    );
}

export default ProfilePage;