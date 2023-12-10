import { Container, Flex, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <Flex
            position='sticky'
            top='0'
            h='75px'

            align='center'
            zIndex='100'
            borderBottom='1px solid #e2e2e2'
            bg='white'
        >
            <Container
                maxW='container.lg'
            >
                <Flex
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Link
                        to='/'
                    >
                        <Text
                            fontSize='2xl'
                            fontWeight='bold'
                        >
                            Warden
                        </Text>
                    </Link>
                    <Link
                        to='/subs'
                    >
                        <Button>
                            Subscriptions
                        </Button>
                    </Link>
                </Flex>
            </Container>
        </Flex>
    );
};

export default Navbar;