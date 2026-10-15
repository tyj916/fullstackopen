import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    login({ username, password })
    setUsername('')
    setPassword('')
    navigate('/')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField 
            label='Username' 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            variant='standard'
            margin='dense'
          />
        </div>
        <div>
          <TextField 
            label='Password' 
            type='password'
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            variant='standard'
            margin='dense'
          />
        </div>
        <Button type='submit' variant='contained' style={{ marginTop: 10 }}>Log in</Button>
      </form>
    </div>
  )
}

export default LoginForm
