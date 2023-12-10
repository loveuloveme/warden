import { CloseIcon } from "@chakra-ui/icons";
import { Flex, VStack, IconButton, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRemoveMutation, subsApi } from "../../../../redux/api/subs";
import { ISubscriptionProps } from "./types";

const Subscription = (props: ISubscriptionProps) => {
    const { sub } = props;

    const [removeRequest, removeState] = useRemoveMutation();

    const removeSub = () => {
        removeRequest({ id: sub.id });
    };

    useEffect(() => {
        if (removeState.isSuccess) {
            toast('Subscription has been removed.');
        }
    }, [removeState.isLoading]);

    return (
        <Flex
            bg='white'
            border='1px solid #efefef'
            p='2'
            borderRadius='md'
        >
            {
                [{
                    label: 'Filepath',
                    text: sub.filePath
                },
                {
                    label: 'Subscribed hash',
                    text: (sub.fileHash || '').substring(0, 9)
                },
                {
                    label: 'Current hash',
                    text: (sub?.file?.hash.substring(0, 9) || 'Removed')
                },
                {
                    label: 'Is hash sub',
                    text: sub.anyUpdate ? 'No' : 'Yes'
                }]
                    .map(section => {
                        return (
                            <VStack
                                align='flex-start'
                                spacing='5px'
                                flex='1'
                                mx='1'
                            >
                                <Text wordBreak='break-all' fontWeight='500' color='#777777' fontSize='sm'>{section.label}</Text>
                                <Text wordBreak='break-all' fontSize='md'>{section.text}</Text>
                            </VStack>
                        );
                    })
            }
            <IconButton
                size='sm'
                aria-label='Remove subscription'
                icon={<CloseIcon />}
                onClick={removeSub}
            />
        </Flex>
    );
};

export default Subscription;