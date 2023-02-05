import { Button } from '@chakra-ui/button';
import { HStack } from '@chakra-ui/layout';
import 'animate.css'; 


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
    
        <HStack width="full" className="animate__animated animate__zoomIn animate__delay-2s animate__duration-6s">
            {presets.map((preset) => (
         

                <Button
                    variant="verteklight"
                    borderWidth="2px"
                    borderColor="vertek.slate.500"
                    key={`preset-${preset.label}`}
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
