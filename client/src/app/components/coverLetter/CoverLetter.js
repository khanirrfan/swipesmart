import React from 'react';
import {connect} from 'react-redux'; 

const CoverLetter = ({auth:{user}}) => {
    console.log(user);
    return (
        <div>
            
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth

}) 

export default connect(mapStateToProps, {}) (CoverLetter);