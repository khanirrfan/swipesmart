import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post';
import { connect } from 'react-redux';
import PostItem from '../posts/PostItem';
import PostForm from '../posts/PostForm';


const Posts = ({
  getPosts,
  post: { posts, loading }
}) => {
  useEffect(() => {
    getPosts()
  }, [getPosts])
  return (
    <Fragment>
      <div className="profileLeftPane bg-white shadow-9 rounded-4">
        left
            </div>
      <div className="profileMiddlePane shadow-9 m-9" style={ { width: "60%" } }>
        <PostForm />
        {
          posts.map(post => (
            <PostItem key={ post._id } post={ post } />
          ))
        }

      </div>
      <div className="profileRightPane bg-white rounded-4 shadow-9">
        right
            </div>
    </Fragment>
  )
}
Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts);