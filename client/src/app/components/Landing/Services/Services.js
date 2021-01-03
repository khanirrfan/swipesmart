import React from 'react'
import Icon1 from '../../../../assets/images/svg01.svg'
import Icon2 from '../../../../assets/images/svg01.svg'
import Icon3 from '../../../../assets/images/svg01.svg'
import { ServicesContainer, ServicesCards, ServicesH1, ServicesWrapper, ServicesIcon, ServicesP, ServicesH2 } from './ServicesElements'
const Services = () => {
    return (
        <ServicesContainer id="services">
            <ServicesH1>Our Services</ServicesH1>
            <ServicesWrapper >
                <ServicesCards >
                    <ServicesIcon src={ Icon1 }></ServicesIcon>
                    <ServicesH2 >Reduce expense</ServicesH2>
                    <ServicesP >We help reduces your fees and increase overall revenue</ServicesP>
                </ServicesCards>
                <ServicesCards >
                    <ServicesIcon src={ Icon2 }></ServicesIcon>
                    <ServicesH2 >Virtual Offices</ServicesH2>
                    <ServicesP >We help reduces your fees and increase overall revenue</ServicesP>
                </ServicesCards>
                <ServicesCards >
                    <ServicesIcon src={ Icon3 }></ServicesIcon>
                    <ServicesH2 >Premium Benefits</ServicesH2>
                    <ServicesP >We help reduces your fees and increase overall revenue</ServicesP>
                </ServicesCards>
            </ServicesWrapper>

        </ServicesContainer>
    )
}

export default Services
