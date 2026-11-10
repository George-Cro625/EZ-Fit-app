import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function LoginPage() {
    
    // store username and password
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    // handle form submittion
    function handleLogin(event) {
        event.preventDefault()

        console.log("Username:", username)
        console.log("Password:", password)
        
        //navigate to homepage on submital
        navigate('/home')
    }

    
    return (

        <div>
            <h1>EZ-Fit</h1>
             
             <form onSubmit={handleLogin}> 
                {/* Enter Username */}
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Enter username"
                    required
                />

                <br /><br />

                {/* Enter Password */}
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                    required
                />

                <br /><br />

                <button type="submit">Login</button>

            </form>

           <p>
            Or <Link to="/createAccount">Create an account</Link>
            </p>

            <footer>
                <p>
                    <b>The only workout tracker you'll <br></br>
                    ever want to use again!</b>
                </p>
            </footer>

        </div>
    )
}

export default LoginPage