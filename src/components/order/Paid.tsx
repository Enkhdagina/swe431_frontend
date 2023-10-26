import { PaymentType } from "@/utils/enum";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  Text,
  VStack,
  Box,
  Image,
} from "@chakra-ui/react";
import { FC, useRef } from "react";
import MainButton from "../Button";
import { imgSuccessPaid } from "@/utils/assets";

type Types = {
  onClose: () => void;
  isOpen: boolean;
};
const PaymentPaid: FC<Types> = ({ onClose, isOpen }) => {
  const cancelRef = useRef<any>();
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay alignItems={"end"} />

      <AlertDialogContent borderRadius={20} bg={"white"}>
        <AlertDialogBody py={12} justifyContent={"center"}>
          <Image src={imgSuccessPaid} h={"223px"} m={"auto"} />
          <Text
            w={"70%"}
            m={"auto"}
            textAlign={"center"}
            fontWeight={"bold"}
            fontSize={23}
            my={5}
          >
            Таны төлбөр амжилттай хийгдлээ!
          </Text>

          <MainButton onClick={onClose} bg="prime">
            <Text color={"white"} fontSize={21} fontWeight={"bold"} px={12}>
              OK
            </Text>
          </MainButton>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PaymentPaid;
