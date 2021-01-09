import React from 'react'
import PropTypes from 'prop-types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './CompanyDetails.scss'

const CompanyDetails = ({ handleChange, getData, companyName, companyWebsite, companySize, industry, about,nextStep }) => {

    const handleOnChange = (event, editor) => {
        const data = editor.getData();
        getData(data);
    } 

    const next = (e) => {
        e.preventDefault()
        nextStep()
    }
    return (
        <>
            <h2>Company Details</h2>
            <div className="bg-white px-9 pt-9 pb-7 shadow-8 rounded-4">
                <form>
                    <div className="detailsContainer">
                        <div className="form-row row">
                            <div className="col-sm-12 col-md-6 mb-7">
                                <label className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset">Name</label>
                                <input
                                    type="text"
                                    placeholder="Compnay Name"
                                    name="companyName"
                                    value={ companyName }
                                    onChange={ handleChange('companyName') }
                                    className="form-control" />
                            </div>
                            <div className="col-sm-12 col-md-6 mb-7">
                                <label className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset">Website</label>
                                <input
                                    type="text"
                                    placeholder="Compnay Website"
                                    name="companyWebsite"
                                    value={ companyWebsite }
                                    onChange={ handleChange('companyWebsite') }
                                    className="form-control" />
                            </div>
                        </div>
                        <div className="form-row row">
                            <div className="col-sm-12 col-md-6 mb-7">
                                <label className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset">Size</label>
                                <input
                                    type="text"
                                    placeholder="Compnay Size"
                                    name="companySize"
                                    value={ companySize }
                                    onChange={ handleChange('companySize') }
                                    className="form-control" />
                            </div>
                            <div className="col-sm-12 col-md-6 mb-7">
                                <label className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset">Industry</label>
                                <input
                                    type="text"
                                    placeholder="Compnay Industry"
                                    name="industry"
                                    value={ industry }
                                    onChange={ handleChange('industry') }
                                    className="form-control" />
                            </div>
                        </div>
                        <div className="col-12 mb-7">
                            <label className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset">About</label>
                            <CKEditor
                                placeholder = "About"
                                editor={ ClassicEditor }
                                data={ about }
                                name = 'about'
                                value = {about}
                                type="text"
                                onChange={handleOnChange}
                              
                            />
                        </div>
                    </div>
                </form>
            </div>
            <div className="buttons-container">
                <button className =" btn" style= {{float:'right'}} onClick={ e => next(e) }>Next</button>
            </div>
        </>
    )
}

CompanyDetails.propTypes = {
    handleChange: PropTypes.func
};

export default CompanyDetails
