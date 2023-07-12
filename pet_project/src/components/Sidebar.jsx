import React, {useState} from "react";
import {
  FaTh,
  FaUserAlt,
  FaTwitter,
  FaVuejs,
  FaBars
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: '/',
      name: 'Главная',
      icon: <FaTh/>
    },
    {
      path: '/calendar',
      name: 'Календарь',
      icon: <FaTwitter/>
    },
    {
      path: '/todolist',
      name: 'Список дел',
      icon: <FaVuejs/>
    },
    {
      path: '/account',
      name: 'Личный кабинет',
      icon: <FaUserAlt/>
    }
  ]

  

  return (
  <div className="container">
    <div style ={{width: isOpen ? "270px" : "50px"}} className="sidebar">
      <div className="top_section">
        <h1 style={{display: isOpen ? "block":"none" }} className="logo">Свернуть</h1>
        <div style ={{marginLeft: isOpen ? "50px" : "3px"}} className="bars">
          <FaBars onClick={toggle}/>
        </div>
      </div>
      {
        menuItem.map((item,index) => (
          <NavLink to={item.path} key={index} className="link" activeclassName="active">
            <div className="icon">{item.icon}</div>
            <div style={{display: isOpen ? "block":"none" }} className="link_text">{item.name}</div>

          </NavLink>
        ))
      }
    </div>
    <main>   
      <div className="title_app">
        <h1>Органайзер</h1>
      </div>
      {children}
  
    </main>
  </div>
  )
};

export default Sidebar;
