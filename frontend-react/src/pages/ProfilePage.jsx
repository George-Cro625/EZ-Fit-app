import { Link } from 'react-router-dom';
import './ProfilePage.css';

function ProfilePage() {

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
        </div>
    );
}

export default ProfilePage;