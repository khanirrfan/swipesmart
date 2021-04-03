import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

import { Button, Textarea } from '../shared/pages/Home/Forms';

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding:1rem;
`;

const CommentForm = ({ postId, addComment, focus }) => {
  const [text, setText] = useState('');

  const [comment, setComment] = useState('');
  const buttonEl = useRef(false);
  const TextareaEl = useRef(false);


  useEffect(() => {
    focus && TextareaEl.current.focus();
  }, [focus]);

  const handleComment = (e) => {
    setText(e.target.value)
    // buttonEl.
    setComment(e.target.value)

  }
  const handleSubmit = (e) => {
    
      e.preventDefault();
      addComment(postId, { text });
      setText('');
    
  }
  const onEnterPress = (e) => {
    
  }
  return (

      <Form
        onSubmit={e => handleSubmit(e)}
      >
          <Textarea
          placeholder='Add a comment'
          value={ text }
          onChange={ e => handleComment(e) }
          onKeyDown ={ onEnterPress}
          ref= {TextareaEl}
           />
           <Button 
            type="submit"
            color={ comment ? 'primary.main' : 'grey[500]' }
            weight="bold"
            text
            ref={ buttonEl }
            disabled={ !comment } 
          >
            Post
           </Button>
      </Form>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  focus: PropTypes.bool,
};

export default connect(
  null,
  { addComment }
)(CommentForm);
