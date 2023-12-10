import { Button, Center, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { EmailIcon, UnlockIcon } from '@chakra-ui/icons';
import { useFormik } from 'formik';
import * as Yup from "yup";
import FormInput from './components/FormInput/';
import { useSignInMutation, useSignUpMutation } from '../../redux/api/authApi';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { SerializedError } from '../../redux/api/types';
import { IAuthenticationProps } from './types';
import { Link } from 'react-router-dom';

const Authentication = (props: IAuthenticationProps) => {
    const { isSignUp = false } = props;

    const signUpMutation: ReturnType<typeof useSignUpMutation> = useSignUpMutation();
    const signInMutation: ReturnType<typeof useSignInMutation> = useSignInMutation();

    const [authRequest, { isLoading, error, isError }] = isSignUp ? signUpMutation : signInMutation;

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email().required('Email is required'),
            password: Yup.string().required('Password is required')
        }),
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
            authRequest(values);
        },
    });

    useEffect(() => {
        if (isError) {
            let errorMessage = '';

            if (error && 'data' in error) {
                const customErr = error.data as SerializedError;
                errorMessage = customErr.errorMessage;
            }

            toast(errorMessage ?? 'Authentication error');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);


    return (
        <Flex
            align='center'
            justify='center'
            minH='100vh'
            py='100px'
        >
            <Flex
                direction='column'
                w='500px'
                bg='white'
                p='10'
                rounded='lg'
                position='relative'
                overflow='hidden'
            >
                <Heading
                    fontSize='6xl'
                    mb='2'
                >
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Heading>
                <form onSubmit={formik.handleSubmit}>
                    <Stack
                        mt='5'
                    >
                        <FormInput
                            id='email'
                            isRequired
                            label='Email'
                            icon={<EmailIcon />}
                            isDisabled={isLoading}
                            inputProps={{
                                placeholder: 'Email address',
                                onChange: formik.handleChange,
                                value: formik.values.email
                            }}
                            error={formik.errors.email}
                        />
                        <FormInput
                            id='password'
                            label='Password'
                            isRequired
                            icon={<UnlockIcon />}
                            isDisabled={isLoading}
                            inputProps={{
                                placeholder: 'Password',
                                type: 'password',
                                onChange: formik.handleChange,
                                value: formik.values.password
                            }}
                            error={formik.errors.password}
                        />
                        <Stack
                            mt='5'
                        >
                            <Button
                                type='submit'
                                variant='solid'
                                loadingText='Submitting'
                                size='md'
                                isDisabled={!Object.values(formik.values).every(values => values.length > 2)}
                                isLoading={isLoading}

                                bg='black'
                                color='white'

                                _hover={{
                                    bg: 'gray.800'
                                }}
                                _active={{
                                    bg: 'gray.700'
                                }}
                            >
                                Enter
                            </Button>
                        </Stack>

                        <Center
                            mt='2'
                        >
                            <Link to={isSignUp ? '/signin' : '/signup'}>
                                <Text fontWeight='500' color='#3498db'>{isSignUp ? 'Sign In' : 'Sign Up'}</Text>
                            </Link>
                        </Center>
                    </Stack>
                </form>
            </Flex>
        </Flex>
    );
};


export default Authentication;
