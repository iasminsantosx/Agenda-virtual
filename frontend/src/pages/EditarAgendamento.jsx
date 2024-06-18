import { Box, Center, FormControl, FormLabel, Button, HStack, Flex, Input, VStack} from "@chakra-ui/react";
import Select from 'react-select';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { editaAgendamentosService } from '../services/agentamentoService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToastError, showToastSuccess } from "../utils/Toastify";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UserContext from "../context/UserContext";

function EditarAgendamento() {
  const history = useHistory();

  const { user } = useContext(UserContext);

  const { id } = useParams();

  const [agendamento, setAgendamento] = useState(null);
  const [descricao,setDescricao]=useState('');
  const [dataMarcacao, setDataMarcacao] = useState('');
  const [horaInicial, setHoraInicial] = useState('');
  const [horaTermino, setHoraTermino] = useState('');
  const [Id,setId]= useState(null);

  const [servicosOptions, setServicosOptions] = useState([]);
  const [funcionariosOptions, setFuncionariosOptions] = useState([]);
  
  const fetchAgendamentoById = async () => {
    try {
      setId(id);
    } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
      fetchAgendamentoById();
  }, [id]); 

  const handleEditarAgenda = async() => {
    try {
      const response = await editaAgendamentosService(Id, {
          descricao,
          data_evento:formatarDataBrasileira(dataMarcacao),
          hora_inicio:horaInicial,
          hora_termino:horaTermino
      });
  
      if (response) {
          showToastSuccess("Agendamento atualizado.")
      }
  
    } catch (e) {
      const messageError = e.response.data.mensagem;
  
      showToastError(messageError) //! Toastify disparando um alerta de erro
  
      console.log(e);
    }
  }

  const handleLogin = () => {
    history.push('/agendamentos')
  }

  if (!user) {
    history.push('/')
  }

  const formatarDataBrasileira = (data) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };
  return (
    <div>
      <Box h="100vh" position="relative">
      <Button
        // w={200}
        p="4"
        type="button"
        bg="gray.900"
        color="white"
        _hover={{ bg: "blue.500" }}
        position="absolute"
        top={8}
        left={10}
        onClick={ handleLogin }
      >
        <ArrowLeftIcon />
      </Button>
  
      <Center
        as="header"
        h={140}
        bg="black"
        color="white"
        fontWeight="bold"
        fontSize={{ base: '3xl', md: '4xl' }}
        pb="8"
      >
        Agendar
      </Center>

      <Flex
        align="center"
        justify="center"
        bg="blackAlpha.200"
        h="calc(100vh - 150px)"
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
                  onClick={ handleEditarAgenda }
                >
                  Agendar
                </Button>
              </Flex>
            </HStack>
          </FormControl>
        </Center>
      </Flex>
    </Box>
      <ToastContainer />
    </div>
  );
}

export default EditarAgendamento;