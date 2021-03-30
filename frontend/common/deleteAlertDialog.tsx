import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import React from 'react';

export interface IDeleteAlertDialogProps {
  header: string;
  isOpen: boolean;
  cancelRef: React.RefObject<any>;
  onClose: (isTrue: boolean) => void;
}

const DeleteAlertDialog = ({ header, isOpen, cancelRef, onClose }: IDeleteAlertDialogProps) => {
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={() => onClose(false)}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {header}
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => onClose(false)}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={() => onClose(true)} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteAlertDialog;
