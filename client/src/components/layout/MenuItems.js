import React, { useState} from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";
export const MenuItems = [
    {
        title: "Web Designs",
        path: "/designs",
        cName: "dropdown-link",
    },
    {
        title: "Machine Learning",
        path: "/ml",
        cName: "dropdown-link",
    },

];
const Dropdown = () => {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <Wrapper>
            <ul
                onClick={ handleClick }
                className={ click ? "dropdown-menu clicked" : "dropdown-menu" }
            >
                { MenuItems.map((item, index) => {
                    return (
                        <li key={ index }>
                            <Link
                                className={ item.cName }
                                to={ item.path }
                                onClick={ () => setClick(false) }
                            >
                                { item.title }
                            </Link>
                        </li>
                    );
                }) }
            </ul>
        </Wrapper>
    );
}

export default Dropdown;

const Wrapper = styled.div`
  /*render*/
  .dropdown-menu {
    z-index: 10;
    list-style: none;
    background: #1888ff;
    width: 100%;
    position: absolute;
    left: 0;
    top: 100%;
    border-radius: 4px;
    border-top: 2px solid rgb(28, 25, 25); /*TRICK: user experience*/ /*COLOR MATCHES BACKGROUND*/
    cursor: pointer;
    li {
      border-radius: 4px;
      &:hover {
        background: #5cabff;
      }
    }
  }

  @media screen and (max-width: 1200px) {
    .dropdown-menu {
      top: 0;
      left: 100%;
      border-top: none;
      border-left: 4px solid rgb(28, 25, 25);
    }
  }

  /*KEEP*/
  .dropdown-menu.clicked {
    display: none;
  }

  .dropdown-link {
    display: block;
    width: 100%;
    text-decoration: none;
    color: #fff;
    padding: 1rem;
  }
`;
