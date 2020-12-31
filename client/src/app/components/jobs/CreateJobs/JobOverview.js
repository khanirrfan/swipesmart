import React from 'react'

const JobOverview = ({nextStep, prevStep, jobTitle, salary,
experience, skills, workingDays, handleChange}) => {
    const next = (e) => {
        e.preventDefault()
        nextStep()
    }
    const prev = (e) => {
        e.preventDefault()
        prevStep()
    }
    return (
        <>
          <h2>Job Overview</h2>  
            <div className="bg-white px-9 pt-9 pb-7 shadow-8 rounded-4">
                <form>
                    <div className="detailsContainer">
                            <div className="col-sm-6 col-md-6 mb-7">
                                <label className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset">Job Title</label>
                                <input
                                    type="text"
                                    placeholder="Job Title"
                                    name="jobTitle"
                                    value={ jobTitle }
                                    onChange={ handleChange('jobTitle') }
                                    className="form-control" />
                            </div>
                            <div className="col-sm-6 col-md-6 mb-7">
                                <label className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset">Experience</label>
                                <input
                                    type="text"
                                    placeholder="Experience"
                                    name="experience"
                                    value={ experience }
                                    onChange={ handleChange('experience') }
                                    className="form-control" />
                            </div>
                            <div className="col-sm-6 col-md-6 mb-7">
                                <label className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset">salary</label>
                                <input
                                    type="text"
                                    placeholder="Salary"
                                    name="salary"
                                    value={ salary }
                                    onChange={ handleChange('salary') }
                                    className="form-control" />
                            </div>
                            <div className="col-sm-6 col-md-6 mb-7">
                                <label className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset">Working Days</label>
                                <input
                                    type="text"
                                    placeholder="Working Days"
                                    name="workingDays"
                                    value={ workingDays }
                                    onChange={ handleChange('workingDays') }
                                    className="form-control" />
                            </div>
                        <div className="col-sm-6 col-md-6 mb-7">
                            <label className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset">Skills</label>
                            <input
                                type="text"
                                placeholder="Skills"
                                name="skills"
                                value={ skills }
                                onChange={ handleChange('skills') }
                                className="form-control" />
                        </div>
                        
                    </div>
                </form>
            </div>
            <div className="buttons-container">
                <button className=" btn" style={ { float: 'right' } } onClick={ e => next(e) }>Next</button>
                <button className=" btn" style={ { float: 'left' } } onClick={ e => prev(e) }>Back</button>
            </div>
        </>
    )
}

export default JobOverview
