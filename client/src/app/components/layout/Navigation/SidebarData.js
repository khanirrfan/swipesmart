import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

const SidebarData = [
    {
        title: 'Post Article',
        path:'#',
        icon: <FaIcons.FaPlus />,
        cName:'nav-post'
    },
    {
        title: 'Dashboard',
        path: '#',
        icon: <FaIcons.FaBriefcase />,
        cName: 'nav-text'
    },
    {
        title: 'Saved Jobs',
        path: '#',
        icon: <IoIcons.IoIosSave />,
        cName: 'nav-text'
    },
    {
        title: 'Applied Jobs',
        path: '#',
        icon: <IoIcons.IoIosArchive />,
        cName: 'nav-text'
    },
    {
        title: 'Events',
        path: '#',
        icon: <IoIcons.IoIosCalendar />,
        cName: 'nav-text'
    },
]

export default SidebarData;