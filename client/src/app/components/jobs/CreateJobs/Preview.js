import React from 'react'

const Preview = ({prevStep}) => {
    
    const Submit =(e) => {
        e.preventDefault()
        
    }
    const prev = (e) => {
        e.preventDefault()
        prevStep()
    }
    return (
        <>
         <h2>Preview</h2>
            <div className="buttons-container">
                <button className=" btn" style={ { float: 'right' } } onClick={ e => Submit(e) }>Submit</button>
                <button className=" btn" style={ { float: 'left' } } onClick={ e => prev(e) }>Back</button>
            </div>
        </>
    )
}

export default Preview
