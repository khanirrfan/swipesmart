import React, { useState } from 'react';
import * as BsIcons from 'react-icons/bs';
import { Link } from 'react-router-dom';
import ListItems from '../../shared/directives/List-items';

import SidebarData from './SidebarData';

import './Sidebar.css';

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false)
    let [topic, setTopic] = useState({select:''})
    const showSideBar = () => {
        setSidebar(!sidebar)
        console.log('state changed');
    }

    const handleClick = (e, title) => {
        console.log(title);
        topic.select = title;
        setTopic(topic)
        console.log(topic);
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

          <div className="content">
            { topic.select === '' &&
                <p> content limit for all sidebar elements</p>
            }
            { topic.select === 'Post Article' &&
                    <p>content</p>
            }
            { topic.select === 'Dashboard' &&
                    <p>content1</p>
            }
            { topic.select === 'Events' &&
                    <p>content2</p>
            }
            { topic.select === 'Applied Jobs' &&
                    <p>content3</p>
            }
            { topic.select === 'Saved Jobs' &&
                    <p>content4</p>
            }
          </div>

            
        </>
    )
}

export default Sidebar;
