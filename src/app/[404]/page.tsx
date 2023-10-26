import { imgEmpty } from "@/utils/assets";
import { Box, Image, Text, VStack } from "@chakra-ui/react";

export default function ErrorPage() {
    return (
        <Box
        pos={"relative"}
            justifyContent={"space-between"}
            flexDir={"column"}
            display={"flex"}
            zIndex={10}
            alignItems={"center"}
            className='bg-color'
            w={"full"}
            pb={20}
            pt={20}>
<VStack w={'full'}>
            <Image src={imgEmpty} mt={120} px={12} mx={'auto'} maxW={400}/>
            <Text fontSize={30} letterSpacing={'-0.02'}>Уучлаарай</Text>
    <Text fontSize={30} letterSpacing={'-0.02'}>Хуудас олдсонгүй!</Text>
            </VStack>
        </Box>
    )
};
