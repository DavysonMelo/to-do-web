import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

import logo from '../../assets/logo.png'

export default function Login() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeat, setRepeat] = useState('')
  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault()

    const data = {
      name,
      email,
      password
    }

    try {
      if(name === '') {
        alert(`Name field can't be empty!`)
      }else if(email === '') {
        alert(`Email field can't be empty!`)
      }else if(password === '') {
        alert(`Password field can't be empty!`)
      }else if(repeat === '') {
        alert(`You must confirm your password!`)
      }else {
        if(password === repeat){

          const response = await api.post('user', data)

          const { _id } = response.data.user

          localStorage.setItem('token', response.data.token)
          localStorage.setItem('userId', _id)

          history.push('/home')

        }else{
          alert('Passwords must be the same!')
        }
      }
    } catch(error) {
      alert('Register error');
    }

  }

  return(
    <div className="container">
      <img className="logo" src={logo} alt="logo"/>

      <form onSubmit={handleRegister}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
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
        <input
          placeholder="Repeat"
          type="password"
          value={repeat}
          onChange={e => setRepeat(e.target.value)}
        />

        <button type="submit">Sign up</button>
      </form>
    </div>
  )
}