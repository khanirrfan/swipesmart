import React from 'react';
import { Link } from 'react-router-dom';

const ListItems = (props) => {

    return (
        <>
            <li className={ props.cName } onClick={ props.changeRoute}>
            <Link to={ props.path }>
                { props.icon }
                    <span className="span">{ props.title }</span>
            </Link>

         </li>   
        </>
    )
}

export default ListItems;