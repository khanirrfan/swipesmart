import styled from 'styled-components';
import {Link} from 'react-router-dom';

import {GoLocation} from 'react-icons/go';
import { FiBriefcase } from 'react-icons/fi';
import { GrCurrency} from 'react-icons/gr';

export const JobContainer = styled.div`
    /* display: flex; */
    justify-content: flex-start;
    border-radius: 4px;
    border:1px solid #d3d3d3;
    margin-bottom:1rem;
    box-shadow: 0 1px 2px 0 rgba(0,106,194,.2);
    

    &:hover{
        transition:box-shadow linear 0.2s;
    }
    /* @media screen and (max-width:420px) {
        width:350px;
    }
    @media screen and (max-width:768px){
        width:100%;
        } */
`;

export const JobWrapper = styled(Link)`
    display: flex;

    @media screen and (max-width:920px) {
        display:block;
    }
`;

export const JobCards = styled.div`
    display: flex;
    justify-content: flex-start;
    @media screen and (max-width:920px) {
        display:block;
    }
`;

export const CompanyLogo = styled.div`
    margin-left:auto;
    margin-right: 1rem;
    margin-top: 1rem;
    order:2;
    height:80px;
    width:80px;
    border:1px solid blue;
    border-radius: 80%;

    @media screen and (max-width:920px) {
        margin-left:1rem;
    }
`;

export const CompanyDetails = styled.div`
    display: block;
    /* border: 1px solid #000; */
    margin: 0.5rem auto;

`;

export const CompanyName = styled.div`
font-weight: bold;
font-size: 18px;
margin: 0.5rem ;
`;

export const JobTitle = styled.div`
font-size: 14px;
margin: 0.5rem ;
`;

export const JobOverview = styled.div`
    display: flex;
    justify-content:flex-start;
    align-items: flex-start;
    margin: 0.5rem ;
`;

export const JobExperience = styled.div`
    margin-top:0.5rem;
    margin-right:0.5rem;
`;

export const JobSalary = styled.div`
    margin-top:0.5rem;
    margin-right:0.5rem;
`;

export const JobLocation = styled.div`
    margin-top:0.5rem;
    /* margin-right:0.5rem; */
`;
export const LocationIcon = styled(GoLocation)`
    /* height:12px; */
        margin-right:0.2rem;
`;
export const SalaryIcon = styled(GrCurrency)`
    /* height:12px; */
            margin-right:0.2rem;
`;
export const ExperienceIcon = styled(FiBriefcase)`
    /* height:12px; */
            margin-right:0.2rem;
`;
export const JobSkills = styled.ul`
    margin-top:0.5rem;
    display: flex;
    flex-wrap:wrap;
    margin: 0.5rem ;
`;

export const JobSkillsItem = styled.li`
    margin-right:0.5rem;
    background-color:rgb(238, 238, 238);
    padding:0.3rem;
    border-radius:4px;


`;
export const JobCardFooter = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items:flex-start;
`;

export const JobCategory = styled.div`
    padding:0.5rem;
    margin:1rem;
`;

export const JobPosted = styled.div`
    padding:0.5rem;
    margin:1rem;
`;

export const JobSaveOption = styled.div`
    margin-top:1rem;
    margin-bottom:1rem;
    margin-left:auto;
    margin-right:1rem;
    order:2;
    background:#F08080;
    color:#fff;
    align-items:center;
    text-align:center;
    padding:0.5rem 1rem;
    border:1px solid #d3d3d3;
    border-radius: 20px;
    transition: 0.2s ease-in-out;

    &:hover {
        background:#fff;
        color: #000;
    }
`;