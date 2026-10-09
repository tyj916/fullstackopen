import { useState } from "react";
import loginService from '../services/login';
import blogService from '../services/blogs';
import Notification from "./Notification";

const LoginForm = ({ setUser, message, setMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch {
      setMessage('Wrong credentials');
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      {message && <Notification message={message} setMessage={setMessage} />}
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
