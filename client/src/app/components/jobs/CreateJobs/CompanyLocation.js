import React from 'react'

const CompanyLocation = ({country, city, locality, handleChange, nextStep, prevStep}) => {
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
            <h2>Company Location</h2>
            <div className="bg-white px-9 pt-9 pb-7 shadow-8 rounded-4">
                <form>
                    <div className="detailsContainer">
                        <div className="form-row row">
                            <div className="col-sm-6 col-md-6 mb-7">
                                <label className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset">Country</label>
                                <input
                                    type="text"
                                    placeholder="Country"
                                    name="city"
                                    value={ country }
                                    onChange={ handleChange('city') }
                                    className="form-control" />
                            </div>
                            <div className="col-sm-6 col-md-6 mb-7">
                                <label className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset">City </label>
                                <input
                                    type="text"
                                    placeholder="City"
                                    name="city"
                                    value={ city }
                                    onChange={ handleChange('city') }
                                    className="form-control" />
                            </div>
                        </div>
                        <div className="form-row row">
                            <div className="col-sm-6 col-md-6 mb-7">
                                <label className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset">Locality</label>
                                <input
                                    type="text"
                                    placeholder="Locality"
                                    name="locality"
                                    value={ locality }
                                    onChange={ handleChange('locality') }
                                    className="form-control" />
                            </div>
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

export default CompanyLocation
