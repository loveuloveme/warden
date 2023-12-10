import { Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Loader from "../../components/Loader/Loader";
import Navbar from "../../components/Navbar/Navbar";
import { useAppSelector } from "../../redux/store";
import Subscription from "./components/Subscription";
import { useGetSubsQuery } from "../../redux/api/subs";

const Subscriptions = () => {
    const { user } = useAppSelector(state => state.user);
    
    const {
        data: subs,
        isFetching,
        isLoading,
    } = useGetSubsQuery(null, {
        pollingInterval: 3000,
        refetchOnMountOrArgChange: true,
        skip: false,
    })

    return (
        <>
            <Navbar />
            <Loader show={false} />
            <Container
                maxW='container.lg'
                py='50px'
            >
                <Heading>Subscriptions</Heading>
                <Text color='#696969'>{user?.email}</Text>
                <SimpleGrid
                    columns={1}
                    gap='5px'
                    mt='20px'
                >
                    {subs && subs.map(sub => {
                        return (
                            <Subscription sub={sub} />
                        );
                    })}
                </SimpleGrid>
                {subs && subs.length === 0 && <Text>There is no subs yet</Text>}
            </Container>
        </>
    );
};

export default Subscriptions;