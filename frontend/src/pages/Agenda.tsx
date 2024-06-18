import CardAgendar from "@/components/cardAgendar/CardAgendar";
import TableAgenda from "@/components/tableAgenda/TableAgenda";
const Agenda = () => (
  <div className="flex h-screen overflow-hidden bg-muted/50">
    <div className="flex items-center justify-center w-1/2 relative">
      <CardAgendar />
    </div>

    <div className="flex flex-col items-center justify-center w-1/2">
      <TableAgenda />
    </div>
  </div>
);

export default Agenda;
