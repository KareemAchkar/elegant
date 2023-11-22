import React, { useContext, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { ProductsContext } from '../../context/ProductContext';

export const AuthDetails = () => {
  const { authUser, setAuthUser } = useContext(ProductsContext)
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });


    return () => {
      unsubscribe();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Sign out successfully');
        // Redirect to the home page or login page after signing out
        navigate('/SignIn'); // Adjust the path as needed
      })
      .catch((error) => console.log(error));
  };

  // Conditionally render based on authentication status
  if (authUser) {
    return (
      <div>
        <p>{`Signed In ${authUser.email}`}</p>
        <button onClick={userSignOut}>Sign Out</button>
      </div>
    );
  } else {
    // Redirect unauthenticated users to the login page
    navigate('/SignIn');
    // Return null or an empty placeholder
    return null;
  }
};
