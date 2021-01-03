import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import {animateScroll as scroll } from 'react-scroll';

import { FooterContainer, FooterLinkItems, FooterLinkTitle, FooterLinksContainer, FooterWrap, FooterlinksWrapper, FooterLink, Social, SocialIconLink, SocialLogo, SocialMediaWrap,Socialicons,WebsiteRight } from './FooterElements'
const Footer = () => {
    const toggleHome = () => {
        scroll.scrollToTop()
    }
    return (
        <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>
                    <FooterlinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>About Us
                            </FooterLinkTitle>
                            <FooterLink to="/signin">How it works</FooterLink>
                            <FooterLink to="/signin">Testimonial</FooterLink>
                            <FooterLink to="/signin">Careers</FooterLink>
                            <FooterLink to="/signin">Investors</FooterLink>
                            <FooterLink to="/signin">Terms of Service</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>About Us
                            </FooterLinkTitle>
                            <FooterLink to="/signin">How it works</FooterLink>
                            <FooterLink to="/signin">Testimonial</FooterLink>
                            <FooterLink to="/signin">Careers</FooterLink>
                            <FooterLink to="/signin">Investors</FooterLink>
                            <FooterLink to="/signin">Terms of Service</FooterLink>
                        </FooterLinkItems>
                    </FooterlinksWrapper>
                    <FooterlinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>About Us
                            </FooterLinkTitle>
                            <FooterLink to="/signin">How it works</FooterLink>
                            <FooterLink to="/signin">Testimonial</FooterLink>
                            <FooterLink to="/signin">Careers</FooterLink>
                            <FooterLink to="/signin">Investors</FooterLink>
                            <FooterLink to="/signin">Terms of Service</FooterLink>
                        </FooterLinkItems>
                        <FooterLinkItems>
                            <FooterLinkTitle>About Us
                            </FooterLinkTitle>
                            <FooterLink to="/signin">How it works</FooterLink>
                            <FooterLink to="/signin">Testimonial</FooterLink>
                            <FooterLink to="/signin">Careers</FooterLink>
                            <FooterLink to="/signin">Investors</FooterLink>
                            <FooterLink to="/signin">Terms of Service</FooterLink>
                        </FooterLinkItems>
                    </FooterlinksWrapper>
                </FooterLinksContainer>
                <Social>
                    <SocialMediaWrap>
                        <SocialLogo onClick={ toggleHome}>SwipSmart</SocialLogo>
                        <WebsiteRight>SS <span>&#169;</span> { new Date().getFullYear() } All rights reserved.</WebsiteRight>
                        <Socialicons>
                            <SocialIconLink href="/" target="_blank" aria-label="Facebook">
                                <FaFacebook />
                            </SocialIconLink>
                            <SocialIconLink href="/" target="_blank" aria-label="Instagram">
                                <FaInstagram />
                            </SocialIconLink>
                            <SocialIconLink href="/" target="_blank" aria-label="Youtube">
                                <FaYoutube />
                            </SocialIconLink>
                            <SocialIconLink href="/" target="_blank" aria-label="Twitter">
                                <FaTwitter />
                            </SocialIconLink>
                            <SocialIconLink href="/" target="_blank" aria-label="Linkedin">
                                <FaLinkedin />
                            </SocialIconLink>
                        </Socialicons>
                    </SocialMediaWrap>
                </Social>
            </FooterWrap>

        </FooterContainer>
    )
}

export default Footer
