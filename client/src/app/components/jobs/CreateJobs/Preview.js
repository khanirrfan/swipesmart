import React from 'react'

const Preview = ({ prevStep, jobTitle,
    jobDescription,
    experience,
    skills,
    visa,
    language,
    salary,
    country,
    jobCategory,
    jobType,
    companyName,
    city,
    locality,
    workingDays,
    companyWebsite,
    companySize,
    about,
    responsibility,
    perksBenefits,
    industry }) => {

    const Submit = (e) => {
        e.preventDefault()

    }
    const prev = (e) => {
        e.preventDefault()
        prevStep()
    }
    return (
        <>
            <h2>Preview</h2>
            About: <b>{ about }</b> <br></br>
            job description: <b>{ jobDescription }</b><br></br>
            industry: <b>{ industry }</b><br></br>
            companySize: <b>{ companySize }</b><br></br>
            companyWebsite: <b>{ companyWebsite }</b><br></br>
            workingDays: <b>{ workingDays }</b><br></br>
            locality: <b>{ locality }</b><br></br>
            city: <b>{ city }</b><br></br>
            companyName: <b>{ companyName }</b><br></br>
                        
            country: <b>{ country }</b><br></br>
            salary: <b>{ salary }</b><br></br>
            skills: <b>{ skills }</b><br></br>
            experience: <b>{ experience }</b><br></br>
            city: <b>{ city }</b><br></br>
            companyName: <b>{ companyName }</b><br></br>

            Benefits: <b>{ perksBenefits }</b><br></br>
            responsibility: <b>{ responsibility }</b><br></br>
            <div className="buttons-container">
                <button className=" btn" style={ { float: 'right' } } onClick={ e => Submit(e) }>Submit</button>
                <button className=" btn" style={ { float: 'left' } } onClick={ e => prev(e) }>Back</button>
            </div>
        </>
    )
}

export default Preview
