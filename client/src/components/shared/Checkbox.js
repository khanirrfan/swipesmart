import React from 'react'

const CheckBox = (props) => {
    return (
        <div>
            <li>
                <input key={ props.id } onChange={ props.handleCheckChieldElement } type="checkbox" checked={ props.isChecked } value={ props.value } /> { props.value }
            </li>
        </div>
    )
}

export default CheckBox;
