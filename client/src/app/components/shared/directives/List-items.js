import React from 'react';
import { Link } from 'react-router-dom';

const ListItems = (props) => {

    const handleClick = (e, cName) => {
        console.log(e, cName)
    }
    return (
        <>
            <li className={ props.cName } onClick={ props.changeRoute}>
            <Link to={ props.path }>
                { props.icon }
                    <span>{ props.title }</span>
            </Link>

         </li>   
        </>
    )
}

export default ListItems;