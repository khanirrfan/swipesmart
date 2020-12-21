import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import { Link } from 'react-router-dom';
import ListItems from '../../shared/directives/List-items';

import SidebarData from './SidebarData';

import './Sidebar.css';

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false)
    const showSideBar = () => {
        setSidebar(!sidebar)
        console.log('state changed');
    }

    const handleClick = (e, title) => {
        console.log(title);
    }
    return (
        <>
          <div className="side-Navbar">
            
            <Link to ="#" className="menu-bars">
                    <span onClick={ showSideBar }>
                        <BsIcons.BsLayoutSidebar /> 
                        <span>
                            Open Sidebar
                        </span>
                    </span>
            </Link>
          </div>  
          <nav className={sidebar ? 'sideNav-menu-active' : 'sideNav-menu'}>
                <ul className="sideNav-menu-items show collapse" onClick={ showSideBar }>
                {SidebarData.map((item, index) =>{
                    return (
                        <ListItems key={index} {...item} changeRoute = {e => handleClick(e, item.title)}/>
                    )
                })}
            </ul>
               
          </nav>

          
        </>
    )
}

export default Sidebar;
