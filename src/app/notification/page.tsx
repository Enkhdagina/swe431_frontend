import NotificationCard from "@/components/card/notification"
import { imgCoupon, imgCreated, imgDelivered, imgReady } from "@/utils/assets"
import { Box, VStack } from "@chakra-ui/react"

const NotificationPage = () => {
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
        pt={32}
        px={8}
      >
        <VStack w={'full'}>
            {
                [
                    {
                    icon: imgDelivered,
                    text: 'Таны захиалга ирсэн байна.',
                },
                    {
                    icon: imgReady,
                    text: 'Таны захиалга гарсан байна.',
                },
                    {
                    icon: imgCreated,
                    text: 'Таны захиалга амжилттай хийгдлээ.',
                },
                    {
                    icon: imgCoupon,
                    text: 'Та үнэгүй кофе авах эрхтэй боллоо!',
                },
            ].map((d, index) => {
                    return <NotificationCard icon={d.icon} text={d.text} />
                })
            }
        </VStack>


      </Box>
    )
}

export default NotificationPage