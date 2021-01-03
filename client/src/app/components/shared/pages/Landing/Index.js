import React, {useState} from 'react'
import Navbar from '../../../layout/Navigation/Navbar'
import TopNavBar from '../../../layout/Navigation/TopNavBar'

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)

    }

    return (
        <>
         <TopNavBar isOpen = {isOpen} toggle = { toggle}/>
         <Navbar toggle = {toggle}/>
        </>
    )
}

export default Navigation
