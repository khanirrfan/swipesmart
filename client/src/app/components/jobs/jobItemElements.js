import styled from 'styled-components';

export const JobContainer = styled.div`
    /* display: flex; */
    justify-content: flex-start;
    border-radius: 4px;
    border:1px solid red;
    
`;

export const JobWrapper = styled.div`
    display: flex;

`;

export const JobCards = styled.div`
    display: flex;
    justify-content: flex-start;
    /* height:100px; */
`;

export const CompanyLogo = styled.div`
    /* margin-left:1rem; */
    margin: 1rem;
    height:80px;
    width:80px;
    border:1px solid blue;
    border-radius: 80%;
`;

export const CompanyDetails = styled.div`
    display: block;
    border: 1px solid #000;
    margin: 0.5rem auto;
`;

export const CompanyName = styled.div`
font-weight: bold;
font-size: 18px;
`;

export const JobTitle = styled.div`
font-size: 14px;
`;

export const JobOverview = styled.div`
    display: flex;
    justify-content:flex-start;
    align-items: flex-start;
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

export const JobSkills = styled.ul`
    margin-top:0.5rem;
    display: flex;
`;

export const JobSkillsItem = styled.li`
    margin-right:0.5rem;
`;
export const JobCardFooter = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items:flex-start;
`;

export const JobCategory = styled.div`
    margin-top:1rem;
    margin-left:1rem;
`;