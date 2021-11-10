import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Logo from '../images/pokemon_logo.png';

const Header = withRouter(({location}) => {
  
  const [header, setHeader] = useState(false); // 스크롤 내렸는지 확인하는 변수
  const changeHeader = () => { // 스크롤 여부에 때라 변수 set하는 함수
    if (window.scrollY >= 100) {
      setHeader(true)
    } else {
      setHeader(false)
    }
  }

  window.addEventListener('scroll', changeHeader)

  const setClass = () => { // 헤더 className 리턴하는 함수
    if (location.pathname === '/') {
      if (header) {
        return 'header fixed-header'
      } else {
        return 'header'
      }
    } else {
      return 'header fixed-header'
    }
  }

  return (
    <div className={setClass()} style={location.pathname === '/' ? {position: 'fixed', zIndex: '999'} : {position: 'static'}}>
      <Link to="/">
        <img src={Logo} alt="logo"/>
      </Link>
      <div className="menu">
        <p><Link to="/">HOME</Link></p>
        <p><Link to="/bag">MY BAG</Link></p>
      </div>
    </div>


      
  )
})

export default withRouter(Header)
