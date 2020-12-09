import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';

// import Like from '../shared/pages/Home/Like';
import { Button } from '../shared/pages/Home/Forms';
import Modal from '../shared/pages/Home/Modal';
import Avatar from '../shared/pages/Home/Avatar';
import { Spacing } from '../shared/Layout';
import { A, H3 } from '../shared/pages/Home/Text';
import { timeAgo } from '../shared/utils/date';

import { DotsIcon, PostCommentIcon } from '../shared/icons';
// import PostItemOptions from './PostItemOptions';

const Root = styled.div`
  width: 100%;
  border-radius: ${(p) => p.theme.radius.sm};
  padding-bottom: ${(p) => p.theme.spacing.xs};
  background-color: ${(p) => p.theme.colors.white};
  border: 1px solid ${(p) => p.theme.colors.border.main};
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${(p) => p.theme.spacing.xs} ${(p) => p.theme.spacing.sm};
`;

const CreatedAt = styled.div`
  font-size: ${(p) => p.theme.font.size.xxs};
  color: ${(p) => p.theme.colors.text.hint};
  border-bottom: 1px solid ${(p) => p.theme.colors.text.secondary};
  border: 0;
  margin-top: 2px;
`;

const Author = styled(A)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Name = styled.span`
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => p.theme.colors.primary.main};
`; const BottomRow = styled.div`
  overflow: hidden;
`;
const CountAndIcons = styled.div`
  padding: 0 ${(p) => p.theme.spacing.sm};
`;

const Count = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${(p) => p.theme.spacing.xs};
  font-size: ${(p) => p.theme.font.size.xs};
  color: ${(p) => p.theme.colors.text.secondary};
`;

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${(p) => p.theme.colors.border.main};
`;

const Comments = styled.div`
  padding: 0 ${(p) => p.theme.spacing.sm};
`;

const StyledButton = styled(Button)`
  padding: 0;
  padding-left: 4px;
  font-size: ${(p) => p.theme.font.size.xxs};
`;

const CommentLine = styled.div`
  margin-bottom: 5px;
  border-top: 1px solid ${(p) => p.theme.colors.border.main};
`;
const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, _uid, post,name, likes, comments, date },
  showActions
}) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  const toggleCreateComment = () => {
    setIsCommentOpen(true);
  };

  const toggleComment = () => {
    setIsCommentOpen(!isCommentOpen);
  };

  const closeOption = () => setIsOptionOpen(false);

  const openOption = () => setIsOptionOpen(true);

  return (
  <>
  <Root>
    <Modal onClose={closeOption} open= {isOptionOpen} >

    </Modal>
    <TopRow>
      <Author to={`profile/${auth.user.username}`}>
        <Avatar />
            <Spacing left="xs">
              <Name>{ name }</Name>
              <CreatedAt>{ timeAgo(date) }</CreatedAt>
            </Spacing>
      </Author>
          <Button ghost onClick={ openOption }>
            <DotsIcon />
          </Button>
    </TopRow>
        <Spacing left="sm" bottom="sm" top="xs">
          <H3>{ post }</H3>
        </Spacing>

        {/* image && <Poster src={ image } onClick={ openModal } /> */}
    <BottomRow>
      <CountAndIcons>
            {/*  <Count>
          {likes.length} Likes
              <Spacing />
              <StyledButton onClick={ toggleComment } text>
                { comments.length } comments
              </StyledButton>
        </Count>
            <Icons>
              <Like fullWidth withText user={ name } postId={ _id } likes={ likes } />

              <Button fullWidth text onClick={ toggleCreateComment }>
                <PostCommentIcon /> <Spacing inline left="xxs" /> <b>Comment</b>
              </Button>
            </Icons>*/}

      </CountAndIcons>
    </BottomRow>
    <div>
      {showActions && (
        <Fragment>
          <button
            onClick={() => addLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-up' />{' '}
            <span>{likes !== undefined && likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={() => removeLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-down' />
          </button>
          <Link to={`/post/get/${_id}`} className='btn btn-primary'>
            Discussion{' '}
            {comments !== undefined && comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
          </Link>
          {!auth.loading && _uid === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times' />
            </button>
          )}
            <CommentForm postId={ post._id } />
            <div className="comments">
              { post.comments !== undefined && post.comments.length > 0 &&
                post.comments.map(comment => (
                  <CommentItem key={ comment._id } comment={ comment } postId={ post._id } />
                )) }
            </div>

        </Fragment>
          )}
    </div>
      </Root>
  </>
)
};

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);
