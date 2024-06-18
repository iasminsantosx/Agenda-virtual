import { useState, useEffect, useContext } from 'react';
import { Flex, Box, Center, FormControl, HStack, Button, Image, Input, Text } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
import { listagemAgendamentosService, excluiAgendamentosService, listagemAgendamentosDataService } from '../services/agentamentoService'
import { MdEdit, MdDelete } from 'react-icons/md';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { showToastError, showToastSuccess } from "../utils/Toastify";
import { ArrowLeftIcon } from '@chakra-ui/icons';
import UserContext from '../context/UserContext';

function Agendamentos() {
  //--------------------------------------- Consts -------------------------------------------------------------------
  const history = useHistory();

  const { user } = useContext(UserContext);

  const [agendamentos, setAgendamentos] = useState([]);
  const [isDisable, setIsDisable] = useState(false);
  const [Data, setData] = useState("");
  //const [flexHeight, setFlexHeight] = useState(100);

//--------------------------------------------------- Handles -------------------------------------------------------
  const handleDelete = async (id) =>{
    try {
      const response = await excluiAgendamentosService(id);

      showToastSuccess("Excluiu agendamento com sucesso.");

      await fetchAgendamentos();

    } catch(error) {
      const messageError = error.response.data.mensagem;

      showToastError(messageError)

      console.log(error);
    }
  }

  const handleEditar = (id) => {
    history.push(`/editar-agendamento/${id}`);
  };

  const handleAgendamentoPorData = async () => {
    const dataFormatada = formatarDataBrasileira(Data);
    setIsDisable(true);
    try {
      const response = await listagemAgendamentosDataService(dataFormatada,user.id);

      const agendamento = response.data.map(ag => ({
        id:ag.id,
        data_evento:ag.data_evento,
        hora_inicio: ag.hora_inicio,
        hora_termino: ag.hora_termino,
        descricao: ag.descricao,
      }));

      setAgendamentos(agendamento);
    } catch(error) {
      console.error(error);
    }
  }

  const handleLogin = () => {
    history.push('/home')
  }

//------------------------------------------------------- Funções --------------------------------------------------------
  const formatarDataBrasileira = (data) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

//---------------------------------------------------- Use Effect ----------------------------------------------------------
  const fetchAgendamentos = async () => {
    try {
      const response = await listagemAgendamentosService(user.id);
      const agendamento = response.data.map(ag => ({
        id:ag.id,
        data_evento:ag.data_evento,
        hora_inicio: ag.hora_inicio,
        hora_termino: ag.hora_termino,
        descricao: ag.descricao,
      }));
      setAgendamentos(agendamento);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAgendamentos();
  }, []); 

  if (!user) {
    history.push('/')
  }

//------------------------------------------------------------------------ return -------------------------------------------------
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
        top={9}
        left={6}
        zIndex={1}
        onClick={ handleLogin }
      >
        <ArrowLeftIcon />
      </Button>

      <Center
        as="header"
        h={150}
        bg="black"
        color="white"
        fontWeight="bold"
        fontSize={{ base: '2xl', md: '4xl' }}
        pb="8"
      >
        Agenda
      </Center>

      <Flex
        align="center"
        justify="center"
        bg="blackAlpha.200"
        h={"100%"}
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
          <Box>
          <FormControl display="flex" flexDir="column" gap="4">
            <Box>
              <Text>Data:</Text>
              <Input type="date" value={Data} onChange={(e) => setData(e.target.value)} />
              <Button
                _hover={{ 
                  bg: "blue.600",
                  color: "white"
                }}
                onClick={() => handleAgendamentoPorData()}
              >
                Agendamentos Por Data
              </Button>
            </Box>

            <ul style={{ listStyle: 'none', padding: 0 }}>
              { agendamentos.map(agendamento => (
              <Box key={ agendamento.id } bg="gray.100" p="4" borderRadius="md" style={{ marginBottom: '12px' }}>
                <HStack spacing="4" justify="center">
                  <li>
                    <strong>Descrição:</strong> { agendamento.descricao } - <strong>Data:</strong> { agendamento.data_evento } -  <strong>Horário Inicio:</strong> { agendamento.hora_inicio } - <strong>Horário Termino:</strong> { agendamento.hora_termino }
                  </li>

                  <Button
                    _hover={{ 
                      bg: "blue.300",
                      color: "white"
                    }}
                    onClick={() => handleEditar(agendamento.id)}
                  >
                    <MdEdit />
                  </Button>

                  <Button
                    _hover={{ 
                      bg: "red.400",
                      color: "white"
                    }}
                    onClick={() => handleDelete(agendamento.id)}
                  >
                    <MdDelete />
                  </Button>
                </HStack>
              </Box>
              ))}
            </ul>
          </FormControl>
          </Box> 
        </Center>
      </Flex>
      <ToastContainer />
    </Box>
  );
}

export default Agendamentos;