import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { Spacing, Overlay, Container} from '../shared/Layout';

import PostImageUpload from '../shared/pages/Home/PostImageUpload';

import Avatar from '../shared/pages/Home/Avatar';

import { Button } from '../shared/pages/Home/Forms';

import { PROFILE_PAGE_POSTS_LIMIT } from '../shared/Constants/Datalimit';
import { HOME_PAGE_POSTS_LIMIT } from '../shared/Constants/Datalimit';
import { MAX_POST_IMAGE_SIZE } from '../shared/Constants/ImageSize';

const Root = styled(Container)`
  border: 0;
  border: 1px solid ${(p) => p.theme.colors.border.main};
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2px 0;
`;
const Textarea = styled.textarea`
  width: 100%;
  margin: 0 ${(p) => p.theme.spacing.xs};
  padding-left: ${(p) => p.theme.spacing.sm};
  padding-top: ${(p) => p.theme.spacing.xs};
  border: 0;
  outline: none;
  resize: none;
  transition: 0.1s ease-out;
  height: ${(p) => (p.focus ? '120px' : '40px')};
  font-size: ${(p) => p.theme.font.size.xs};
  background-color: ${(p) => p.theme.colors.grey[100]};
  border-radius: ${(p) => p.theme.radius.md};
`;
const ImagePreviewContainer = styled.div`
  width: 150px;
  height: 150px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: ${(p) => p.theme.shadows.sm};
`;
const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Options = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid ${(p) => p.theme.colors.border.main};
  padding: ${(p) => p.theme.spacing.sm} 0;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
`;

const PostForm = ({ addPost, auth:{user} }) => {
  console.log(user);
  const [post, setPost] = useState('');
  const [isFocused, setIsFocused] = useState(false)
  const [image, setImage] = useState('');

  const handleReset = () => {
    setImage('');
    setIsFocused(false)

  }

  const handleOnFocus = () => setIsFocused(true);
  const handlePostImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size >= MAX_POST_IMAGE_SIZE) {
      return;
    }

    setImage(file);

    setIsFocused(true);
    e.target.value = null;
  };
  const isShareDisabled =   !image || !post;

  return (
    <Fragment>
    { isFocused && 
      <Overlay onClick={handleReset}/> }

      <Root zIndex={ isFocused ? 'md' : 'xs' } color="white" radius="sm" padding="sm">
      <form className='form '
        onSubmit={e => {
          e.preventDefault();
          addPost({ post, user });
          setPost('');
        }}>
        <Wrapper>
            <Avatar size={ 40 } />
        <Textarea
          type="textarea"
          name='post'
          focus = {isFocused}
          onFocus={ handleOnFocus }
          placeholder='Add a post'
          value={post}
          onChange={e => setPost(e.target.value)}
          required/>

            { !isFocused && <PostImageUpload handleChange={ handlePostImageUpload } /> }
          </Wrapper>
          { image && (
            <Spacing bottom="sm">
              <ImagePreviewContainer>
                <ImagePreview src={ URL.createObjectURL(image) } />
              </ImagePreviewContainer>
            </Spacing>
          ) }
          { isFocused && (
            <Options>
              <PostImageUpload label="Photo" handleChange={ handlePostImageUpload } />

              <Buttons>
                <Button text type="button" onClick={ handleReset }>
                  Cancel
                </Button>
                <Button type="submit" disabled={ isShareDisabled}>
                  Share
                </Button>
              </Buttons>
            </Options>
          ) }
      </form>
    </Root>
  
    </Fragment>
  )
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
