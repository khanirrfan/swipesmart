import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const jobItem = ({item}) => {
  console.log(item)
  return (

        <div className=" bg-white p-1 my-1">
        <div key ={item._id}>
         <p>jobtitle - {item.jobtitle}</p>
         <p>country - {item.country}</p>
         <p>salary - {item.salary}</p>
         <p> experience - {item.experience}</p>
         <p>visa - {item.visa}</p>
         <p>jd - {item.jobdescription}</p>
         
        </div>
        
        </div>
    )}
export default jobItem;