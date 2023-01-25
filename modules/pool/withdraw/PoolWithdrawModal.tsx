import { Modal, ModalBody, ModalCloseButton, ModalContent } from '@chakra-ui/modal';
import { Button, Heading, IconButton, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { ChevronLeft } from 'react-feather';
import { useEffect, useRef, useState } from 'react';
import { PoolWithdrawTypeChoice } from '~/modules/pool/withdraw/components/PoolWithdrawTypeChoice';
import { PoolWithdrawProportional } from '~/modules/pool/withdraw/components/PoolWithdrawProportional';
import { PoolWithdrawSingleAsset } from '~/modules/pool/withdraw/components/PoolWithdrawSingleAsset';
import { PoolWithdrawPreview } from '~/modules/pool/withdraw/components/PoolWithdrawPreview';
import { FadeInBox } from '~/components/animation/FadeInBox';
import { useWithdrawState } from '~/modules/pool/withdraw/lib/useWithdrawState';
import { usePool } from '~/modules/pool/lib/usePool';

export function PoolWithdrawModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { pool, formattedTypeName } = usePool();
    const [modalState, setModalState] = useState<'start' | 'proportional' | 'single-asset' | 'preview'>('start');
    const [type, setInvestType] = useState<'proportional' | 'single-asset' | null>(null);
    const initialRef = useRef(null);
    const [withdrawComplete, setWithdrawComplete] = useState(false);
    const { clearWithdrawState } = useWithdrawState();

    useEffect(() => {
        setModalState('start');
        clearWithdrawState();
    }, [pool.id]);

    function onModalClose() {
        onClose(); 
        setModalState('start');
        setInvestType(null);
        clearWithdrawState();
    }

    

    return (
        <>
            <Button 
            onClick={onOpen} 
            variant="vertekdark" 
            _hover={{ 
                    color: 'white',
                    boxShadow: '0 0 10px #5BC0F8, 0 0 20px #4A4AF6', 
                    borderColor: 'vertek.slate.300', 
                    borderWidth: '2px', 
                    background: 'linear-gradient(to right top, #161626, #1a1b37, #1e1f48, #22235a, #27276c, #2c2b7d, #312f8e, #37339f, #3c39b4, #413eca, #4544e0, #4a4af6)', 
                    transform: 'scale(1.02)'
            }}
            width={{ base: 'full', md: '140px' }}>
                Withdraw
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={onModalClose}
                size={modalState === 'start' ? '3xl' : '2xl'}
                initialFocusRef={initialRef}
            >

<ModalOverlay 
    bg= {`radial-gradient(circle at center, 
        #4132D0 0%, 
        rgba(0,0,0, 0.8) 70% )`}
        />
        <ModalContent 
          bgColor="rgba(0, 0, 0, 0.8)"
          boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
                borderRadius="16px"
                mb="2"
                padding="4"
                >
                    <ModalCloseButton />
                    {modalState !== 'start' ? (
                        <IconButton
                            aria-label={'back-button'}
                            icon={<ChevronLeft />}
                            variant="ghost"
                            p="0"
                            width="32px"
                            height="32px"
                            minWidth="32px"
                            position="absolute"
                            top="8px"
                            left="12px"
                            onClick={() => {
                                if (modalState === 'proportional' || modalState === 'single-asset') {
                                    setModalState('start');
                                } else if (modalState === 'preview') {
                                    if (type === 'proportional') {
                                        setModalState('proportional');
                                    } else if (type === 'single-asset') {
                                        setModalState('single-asset');
                                    }
                                }
                            }}
                        />
                    ) : null}
                    <ModalHeader className="bg">
                        {modalState === 'start' ? (
                            <>
                                <Heading size="md" noOfLines={1}>
                                    Withdraw from {pool.name}
                                </Heading>
                                <Text color="gray.200" fontSize="md">
                                    {formattedTypeName}
                                </Text>
                            </>
                        ) : null}

                        {modalState === 'proportional' ? (
                            <Heading size="md" textAlign="center">
                                Proportional withdraw
                            </Heading>
                        ) : null}

                        {modalState === 'single-asset' ? (
                            <Heading size="md" textAlign="center">
                                Single asset withdraw
                            </Heading>
                        ) : null}

                        {modalState === 'preview' ? (
                            <Heading size="md" textAlign="center">
                                Withdraw preview
                            </Heading>
                        ) : null}
                    </ModalHeader>
                    <ModalBody className="bg" pb="6">
                        <FadeInBox isVisible={modalState === 'start'}>
                            <PoolWithdrawTypeChoice
                                onShowProportional={() => {
                                    setInvestType('proportional');
                                    setModalState('proportional');
                                }}
                                onShowSingleAsset={() => {
                                    setInvestType('single-asset');
                                    setModalState('single-asset');
                                }}
                            />
                        </FadeInBox>
                        <FadeInBox isVisible={modalState === 'proportional'}>
                            <PoolWithdrawProportional
                                onShowPreview={() => {
                                    setInvestType('proportional');
                                    setModalState('preview');
                                }}
                            />
                        </FadeInBox>
                        <FadeInBox isVisible={modalState === 'single-asset'}>
                            <PoolWithdrawSingleAsset
                                onShowPreview={() => {
                                    setInvestType('single-asset');
                                    setModalState('preview');
                                }}
                            />
                        </FadeInBox>
                        <FadeInBox isVisible={modalState === 'preview'}>
                            <PoolWithdrawPreview
                                onWithdrawComplete={() => {
                                    setWithdrawComplete(true);
                                }}
                                onClose={onModalClose}
                            />
                        </FadeInBox>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
