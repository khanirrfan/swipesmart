import React from 'react';
import { Link, generatePath } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

import { CloseIcon } from '../shared/icons';
import { A } from '../shared/pages/Home/Text';
import { Spacing } from '../shared/Layout';
import Avatar from '../shared/pages/Home/Avatar';

const DeleteButton = styled.button`
  cursor: pointer;
  display: none;
  background-color: transparent;
  border: 0;
  outline: 0;
  position: absolute;
  right: 7px;
  top: 6px;
`;

const Root = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${(p) => p.theme.spacing.xxs} 0;
  font-size: ${(p) => p.theme.font.size.xxs};

  &:hover ${DeleteButton} {
    display: block;
  }
`;

const UserName = styled.div`
  color: ${(p) => p.theme.colors.primary.main};
  font-weight: ${(p) => p.theme.font.weight.bold};
`;

const CommentSection = styled.div`
  position: relative;
  word-wrap: break-word;
  overflow: hidden;
  padding: 0 ${(p) => p.theme.spacing.lg} ${(p) => p.theme.spacing.xxs} ${(p) => p.theme.spacing.xs};
  background-color: ${(p) => p.theme.colors.grey[100]};
  border-radius: ${(p) => p.theme.radius.lg};
  margin-left: ${(p) => p.theme.spacing.xxs};
  color: ${(p) => p.theme.colors.text.main};
`;

const CommentItem = ({
  postId,
  comment: { _uid, commenttext, username, date },
  auth:{user, loading},
  deleteComment
}) => {
  const handleDeleteComment = async () => {}
  return (
    <>
    <Root>
      <A
          to={ `/profile/${username}` }
      >
        <Avatar  />
      </A>
        <CommentSection>
          { _uid === user._id && (
            <DeleteButton onClick={ handleDeleteComment }>
              <CloseIcon width="10" />
            </DeleteButton>
          ) }

          <Spacing top="xxs" />

          <Spacing inline right="xxs">
            
          </Spacing>

          { commenttext }
        </CommentSection>
      </Root>

    <div>
      <Link to={`/profile/${user}`}>
        <img className='round-img' alt='' />
        <h4>{username}</h4>
      </Link>
    </div>
    <div>
      <p className='my-1'>{commenttext}</p>
      <p className='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      {!loading && user === user._id && (
        <button
          onClick={() => deleteComment(postId, _uid)}
          type='button'
          className='btn btn-danger'
        >
          <i className='fas fa-times' />
        </button>
      )}
    </div>
  </>
);
}
CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
