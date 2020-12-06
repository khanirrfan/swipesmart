import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost, auth:{user} }) => {
  console.log(user);
  const [post, setPost] = useState('');

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h4>What would you like announce...</h4>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addPost({ post, user });
          setPost('');
        }}>
        <textarea
          name='post'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={post}
          onChange={e => setPost(e.target.value)}
          required/>
        <input type='submit' className='btn btn-dark my-1' value='Submit'/>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth:state.auth
})

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
