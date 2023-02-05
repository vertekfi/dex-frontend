import { Box } from '@chakra-ui/react';
import { chakraComponents, ChakraStylesConfig, Select, OnChangeValue } from 'chakra-react-select';
import React from 'react';

const chakraStyles: ChakraStylesConfig = {
    dropdownIndicator: (provided, state) => ({
        ...provided,
        background: 'rgba(255,255,255,0.1)',
        p: 0,
        w: '45px',
    }),
    
    option: (provided, state) => ({
        ...provided,
        background: state.isFocused ? 'vertek.neonpurple.500' : 'transparent',
        //background: 'beets.base.800',
    }),
    menuList: (provided, state) => ({
        ...provided,
        //background: state.isFocused ? 'blue.100' : 'black',
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(12px)', 
    }),
    multiValue: (provided, state) => ({
        ...provided,
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(12px)', 
    }),
    multiValueLabel: (provided, state) => ({
        ...provided,
        color: 'white',
    }),
    multiValueRemove: (provided, state) => ({
        ...provided,
        color: 'white',
    }),
};

interface Props<T> {
    placeholder?: string;
    options: T[];
    renderOption: (data: T, children: any) => React.ReactNode;
    renderMultiValue: (data: T, children: any) => React.ReactNode;
    onChange: (newValue: OnChangeValue<T, true>) => void;
    value: T[];
}

export function MultiSelect<T>({ placeholder, options, renderOption, renderMultiValue, onChange, value }: Props<T>) {
    const customComponents = {
        Option: ({ children, ...props }: any) => (
            <chakraComponents.Option {...props}>{renderOption(props.data, children)}</chakraComponents.Option>
        ),
        MultiValue: ({ children, ...props }: any) => {
            return (
                <chakraComponents.MultiValue {...props}>
                    {renderMultiValue(props.data, children)}
                </chakraComponents.MultiValue>
            );
        },
    };

    return (
        <Box>
            <Select
                options={options}
                isMulti
                chakraStyles={chakraStyles}
                placeholder={placeholder}
                components={customComponents}
                onChange={(newValue) => onChange(newValue as T[])}
                value={value}
            />
        </Box>
    );
}
