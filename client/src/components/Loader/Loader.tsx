import { chakra, Spinner, shouldForwardProp } from "@chakra-ui/react";
import { AnimatePresence, motion, isValidMotionProp } from "framer-motion";
import { ILoaderProps } from "./types";

const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop: string) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const Loader = (props: ILoaderProps) => {
    const { show = true } = props;

    return (
        <AnimatePresence>
            {show && (
                <ChakraBox
                    position='absolute'
                    top='0'
                    left='0'
                    w='calc(100vw - (100vw - 100%))'
                    h='100vh'
                    zIndex='1000'

                    bg='rgba(0, 0, 0, 0.8)'
                    backdropFilter='blur(10px)'

                    display='flex'
                    justifyContent='center'
                    alignItems='center'

                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                    }}
                >
                    <Spinner color='white' size='lg' />
                </ChakraBox>
            )}
        </AnimatePresence>
    );
};

export default Loader;