import { Coffee } from "@/model/coffee";
import { currency } from "@/utils/function";
import { imgUrl } from "@/utils/values";
import {
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
import MainButton from "../Button";
import { useRouter } from "next/navigation";
import { BiPlusMedical } from "react-icons/bi";
import { FaMinus } from "react-icons/fa";

type Props = {
  data: Coffee;
  basket: () => void;
  heart: boolean;
  minus?: () => void;
  plus?: () => void;
  quantity?: number;
  index?: number;
};

const Title = ({
  title,
  onClick,
  heart,
}: {
  title: string;
  onClick: () => void;
  heart: boolean;
}) => {
  return (
    <VStack>
      <HStack>
        <Text fontSize={42}>{title}</Text>
        <Button ml={8} mr={16} onClick={onClick}>
          <Icon
            as={heart ? AiFillHeart : AiOutlineHeart}
            boxSize={50}
            color={heart ? "red" : "black"}
          />
        </Button>
      </HStack>
      <Box w={"full"} mt={2} h={0.25} bg={"brown"} />
    </VStack>
  );
};

const CoffeeCard: FC<Props> = ({
  data,
  basket,
  heart,
  minus,
  plus,
  quantity,
  index,
}) => {
  const router = useRouter();
  return (
    <HStack
      w={"full"}
      maxW={1200}
      mx={"auto"}
      flexDir={index! % 2 == 0 ? "row" : "row-reverse"}
      alignItems={"start"}
    >
      <Image src={`${imgUrl}${data.img}`} flex={1} />
      <VStack flex={2} w={"full"} alignItems={"start"}>
        <Title onClick={basket} title={data.name} heart={heart} />
        <Text fontSize={24} mb={20}>
          {data.description}
        </Text>
        <HStack
          w={"full"}
          justifyContent={"space-between"}
          flexDir={index! % 2 == 0 ? "row" : "row-reverse"}
        >
          <HStack>
            <Button
              h={54}
              w={54}
              onClick={minus}
              bg={"brown"}
              borderRadius={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              p={0}
            >
              <Icon as={FaMinus} color={"white"} fontSize={34} />
            </Button>
            <Text fontSize={34} mx={12} color={"brown"}>
              {quantity}
            </Text>
            <Button
              h={54}
              w={54}
              onClick={plus}
              bg={"brown"}
              borderRadius={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              p={0}
            >
              <Icon as={BiPlusMedical} color={"white"} fontSize={34} />
            </Button>
          </HStack>
          <Text color={"darkBrown"} fontSize={34} fontWeight={"bold"}>
            {currency((data.price * (quantity ?? 1)).toString())}
          </Text>
        </HStack>
        <HStack w={"full"} justifyContent={index! % 2 != 0 ? "start" : "end"}>
          <MainButton
            px={12}
            bg="brown"
            m={0}
            onClick={() => {
              router.push(`/order${data.id}`);
            }}
          >
            <Text color={"white"} fontSize={23} fontWeight={"bold"}>
              ADD TO ORDER
            </Text>
          </MainButton>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default CoffeeCard;
