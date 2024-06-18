import { Box, Center, Image, Flex, FormControl, HStack, FormLabel, Input, Button, VStack } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { agendarService } from '../services/agentamentoService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToastError, showToastSuccess } from '../utils/Toastify';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import UserContext from '../context/UserContext';


const Agendar = () => {
  const history = useHistory();

  const { user } = useContext(UserContext);

  const [descricao,setDescricao] = useState('');
  const [dataMarcacao, setDataMarcacao] = useState('');
  const [horaInicial, setHoraInicial] = useState('');
  const [horaTermino, setHoraTermino] = useState('');


  const createNewScheduling = async () => {
    try {
      const response = await agendarService({
        usuario_id:user.id,
        descricao,
        data_evento: formatarDataBrasileira(dataMarcacao), 
        hora_inicio: horaInicial,
        hora_termino: horaTermino
      });

      if (response) {
        showToastSuccess("Agendamento criado com sucesso")
      }
      
      setDescricao('');
      setDataMarcacao('');
      setHoraInicial('');
      setHoraTermino('');

    } catch (e) {
      const messageError = e.response.data.mensagem;

      showToastError(messageError) //! Toastify disparando um alerta de erro

      console.log(e);
    }
  }

  const handleAdmin = () => {
    history.push('/home')
  }

  if (!user) {
    history.push('/')
  }

  const formatarDataBrasileira = (data) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <Box h="100vh" position="relative">
      <Button
        w={{ base: 70, md: 0 }}
        p="4"
        type="button"
        bg="gray.900"
        color="white"
        _hover={{ bg: "blue.500" }}
        position="absolute"
        top={8}
        left={10}
        zIndex={1}
        onClick={ handleAdmin }
      >
        <ArrowLeftIcon />
      </Button>

      <Center
        as="header"
        h={140}
        bg="black"
        color="white"
        fontWeight="bold"
        fontSize={{ base: '2xl', md: '4xl' }}
        pb="8"
      >
        {/* Título para telas grandes */}
        Agendar
      </Center>

      <Flex 
        align="center" 
        justify="center" 
        bg="blackAlpha.200" 
        h="100%"
      >
        <Center
          w="100%"
          maxW={{ base: '100%', lg: '840px' }}
          bg="white"
          top={{ base: 50, md: '100px' }}
          position="absolute"
          borderRadius={5}
          p="6"
          boxShadow="0 1px 2px #ccc"
          mt={{ base: 50, md: 0 }}
        >
          <FormControl display="flex" flexDir="column" gap="4">
            <HStack spacing="4">
              <Box w="100%">
                  <VStack spacing="24px" alignItems="flex-start">
                    <Box w="100%">
                      <FormLabel htmlFor="startTime" fontWeight="bold" fontSize="xl">Descrição</FormLabel>
                      <Input 
                        type="text"
                        value={ descricao }
                        onChange={ ({ target: { value } }) => setDescricao(value) } 
                      />
                    </Box>
                    <Box w="100%">
                      <FormLabel htmlFor="startTime" fontWeight="bold" fontSize="xl">Hora de Início</FormLabel>
                      <Input 
                        type="time"
                        value={ horaInicial }
                        onChange={ ({ target: { value } }) => setHoraInicial(value) } 
                      />
                    </Box>

                    <Box w="100%">
                      <FormLabel htmlFor="endTime" fontWeight="bold" fontSize="xl">Hora de Término</FormLabel>
                      <Input 
                        type="time"
                        value={ horaTermino }
                        onChange={ ({ target: { value } }) => setHoraTermino(value) } 
                      />
                    </Box>

                    <Box w="100%">
                      <FormLabel htmlFor="nasc" fontWeight="bold" fontSize="xl">Data</FormLabel>
                      <Input 
                        id="nasc" 
                        type="date"
                        value={ dataMarcacao }
                        onChange={ ({ target: { value } }) => setDataMarcacao(value) } 
                      />
                    </Box>
                  </VStack>
              </Box>
            </HStack>

            <HStack justify="center">
              <Flex justify="space-between">
                <Button
                  w={240}
                  p="6"
                  type="submit"
                  bg="black" // Alteração aqui para cor preta
                  color="white"
                  fontWeight="bold"
                  fontSize="xl"
                  mt="2"
                  _hover={{ bg: "gray.900" }}
                  h="auto"
                  onClick={ createNewScheduling }
                >
                  Agendar
                </Button>
              </Flex>
            </HStack>
          </FormControl>
        </Center>
      </Flex>

      <ToastContainer />
    </Box>
  );
}

export default Agendar;