import './SignUp.scss'
import React, { useState } from 'react'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from '@firebase/auth'
import { ClipLoader } from 'react-spinners'
import { Button } from '../../components/LoadMore/LoadMore'

export const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signUp = (event: React.FormEvent) => {
    event.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);

      })
  }

  return (
    <>
      <div className='container authentication'>
        <div className='sign-up-container'>
          <form onSubmit={signUp}>
            <h1>Create An Account</h1>
            <input
              type="email"
              placeholder='Enter your email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder='Enter your password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              classname='Button'
              onClick={() => { }}
              text='Sign Up'
              disabled={false}
              isLoading={false}
              type='button'
            />
          </form>
        </div >
      </div>

      <div className="loader-wrapper">
        <ClipLoader color="#222222" size={50} />
      </div >

    </>

  )
}