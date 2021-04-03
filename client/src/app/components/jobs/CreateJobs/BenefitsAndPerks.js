import React, {useState} from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const BenefitsAndPerks = ({ nextStep, prevStep, perksBenefits, getPerksAndBenefits, handleChange}) => {
    // const [text, setText] = useState("")
    const handleOnChange = (event, editor) => {
        const data = editor.getData();
        getPerksAndBenefits(data);
    }

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
            <h2>Benefits and perks</h2>   
            <div className="col-12 mb-7">
                <CKEditor
                    editor={ ClassicEditor }
                    data={ perksBenefits }
                    value={ perksBenefits}
                    name= "perksBenefits"
                    type="text"
                    onChange={ handleOnChange }
                />
            </div>
            <div className="buttons-container">
                <button className=" btn" style={ { float: 'right' } } onClick={ e => next(e) }>Next</button>
                <button className=" btn" style={ { float: 'left' } } onClick={ e => prev(e) }>Back</button>
            </div>
        </>
    )
}

export default BenefitsAndPerks
