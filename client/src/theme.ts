import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    styles: {
        global: () => ({
            body: {
                bg: '#f3f3f3'
            }
        })
    },
    components: {
        Heading: {
            baseStyle: {
                color: '#323232'
            }
        },
        Text: {
            baseStyle: {
                color: '#323232'
            }
        }
    }
});

export default theme;