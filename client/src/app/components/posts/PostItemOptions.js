import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../shared/pages/Home/Forms'


const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  background-color: ${(p) => p.theme.colors.white};
  border-radius: ${(p) => p.theme.radius.sm};
  z-index: ${(p) => p.theme.zIndex.lg};
  box-shadow: ${(p) => p.theme.shadows.xl};
`;

const FollowItem = styled.div`
  padding: ${(p) => p.theme.spacing.sm} 0;
  text-align: center;
`;

const StyledButton = styled(Button)`
  padding: ${(p) => p.theme.spacing.sm} 0;
  text-align: center;
  border-top: 1px solid ${(p) => p.theme.colors.border.main} !important;

  &:first-child {
    border-top: 0 !important ;
  }

  &:hover {
    background-color: ${(p) => p.theme.colors.grey[100]};
    color: ${(p) => p.theme.colors.text.primary};
  }
`;

const PostItemOptions = ({ auth:{user}, _id, _uid, name, closeOption, deletePost}) => {
    const copyToClipboard = () => {}
    return (
        <Root>
           {/* {user._id !== _uid && (
                <FollowItem>
                    <Follow user={ author } />
                </FollowItem>
           ) }*/}

            <StyledButton fullWidth text onClick={ copyToClipboard }>
                Copy link
      </StyledButton>

            {user._id === _uid && (
                <StyledButton fullWidth text onClick={ deletePost }>
                    Delete post
                </StyledButton>
            ) }

            <StyledButton fullWidth onClick={ closeOption } text>
                Cancel
      </StyledButton>
        </Root>
    )
}

PostItemOptions.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {})(PostItemOptions);
