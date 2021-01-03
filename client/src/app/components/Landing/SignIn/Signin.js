import React from 'react'

import { Container, FormButton, Form, FormContent, FormH1, FormInput, FormLabel, FormWrap, Icon, Text } from './SigninElement'

const SignIn = () => {
    return (
        <>
            <Container>
                <FormWrap>
                    <Icon to="/">SS</Icon>
                    <FormContent>
                        <Form action="#">
                            <FormH1>Sign in to your account         
                            </FormH1>
                            <FormLabel htmlFor='for'>Email
                    </FormLabel>
                            <FormInput type="email" required />
                            <FormLabel htmlFor='for'>password
                    </FormLabel>
                            <FormInput type="password" required />
                            <FormButton type="submit">Continue</FormButton>
                            <Text>Forgot Password</Text>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>  
        </>
    )
}

export default SignIn
