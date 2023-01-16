import { ChakraTheme } from '@chakra-ui/theme';
import background from '../../assets/images/bg.png';


export const fantomTheme: Partial<ChakraTheme> = {
    styles: {
        global: {
            html: {
                // background:
                    // 'radial-gradient(ellipse at top, #030622a8, #000004), radial-gradient(ellipse at bottom, #000004, #000004) !important',
            },
            body: {
                backgroundImage: './images/bg.png',
                backgroundColor: 'vertek.slatepurple.900', 
                backgroundSize: 
                '100% 100%', 
            },
            '.bg': {
                // backgroundImage: './images/bg.png',
                // backgroundColor: '', 
                // backgroundSize: 
                // '100% 100%',
            },
            
        },
    },
    
    fonts: {
        heading: `'Clash', 'Gotham', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
        body: `'Clash', 'Gotham', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
    },
    
    textStyles: {
        h1: {
            fontFamily: `'Clash', 'Gotham', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
            fontSize: ['3.0rem'],
            lineHeight: '100%',
            fontWeight: 'bold',
            letterSpacing: '0.1rem',
        },
        h2: {
            fontFamily: `'Clash', 'Gotham', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
            fontSize: ['2.7rem'],
            fontWeight: '300',
            lineHeight: '100%',
            letterSpacing: '0.1rem',
        },
        h3: {
            fontFamily: `'Clash', 'Gotham', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
            fontSize: ['36px'],
            fontWeight: '700',
            lineHeight: '40px',
            letterSpacing: '0rem',
        },
        h4: {
            fontFamily: `'Clash', 'Gotham', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
            fontSize: ['1.8rem'],
            fontWeight: '300',
            lineHeight: '115%',
            letterSpacing: '-0.05rem',
        },
        h5: {
            fontFamily: `'Clash', 'Gotham', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
            fontSize: ['1.5rem'],
            fontWeight: '300',
            lineHeight: '115%',
            letterSpacing: '-0.03rem',
        },
        h6: {
            fontFamily: `'Clash', 'Gotham', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
            fontSize: ['1.2rem'],
            fontWeight: '300',
            lineHeight: '115%',
            letterSpacing: '-0.03rem',
        },
    },
    colors: {
        gray: {
            '100': '#C1C1D1',
            '200': '#828291',
            '300': '#54546C',
            '400': '#33334A',
            '500': '#212138',
            '600': '#141423',
            '700': '#10101E',
            '800': '#090911',
        },
        box: {
            '300': 'rgba(27,20,100,0.25)',
            '500': 'rgba(255,255,255,0.05)',
        },
        vertek: {
            slate: {
                30: 'rgba( 27, 20, 100, 0.1 )', 
                40: 'rgba(255, 255, 255, 0.1)', 
                49:'rgba(230, 230, 230, 1)', 
                50:'#E6E6E6', 
                100:'#DBDBDF',                
                200:'#C6C6CC', 
                300:'#B0B0B9', 
                400:'#9A9AA6', 
                500:'#7D7D8B', 
                600:'#434279', 
                700:'#474750', 
                800:'#2D2D33', 
                900:'#131315', 
                
            
            }, 
            slatepurple: {
                500: '#504E90', 
                600: '#434279', 
                700: '#363562', 
                800: '#1C1C34', 
                900: '#161626', 
            }, 
            
            neonpurple: {
                500: '#4A4AF6',
                600: '#4D3FEC', 
                700: '#4132D0', 
                800: '#362BA8', 
                900: '#302B84', 
            }, 
            gold: {
                400: '#ECA833', 
            }, 
            sor:  {
                100: '#161626', 
            }, 
            electricblue: {
                100: '#5BC0F8', 
                200: '#0892d0', 
                300: 'rgba(91, 192, 248, .9)', 
            }
                
        },
        beets: {
            green: '#00F89C',
            red: '#FF0000',
            highlight: '#00FFFF',
            base: {
                '50': '#C3C5E9',
                '100': '#8F93D6',
                '200': '#585FC6',
                '300': '#3D3FA9',
                '400': '#292985',
                '500': '#1B1464',
                '600': '#1B1464',
                '700': '#100A49',
                '800': '#0B0737',
                '900': '#030024',
            },
            light: 'rgba(46,49,146, 1.0)',
            lightAlpha: {
                '50': 'rgba(46,49,146, 0.05)',
                '100': 'rgba(46,49,146, 0.1)',
                '200': 'rgba(46,49,146, 0.2)',
                '300': 'rgba(46,49,146, 0.3)',
                '500': 'rgba(46,49,146, 0.5)',
            },
            greenAlpha: {
                '50': 'rgba(0,248,156, 0.05)',
                '100': 'rgba(0,248,156, 0.1)',
                '200': 'rgba(0,248,156, 0.2)',
                '300': 'rgba(0,248,156, 0.3)',
                '400': 'rgba(0,248,156, 0.4)',
                '500': 'rgba(0,248,156, 0.5)',
                '600': 'rgba(0,248,156, 0.6)',
                '700': 'rgba(0,248,156, 0.7)',
                '800': 'rgba(0,248,156, 0.8)',
                '900': 'rgba(0,248,156, 0.9)',
            },
            highlightAlpha: {
                '50': 'rgba(0, 255, 255, 0.05)',
                '100': 'rgba(0, 255, 255, 0.1)',
                '200': 'rgba(0, 255, 255, 0.2)',
                '300': 'rgba(0, 255, 255, 0.3)',
                '400': 'rgba(0, 255, 255, 0.4)',
                '500': 'rgba(0, 255, 255, 0.5)',
                '600': 'rgba(0, 255, 255, 0.6)',
                '700': 'rgba(0, 255, 255, 0.7)',
                '800': 'rgba(0, 255, 255, 0.8)',
                '900': 'rgba(0, 255, 255, 0.9)',
            },
        },
    },
    components: {
        Select: {
            parts: ['field'],
            variants: {
                filled: {
                    field: {

                        color: 'white',
                        bgColor: 'beets.lightAlpha.500',
                        borderColor: 'transparent',
                        _hover: {
                            borderColor: 'beets.base.200',
                            bgColor: 'beets.lightAlpha.500',
                        },
                        _focus: {
                            bgColor: 'beets.lightAlpha.500',
                        },
                    },
                },
            },
        },
        Input: {
            parts: ['field'],
            variants: {
                filled: {
                    field: {
                        color: 'gray.100',
                        bgColor: 'beets.lightAlpha.500',
                        borderColor: 'transparent',
                        //color: 'gray.100',
                        _hover: {
                            borderColor: 'vertek.slatepurple.500',
                            bgColor: 'beets.lightAlpha.500',
                        },
                        active: {
                            borderColor: 'vertek.slatepurple.500',
                            
                        },
                        _focus: {
                            outline: 'white', 
                            borderColor: 'vertek.slatepurple.500',
                            borderWidth: '1px', 
                        },
                        _placeholder: {
                            borderColor: 'vertek.slatepurple.500',
                        },
                    },
                },
            },
        },
        Tabs: {
            parts: ['tab'],
            baseStyle: {
                tab: {
                    _focus: {
                        boxShadow: 'none',
                    },
                },
            },
        },
        Link: {
            baseStyle: {
                color: 'vertek.neonpurple.500',
                textShadow:'0 0 5px #000',
            },
        },
        Tooltip: {
            baseStyle: {
                color: 'white',
            },
        },
        Alert: {
            parts: ['container'],
            baseStyle: {
                container: {
                    borderRadius: 'md',
                    alignItems: 'flex-start',
                },
            },
        },
        Button: {
            variants: {
                primary: {
                    background: 'linear-gradient(90deg, #302B84 0%, #362BA8 50%, #4132D0 100%)',
                    color: 'white',
                    // _active: { bgColor: 'beets.green' },
                    _focus: { outline: 'none', boxShadow: 'none' },
                    rounded: 'xl',
                    _hover: {
                        bgColor: 'beets.highlight',
                        transform: 'scale(1.01)',
                        _disabled: {
                            transform: 'none',
                            background: 'gray.400',
                        },
                    },
                    _disabled: {
                        bgColor: 'gray.400',
                        opacity: 1,
                        color: 'whiteAlpha.700',
                        cursor: 'not-allowed',
                        _active: { bgColor: 'gray.400' },
                    },
                },
                secondary: {
                    bgColor: 'beets.greenAlpha.300',
                    color: 'white',
                    _active: { bgColor: 'beets.greenAlpha.300' },
                    _focus: { outline: 'none', boxShadow: 'none' },
                    rounded: 'xl',
                    _hover: {
                        transform: 'scale(1.01)',
                        bgColor: 'beets.highlightAlpha.200',
                        _disabled: {
                            transform: 'none',
                            background: 'gray.400',
                        },
                    },
                    _disabled: {
                        bgColor: 'gray.400',
                        opacity: 1,
                        color: 'whiteAlpha.700',
                        cursor: 'not-allowed',
                        _active: { bgColor: 'gray.400' },
                    },
                },
                

                verteklight: {
                    background: 'linear-gradient(to right top, #161626, #1a1b37, #1e1f48, #22235a, #27276c, #2c2b7d, #312f8e, #37339f, #3c39b4, #413eca, #4544e0, #4a4af6)', 
                    borderWidth:'2px',  
                    borderColor:'vertek.slate.300', 
                    boxShadow:'0 0 12px #000', 
                    color: 'white',
                    fontWeight:'900', 
                    _active: { backgroundColor:'#4A4AF6'  },
                    _focus: { outline: 'none', boxShadow: 'none' },
                    borderRadius: '8px',
                    _hover: {
                        boxShadow:'0 0 10px #5BC0F8, 0 0 20px #4A4AF6', 
                        background:'vertek.slate.900', 
                        color:'white', 
                        borderWidth:'2px', 
                        borderColor:'vertek.neonpurple.500', 
                        transform:'scale(1.01)' 
                            }, 
                    _disabled: {
                        transform: 'none',
                        background: 'gray.400',
                        color:'white', 
                        },
                    },
                    vertekdark: {
                        backgroundColor:'vertek.slate.900', 
                        boxShadow:'0 0 12px #000', 
                        borderWidth:'2px',  
                        borderColor:'vertek.neonpurple.500', 
                        color: 'white',
                        fontWeight:'900', 
                        _active: { backgroundColor:'vertek.slate.900'  },
                        _focus: { outline: 'none', boxShadow: 'none' },
                        borderRadius: '8px',
                        _hover: {
                            color:'white',
                            boxShadow:'0 0 10px #5BC0F8, 0 0 20px #4A4AF6', 
                            borderColor:'vertek.slate.300', 
                            borderWidth:'2px', 
                            background: 'linear-gradient(to right top, #161626, #1a1b37, #1e1f48, #22235a, #27276c, #2c2b7d, #312f8e, #37339f, #3c39b4, #413eca, #4544e0, #4a4af6)', 
                            transform:'scale(1.02)' 
                                }, 
                        _disabled: {
                            transform: 'none',
                            background: 'gray.400',
                            color:'white', 
                            },
                        },
                        stayblack: {
                            backgroundColor:'vertek.slate.900', 
                            boxShadow:'0 0 12px #000', 
                            borderWidth:'2px',  
                            borderColor:'vertek.neonpurple.500', 
                            color: 'white',
                            fontWeight:'900', 
                            _active: { backgroundColor:'vertek.slate.900'  },
                            _focus: { outline: 'none', boxShadow: 'none' },
                            borderRadius: '8px',
                            _hover: {
                                color:'white',
                                boxShadow:'0 0 10px #5BC0F8, 0 0 20px #4A4AF6', 
                                background: '',  
                                transform:'scale(1.03)' 
                                    }, 
                            _disabled: {
                                transform: 'none',
                                background: 'gray.400',
                                color:'white', 
                                },
                            },
                vertekswap: {
                    bgGradient:'linear-gradient(217.41deg, #CA6615 -28.33%, #F0BF59 75.76%)', 
                    borderRadius:'8px', 
                    fontWeight:'900', 
                    borderWidth:'0px',  
                    borderColor:'', 
                    color: 'black',
                    _active: { backgroundColor:'#4A4AF6'  },
                    _focus: { outline: 'none', boxShadow: 'none' },
                    _hover: {
                        backgroundColor:'white', 
                        color:'white', 
                        borderWidth:'2px', 
                        borderColor:'white', 
                        transform:'scale(1.03)' 
                            }, 
                    _disabled: {
                        transform: 'none',
                        background: 'gray.400',
                        },
                    },
                
            },
        },
        Skeleton: {
            baseStyle: {
                borderRadius: 'md',
            },
            defaultProps: {
                startColor: 'gray.400',
                endColor: 'gray.500',
            },
        },
        Text: {
            variants: {
                cardHeadline: {
                    fontWeight: 'semibold',
                    fontSize: 'xl',
                    color: 'white',
                },
                topLine: {
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    color: 'white',
                },
            },
        },
        // BoxShadow: {
        //     variants: {
        //         purpleblue: {
        //             boxShadow='0 0 10px #5BC0F8, 0 0 20px #4A4AF6'
        //         }
        //     }
        // },
    },
};
