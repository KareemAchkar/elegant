import './Header.scss'
import cn from 'classnames'
import { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Logo } from './Logo/Logo'
import { SearchInput } from './SearchInput/SearchInput'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { Offers } from '../Offers/Offers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../LoadMore/LoadMore'
import { faCheck, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { ProductsContext } from '../../context/ProductContext'

export const Header = () => {
  const { isAddClicked, myCartCounter, authUser, isPaymentDone } = useContext(ProductsContext);
  const navigate = useNavigate();


  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Sign out successfully');
        // Redirect to the home page or login page after signing out
        navigate('/SignIn'); // Adjust the path as needed
      })
      .catch((error) => console.log(error));
  };


  return (
    <>
      <div className='header-main-container'>
        <Offers />
        <div className='header-container'>
          <Link className='logo' to='/'>
            <Logo />
          </Link>

          <ul className='nav-list left-panel'>
            <li>
              <NavLink to='/woman' className={({ isActive }) => (cn('', { 'is-active': isActive }))}>
                WOMAN
              </NavLink>
            </li>
            <li>
              <NavLink to='/man' className={({ isActive }) => (cn('', { 'is-active': isActive }))}>
                MAN
              </NavLink>
            </li>
            <li>
              <NavLink to='/child' className={({ isActive }) => (cn('', { 'is-active': isActive }))}>
                CHILD
              </NavLink>
            </li>
            <li>
              <NavLink to='/baby' className={({ isActive }) => (cn('', { 'is-active': isActive }))}>
                BABY
              </NavLink>
            </li>
          </ul>

          <SearchInput />

          <ul className='nav-list right-panel'>
            <li>

              {authUser ? (
                <div className='headerLink'>
                  <FontAwesomeIcon className='headerLink-icon' icon={faSignOut} />
                  <div className='headerLink signOut'>
                    <h3 onClick={() => userSignOut()}>Sign Out</h3>
                  </div>
                </div>
              )
                : (
                  <Link to='/SignIn' className='headerLink'>
                    <svg className='headerLink-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20">
                      <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" fill="#888" />
                    </svg>
                    <h3 className='headerLink-title'>Sign In</h3>
                  </Link>
                )
              }




            </li>
            <li>
              <Link to='/Whishlist'>
                <div className='headerLink'>
                  <svg className='headerLink-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
                    <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" fill="#888" /></svg>

                  <h3 className='headerLink-title'>My Favorites</h3>
                </div>
              </Link>
            </li>
            <li>
              <Link to='/MyCart'>
                <div className='headerLink'>
                  <div className='mycart-container'>
                    <div className='mycart-counter'>{myCartCounter}</div>
                    <svg className='headerLink-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="20" height="20">
                      <path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" fill="#888" /></svg>
                  </div>
                  <h3 className='headerLink-title'>My Cart</h3>
                </div>
              </Link>
            </li>
          </ul>




          {isAddClicked && (
            <div className={cn('product-added-message-container', { 'animate': isAddClicked })}>
              <div className="product-check-container">
                <FontAwesomeIcon className="product-check" icon={faCheck} size="2x" border color="green" />
                <h2 className="product-added-message">The product has been added to your cart.</h2>
              </div>
              <Link to='/MyCart' style={{ textDecoration: 'none' }}>
                <Button
                  classname="product-addButton cart"
                  onClick={() => { }}
                  text="Go to Cart"
                  disabled={false}
                  isLoading={false}
                  type='button'
                />
              </Link>
            </div>
          )}


          {isPaymentDone && (
            <div className={cn('product-added-message-container', { 'animate': isPaymentDone })}>
              <div className="product-check-container">
                <FontAwesomeIcon className="product-check" icon={faCheck} size="2x" border color="green" />
                <h2 className="product-added-message">The payment has been Successfully done </h2>
              </div>
              <Link to='/woman' style={{ textDecoration: 'none' }}>

                <Button
                  classname="product-addButton cart"
                  onClick={() => { }}
                  text="Go Home Page"
                  disabled={false}
                  isLoading={false}
                  type='button'
                />
              </Link>
            </div>
          )}



        </div>
        <div className='menu-item-container'>
          <ul>
            <li>
              <span>Clothes</span>
            </li>
            <li>
              <span>Shoe</span>
            </li>
            <li>
              <span>Accessory</span>
            </li>
          </ul>
          <div className='menu-gap'></div>
        </div>


      </div>

        <ul className='nav-list-gender-1200px'>
          <li>
            <NavLink to='/woman' className={({ isActive }) => (cn('', { 'is-active': isActive }))}>
              WOMAN
            </NavLink>
          </li>
          <li>
            <NavLink to='/man' className={({ isActive }) => (cn('', { 'is-active': isActive }))}>
              MAN
            </NavLink>
          </li>
          <li>
            <NavLink to='/child' className={({ isActive }) => (cn('', { 'is-active': isActive }))}>
              CHILD
            </NavLink>
          </li>
          <li>
            <NavLink to='/baby' className={({ isActive }) => (cn('', { 'is-active': isActive }))}>
              BABY
            </NavLink>
          </li>
        </ul>

    </>
  )
}