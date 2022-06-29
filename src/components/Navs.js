import React from 'react'
import {useLocation} from 'react-router-dom';
import { NavList, LinkStyled } from './Navs.styled';


const LINKS=[{to:'/',text:'HOME PAGE'},{to:'/starred',text:'STARRED PAGE'}]

const Navs = () => {
  const location=useLocation();
  return (
  <div>
    <NavList>
        {LINKS.map(item => {
          return <li key={item.to}>
            <LinkStyled to={item.to} className={item.to === location.pathname ? 'active' : ''}>{item.text}</LinkStyled>
          </li>
        })}
    </NavList>
  </div>  
  )
}

export default Navs