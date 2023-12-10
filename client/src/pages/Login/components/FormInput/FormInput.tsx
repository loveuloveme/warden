import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

const FormInput = props => {
    const { label, icon, inputProps, error, ...rest } = props;

    return (
        <FormControl
            isRequired
            isInvalid={error}
            {...rest}
        >
            <FormLabel>{label}</FormLabel>
            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                >
                    {icon && React.cloneElement(icon, { color: 'gray.300' })}
                </InputLeftElement>
                <Input
                    variant='filled'
                    type='text'
                    {...inputProps}
                />
            </InputGroup>
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    );
};

export default FormInput;