import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './Stepper.scss'

// props :
// 1. array of steps - steps
// 2. stepper direction - direction

const Stepper = ({ steps, direction, currentStepNumber }) => {

    const [step, setStep] = useState(
        {
            steps: []
        })
    useEffect(() => {
        const stepArray = steps
        const stepState = stepArray.map((item, index) => {
            const stepObj = {}
            stepObj.description = item;
            stepObj.completed = false;
            stepObj.highlighted = index === 0 ? true : false;
            stepObj.selected = index === 0 ? true : false;
            return stepObj;
        });
        const currentSteps = updateStep(currentStepNumber - 1, stepState)
        setStep({ steps: currentSteps })
    })

    const displayArray = step.steps;
    const updateStep = (stepNumber, displayArray) => {
        const newSteps = [...displayArray]    
        // completed - to show a checkmark
        // selected - to fill the step with color
        // highlighted - to make the description bold

        // 1. current step
        // 2. past steps
        // 3. future step

        let stepCounter = 0;
        while(stepCounter < newSteps.length) {
            // currentSteps

            if(stepCounter === stepNumber) {
                newSteps[stepCounter] = {
                    ...newSteps[stepCounter],
                    highlighted:true,
                    selected: true,
                    completed: false
                };
                stepCounter++;
            }

            // past steps
            else if(stepCounter < stepNumber) {
                newSteps[stepCounter] = {
                    ...newSteps[stepCounter],
                    highlighted: false,
                    selected: true,
                    completed:true
                }
                stepCounter++
            }

            // future steps
            else{
                newSteps[stepCounter] = {
                    ...newSteps[stepCounter],
                    highlighted: false,
                    selected: false,
                    completed: false
                }
                stepCounter++
            }
        }

        return newSteps;

    }
    const stepDisplay = displayArray.map((item, index) => {
        return (
            <div key = {index} className="step-wrapper">
                <div className={ `step-number 
                ${item.selected ? "step-number-active" : "step-number-disabled"
                    }` }>
                    { item.completed ?
                        <span>&#10003;</span> : index + 1
                    }
                </div>
                <div className={ `step-description ${item.highlighted && "step-description-active"}` }>{ item.description }</div>
                <div className={ index !== displayArray.length - 1 ? `divider-line divider-line-${displayArray.length}` : '' } />
            </div>
        )
    })
    return (
        <div className={ `stepper-wrapper-${direction}` }>
            {stepDisplay }
        </div>
    )
}

Stepper.prototype = {
    direction: PropTypes.string.isRequired,
    steps: PropTypes.array.isRequired
}
export default Stepper
