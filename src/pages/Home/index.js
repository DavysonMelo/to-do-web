import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

import logo from '../../assets/logo.png'
import send from '../../assets/send 1.png'
import remove from '../../assets/cross 1.png' 

export default function Login() {
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const [toDos, setToDos] = useState([])
  const [title, setTitle] = useState('')
  const history = useHistory()

  useEffect(() => {
    loadToDos()
   },[toDos])

   async function loadToDos() {
    try {
      if(userId){
        const response = await api.get('todo', {
          headers: {
            Authorization: `Bearer ${token}`,
            userid: userId
          }
        })
        setToDos(response.data)
      }
    } catch(error) {
      alert(error)
    }
   }

   async function handleDelete(id) {
     try {
      await api.delete(`todo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          userid: userId
        }
      })
      setToDos(toDos.filter(toDo => toDo._id !== id))
     } catch(error) {
       alert('Delete error')
     }
   }

   async function handleAddToDo() {
     try {
      const response = await api.post('todo', { title }, {
        headers: {
          Authorization: `Bearer ${token}`,
          userid: userId
        }
      })

      setTitle('')
      setToDos([...toDos, response.data])
     } catch(error) {
       alert('Add error')
     }
   }

   function handleLogout() {
     localStorage.clear()

      history.push('/')
   }

  return(
    <div className="container">
      <img className="logo" src={logo} alt="logo"/>
      <div className="addToDo">

        <input
          placeholder="What do you have to do?"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <button
          className="sendButton"
          onClick={handleAddToDo}
        >
          <img src={send} alt="send"/>
        </button>  

      </div>
      <ul className="toDoList">
        {toDos.map(toDo => (
          <li key={toDo._id}>
          <p>{toDo.title}</p>
          <button onClick={() => handleDelete(toDo._id)}>
            <img src={remove} alt="remove"/>
          </button>
        </li>
        ))}
      </ul>
      <button
        className="btnExit"
        onClick={handleLogout}
      >
        Exit
      </button>
    </div>
  )
}