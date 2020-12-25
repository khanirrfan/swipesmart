import React from 'react'

const CheckBox = (props) => {
    return (
        <div>
            <li>
                <input key={ props.id } onChange={ props.handleCheckFieldElement } type="checkbox" checked={ props.isChecked } value={ props.value } name={props.name}/> { props.label }
            </li>
        </div>
    )
}

export default CheckBox;
