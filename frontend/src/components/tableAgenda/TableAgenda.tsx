import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";

const TableAgenda = () => {
  const [evento, setEvento] = useState([]);

  useEffect(() => {
    // Função para buscar dados da API
    const fetchEvento = async () => {
      try {
        const response = await fetch("https://api.example.com/agenda"); // substitua pela URL da sua API
        const result = await response.json();
        setEvento(result);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchEvento();
  }, []);
  return (
    <div className=" p-8 bg-white rounded-2xl border border-slate-200 flex-col justify-start items-start gap-6 inline-flex w-full h-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead>Evento</TableHead>
            <TableHead>Hora de Inicio</TableHead>
            <TableHead>Hora de Termino</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {evento.length ? (
            evento.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.descricao}</TableCell>
                <TableCell>{row.data}</TableCell>
                <TableCell>{row.horaInicio}</TableCell>
                <TableCell>{row.horaTermino}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableAgenda;
