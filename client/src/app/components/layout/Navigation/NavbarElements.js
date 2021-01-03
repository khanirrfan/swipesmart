import { FaBars, FaTimes } from 'react-icons/fa';
import { Link as LinkR } from 'react-router-dom';
import { NavLink as Link } from 'react-router-dom';
import { Link as LinkS} from 'react-scroll'

import styled from 'styled-components';

export const Nav = styled.nav`
  background: ${({scrollNav}) => (scrollNav ? '#000' : '#010606')};
  height: 80px;
  display: flex;
  top:0;
  margin-top:-80px;
  position:sticky;
  width:100%;
  font-size:1rem;
  align-items:center;
  justify-content: center;
  padding: 0.5rem calc((100vw - 1600px) / 2);
  z-index: 10;

  @media screen and (max-width:950px) {
    transition:0.8s all ease
  }

`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: #15cdfc;
    border-bottom:2px solid #15cdfc;
  }
`;
export const NavLogo = styled(LinkS)`
display:flex;
justify-self:flex-start;
cursor:pointer;
align-items:center;
font-size:1.5rem;
margin-left:24px;
font-weight:bold;
text-decoration:none;
`

export const NavHeader = styled.h1`
font-size:1.5rem;
color:#fff;
`;
export const MobileIcon = styled.div`
display: none;

@media screen and (max-width:768px) {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  transform:translate(-100%, 60%);
  font-size:1.8rem;
  cursor:pointer;
  color:#fff;
}
`


export const NavItem = styled.div`
height:80px;
`

export const NavLinks = styled(LinkS)`
color:#fff;
display:flex;
align-items:center;
text-decoration:none;
padding: 0 1rem;
height: 100%;
cursor:pointer;

&.active {
  border-bottom:3px solid #01bf71
}

`

export const NavbarContainer = styled.div`
display:flex;
justify-content: space-between;
height:80px;
z-index:1;
width: 100%;
padding: 0 24px;
/* max-width:1100px; */
`
export const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const Times = styled(FaTimes)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.ul`
display:flex;
align-items:flex-start;
list-style:none;
text-align:center;
margin-right:-22px;

@media screen and (max-width:768px){
  display:none;
}
`

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(LinkR)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
