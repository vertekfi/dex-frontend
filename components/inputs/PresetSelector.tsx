import { Button } from '@chakra-ui/button';
import { HStack } from '@chakra-ui/layout';

type Preset = {
    label: string;
    value: number;
};
interface Props {
    onPresetSelected: (preset: number) => void;
    presets?: Preset[];
}

const defaultPresets = [
    {
        label: '25%',
        value: 0.25,
    },
    {
        label: '50%',
        value: 0.5,
    },
    {
        label: '75%',
        value: 0.75,
    },
    {
        label: '100%',
        value: 1,
    },
];
export default function PresetSelector({ onPresetSelected, presets = defaultPresets }: Props) {
    const handlePresetSelected = (preset: number) => () => {
        onPresetSelected(preset);
    };
    return (
        <HStack width="full">
            {presets.map((preset) => (
                <Button
                    bgColor="vertek.neonpurple.500"
                    borderWidth="2px" borderColor="vertek.slate.500"
                    key={`preset-${preset.label}`}
                    _focus={{ outline: 'none' }}
                    _hover={{ bgColor:'vertek.slate.900', color:'white', 
                                borderWidth:'2px', borderColor:'vertek.neonpurple.500', 
                                transform:'scale(1.05)'}}
                    _active={{ bgColor:'vertek.neonpurple.500', color: 'white' }}
                    onClick={handlePresetSelected(preset.value)}
                    size={{ base: 'md', lg: 'sm' }}
                    width="full"
                >
                    {preset.label}
                </Button>
            ))}
        </HStack>
    );
}
