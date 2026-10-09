import { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Process login');
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <p>
          <label htmlFor="username">Username</label>
          <input id='username' type="text" value={username} onChange={setUsername} />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id='password' type="password" value={password} onChange={setPassword} />
        </p>
        <button type='submit'>Log in</button>
      </form>
    </div>
  );
};

export default LoginForm;
