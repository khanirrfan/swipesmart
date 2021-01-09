import styled from 'styled-components';

export const JobDescriptionContainer = styled.div`
    
    border:1px solid #d3d3d3;
    margin-bottom:1rem;
    border-radius: 10px;
    box-shadow: 0.5rem 0.5rem 0.5rem lightgrey;
    

`;

export const CompanyOverview = styled.div`
    display:flex;
`;

export const JobDetails = styled.div`
    display: flex;
`;

export const CompanyLogo = styled.div`
    margin:1rem;
    height:80px;
    width:80px;
    border:1px solid blue;
    border-radius: 80%;

    @media screen and (max-width:920px) {
        margin-left:1rem;
    }
`;

export const JobTitle = styled.div`
   font-size: 18px;
   margin-top: 1rem ;
   font-weight: bold;
`;
export const CompanyName = styled.div`
    font-size: 14px;
`;

export const JobMatch = styled.div`
    margin-left: auto;
    margin-top:1rem;
    margin-right:0.5rem;
    order:2;


`;

export const ButtonsSection = styled.div`
    display: flex;
    margin:1rem;
    border-bottom:1px solid;
`;

export const Button = styled.div`
  background:#f4f4f4;
  color: #333;
  cursor: pointer;
  margin-right: 0.5rem;
  margin-bottom:1rem;
  transition: opacity 0.2s ease-in;
  outline: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
  border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

`;

export const JobOverview = styled.div`
    display:flex;
    margin:1rem;
    width:100%;
`;

export const JobSalary = styled.div`
    width: 30%;
`;

export const JobCategory = styled.div`
    width: 30%;`;

export const JobExperience = styled.div`
    width: 30%;`;

export const JobRequirements = styled.div`
    /* display: flex; */
`;

export const CarerLevel  = styled.div`
`;