import { useState } from "react";
import axios from "axios";

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = { username, password };
    try {
      const response  = await axios.post('/api/login', credentials);
      const user = response.data;
      setUser(user);
      setUsername('');
      setPassword('');
    } catch {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      {errorMessage && (
        <div>
          <p>{errorMessage}</p>
        </div>
      )}
      <form onSubmit={handleLogin}>
        <p>
          <label htmlFor="username">Username</label>
          <input 
            id='username' 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input 
            id='password' 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} />
        </p>
        <button type='submit'>Log in</button>
      </form>
    </div>
  );
};

export default LoginForm;
