import { Image, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";

type Types = {
  img: string;
  name: string;
  address: string;
  schedule: string;
};
const LocationCard: FC<Types> = ({ img, name, address, schedule }) => {
  return (
    <VStack
      w={"full"}
      p={5}
      borderRadius={32}
      bg={"white"}
      boxShadow={"0 4px 4px 0 rgba(0,0,0,0.25)"}
    >
      <Image src={img} borderRadius={32} mb={3} />
      <Text
        fontSize={20}
        letterSpacing={1}
        textAlign={"center"}
        mx={"auto"}
        mb={4}
      >
        {name}
      </Text>
      <Text
        fontSize={16}
        letterSpacing={1}
        textAlign={"center"}
        mx={"auto"}
        mb={4}
      >
        {address}
      </Text>
      <Text fontSize={16} letterSpacing={1}>
        {schedule}
      </Text>
    </VStack>
  );
};

export default LocationCard;
