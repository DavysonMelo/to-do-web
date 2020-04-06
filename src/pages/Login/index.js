import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './styles.css'

import api from '../../services/api'

import logo from '../../assets/logo.png'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      history.push('/home')
    }
  }, [])

  async function handleLogin(e) {
    e.preventDefault()

    try {
      if(email === ''){
        alert(`Email field can't be empty!`)
      }else if(password === ''){
        alert(`Password field can't be empty!`)
      }else{
        const response = await api.post('sessions', { email, password })
        const { _id } = response.data.user
      
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userId', _id)

        history.push('/home')
      }
    } catch(error) {
      alert('Invalid login')
    }
  }

  return(
    <div className="container">
      <img className="logo" src={logo} alt="logo"/>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Link to="/register">Not registered? Sign up</Link>

        <button type="submit">Sign in</button>
      </form>
    </div>
  )
}