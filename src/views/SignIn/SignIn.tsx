import './SignIn.scss'
import React, { useContext, useState } from 'react'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { Button } from '../../components/LoadMore/LoadMore'
import { ProductsContext } from '../../context/ProductContext'


export const SignIn = () => {
  const { addedProducts } = useContext(ProductsContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const signIn = (event: React.FormEvent) => {
    event.preventDefault()
    signInWithEmailAndPassword(auth, email, password)     //only here firebase
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/woman')
      })
      .catch((error) => {
        window.alert('Please Enter a valid Username or Password');

      })
  }

  return (
    <>
      <div className='container authentication'>

        <div className='sign-in-container'>
          <form onSubmit={signIn}>
            <h1>Log In To Your Account</h1>
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
              text='Log In'
              disabled={false}
              isLoading={false}
              type='button'
            />

            <Link style={{ textDecoration: "none" }} to='/SignUp'>
              <p className='signOut'>Dont have account ? <u>Sign Up here</u></p>
            </Link>

            {addedProducts.length > 0 && (
              <Link to={'/checkout'} style={{ textDecoration: "none" }}>
                <p className='discount-text'>
                  continue payment without 10% discount</p>
              </Link>
            )}
          </form>
        </div >

      </div >

      <div className="loader-wrapper">
        <ClipLoader color="#222222" size={50} />
      </div >

    </>

  )
}