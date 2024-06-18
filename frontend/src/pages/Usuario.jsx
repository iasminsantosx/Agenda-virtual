import { Flex, Box, Center, FormControl, HStack, Button, Image } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
import { useContext } from "react";
import UserContext from "../context/UserContext";

function User() {
  const history = useHistory();

  const { user, logOut } = useContext(UserContext);

  const handleAgendamentos = () => {
    history.push('/agendamentos')
  }

  const handleAgendar = () => {
    history.push('/agendar')
  }


  if (!user) {
    history.push('/')
  }

  return (
    <Box h="100vh" position="relative">

      {/* Botão de Sair */}
      <Button
        w={{ base: 90, xl: 200 }}
        p="6"
        type="button"
        bg="gray.900"
        color="white"
        fontWeight="bold"
        fontSize="xl"
        mt="2"
        ml="2"
        _hover={{ bg: "red.500" }}
        h={{ base: 50, xl: "auto"}}
        position="absolute"
        top={6}
        right={2}
        zIndex={1}
        onClick={logOut}
      >
        Sair
      </Button>

      {/* Título para telas grandes */}
      <Center
        as="header"
        h={140}
        bg="black"
        color="white"
        fontWeight="bold"
        fontSize={{ base: '2xl', md: '4xl' }}
        pb="8"
      >
        Página Principal
      </Center>

      {/* Conteúdo central responsivo */}
      <Flex
        align="center"
        justify="center"
        bg="blackAlpha.200"
        h="150%"
      >
        <Center
          w="100%"
          maxW={840}
          bg="white"
          top={{ base: 50, md: '100px' }}
          position="absolute"
          borderRadius={5}
          p="6"
          boxShadow="0 1px 2px #ccc"
          mt={{ base: 50, md: 0 }}
        >
          <FormControl 
            display="flex" 
            flexDir="column" 
            gap="4"
          >
            <HStack spacing="4" justify="center">
              <Button
                w={240}
                p="6"
                type="submit"
                bg="black" // Alteração aqui para cor preta
                color="white"
                fontWeight="bold"
                fontSize="xl"
                mt="2"
                ml="2"
                _hover={{ bg: "gray.900" }}
                h="auto"
                onClick={ handleAgendamentos }
              >
                Agenda
              </Button>
            </HStack>

            <HStack spacing="4" justify="center">
              <Button
                w={240}
                p="6"
                type="submit"
                bg="black" // Alteração aqui para cor preta
                color="white"
                fontWeight="bold"
                fontSize="xl"
                mt="2"
                ml="2"
                _hover={{ bg: "gray.900" }}
                h="auto"
                onClick={ handleAgendar }
              >
                Agendar
              </Button>
            </HStack>

          </FormControl>
        </Center>
      </Flex>
    </Box>
  );
}

export default User;
