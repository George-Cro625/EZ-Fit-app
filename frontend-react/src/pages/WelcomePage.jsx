import { Link } from 'react-router-dom'

function WelcomePage() {
    return (
        <div>
            <h1>EZ-Fit</h1>
            <p><b>The best workout tracking app available, and it's 100% FREE!</b>
            <br></br>
            <br></br>
            Just log-in, click the exercise you want to do and start logging your workouts… 
            <br></br>No complicated UI, no delays, no fuss. Compare against 
            past workouts to maximize gains!
            </p>

            <nav>
                <Link to="/login">Link to Login Page</Link>
            </nav>

            <footer>
          <p>
            <b>"The only workout tracker you'll ever want to use again."</b>
            <br />
          </p>
        </footer>

        </div>
    )
}

export default WelcomePage