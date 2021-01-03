import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Video from '../../../../assets/Videos/video-2.mp4'
// import Video from '../../../../'
import { LandingContainer, LandingBg, VideoBg, LandingContent, LandingH1, LandingP, LandingBtnWrapper, ArrowForward, ArrowRight } from './LandingElement';

import { Button } from '../../shared/ButtonElement';
import InfoSection from '../InfoSection/InfoSection';
import { homeObjOne, homeObjTwo, homeObjThree } from '../InfoSection/Data';
import Services from '../Services/Services';
import Footer from '../Footer/Footer';
const Landing = ({ auth: { user, isAuthenticated } }) => {

    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }
    if (isAuthenticated) {
        return <Redirect to={ `/getProfileByID/${user._id}` } />;
    }
    return (
        <>
            <LandingContainer id="home">
                <LandingBg>
                    <VideoBg autoplay loop muted src={ Video } type="video/mp4" />
                </LandingBg>
                <LandingContent>
                    <LandingH1>Jobs World</LandingH1>
                    <LandingP>The home of your dreams</LandingP>
                    <LandingBtnWrapper>
                        <Button
                            onMouseEnter={ onHover }
                            onMouseLeave={ onHover }
                            primary='true'
                            dark='true'
                            to="/register"

                        >Get Started { hover ? <ArrowForward /> : <ArrowRight /> }</Button>
                    </LandingBtnWrapper>
                </LandingContent>
            </LandingContainer>
            <InfoSection { ...homeObjOne } />
            <InfoSection { ...homeObjTwo } />

            <Services />
            <InfoSection { ...homeObjThree } />
            <Footer />
        </>
    );
};

Landing.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Landing);