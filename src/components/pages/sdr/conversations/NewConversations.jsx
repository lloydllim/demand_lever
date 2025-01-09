'use client'
import React, { useState } from 'react';
import { ChakraProvider, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';

function NewConversationModal() {
  const [isFirstModalOpen, setFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setSecondModalOpen] = useState(false);

  return (
    <ChakraProvider>
      <Button onClick={() => setFirstModalOpen(true)}>Open First Modal</Button>

      {/* First Modal */}
      <Modal isOpen={isFirstModalOpen} onClose={() => setFirstModalOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>First Modal</ModalHeader>
          <ModalBody>
            This is the first modal. 
            <Button onClick={() => setSecondModalOpen(true)}>Open Second Modal</Button>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setFirstModalOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Second Modal */}
      <Modal isOpen={isSecondModalOpen} onClose={() => setSecondModalOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Second Modal</ModalHeader>
          <ModalBody>This is the second modal.</ModalBody>
          <ModalFooter>
            <Button onClick={() => setSecondModalOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}

export default NewConversationModal;