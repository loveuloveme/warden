import { CheckIcon } from "@chakra-ui/icons";
import { Box, Flex, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { subsApi, useCreateMutation } from "../../redux/api/subs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoFileDirectoryFill, GoFile } from "react-icons/go";
import { IFileProps } from "./types";

const File = (props: IFileProps) => {
    const { file, ...rest } = props;

    const navigate = useNavigate();

    const [createRequest, createState] = useCreateMutation();

    const [updateSubs] = subsApi.endpoints.getSubs.useLazyQuery();


    const createSub = (anyUpdate: boolean) => {
        createRequest({ id: file.id, hash: file.hash, anyUpdate });
    };

    const goInner = () => {
        if (file.isDir) {
            navigate('/' + file.id);
        }
    };

    useEffect(() => {
        if (createState.isSuccess) {
            updateSubs(null);
            toast('Subscription has been created.');
        }

        if (createState.isError) {
            updateSubs(null);
            toast('Subscription error: ' + createState.error?.data?.errorMessage);
        }
    }, [createState.isLoading]);

    return (
        <Flex
            border='1px solid #efefef'
            borderRadius='md'
            bg='white'
            // bg={isDir ? '#c9c9c9' : '#e5e5e5'}
            h='50px'

            align='center'
            justify='space-between'
            pr='2'

            cursor={file.isDir ? 'pointer' : 'default'}

            transition='all 0.1s ease'
            _hover={{
                bg: file.isDir && '#e2e2e2'
            }}

            {...rest}
        >
            <HStack
                px='5'
                flex='1'
                onClick={() => goInner()}
                h='100%'
            >
                <Box>
                    {file.isDir ? <GoFileDirectoryFill /> : <GoFile />}
                </Box>
                <Text
                    w='100%'
                    overflow='hidden'
                    fontWeight='500'
                    userSelect='none'
                    textOverflow='ellipsis'
                >
                    {file.name}
                </Text>
            </HStack>
            <HStack>
                <Text
                    w='100px'
                    bg='rgb(30, 30, 32)'
                    fontSize='12px'
                    p='5px 10px'
                    borderRadius='3px'
                    align='center'
                    color='white'
                >
                    {file.hash.substring(0, 9)}
                </Text>
                <Menu
                    placement='bottom-end'
                >
                    <MenuButton>
                        <IconButton
                            size='sm'
                            aria-label='Create subscription'
                            icon={<CheckIcon />}
                        />
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => createSub(false)}>To Hash</MenuItem>
                        <MenuItem onClick={() => createSub(true)}>To Any Update</MenuItem>
                    </MenuList>
                </Menu>

            </HStack>
        </Flex>
    );
};

export default File;