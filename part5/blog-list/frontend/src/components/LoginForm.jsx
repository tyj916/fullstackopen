import { useState } from "react";
import axios from "axios";

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = { username, password };
    const user = await axios.post('/api/login', credentials);
    setUser(user);
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Log in to application</h2>
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
