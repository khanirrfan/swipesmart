import React from 'react'

const Tab = (props) => {
    return (
        <li onClick={ props.handleClick } className={ props.isActive ? "active" : null }>
            <a href="#">{ props.data.name }</a>
        </li>
    )
}

export default Tab;