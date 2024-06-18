import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const CardAgendar = () => {
  return (
    <div className=" p-8 bg-white rounded-2xl border border-slate-200 flex-col justify-start items-start gap-6 inline-flex w-[500px]">
      <div className="flex-col justify-start items-center gap-2 flex">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          Agende seu compromisso
        </h2>
      </div>

      <div className="self-stretch flex-col gap-6 flex">
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="text">Descrição</Label>
          <Input type="descricao" id="descricao" />
        </div>

        <div className="grid w-full items-center gap-2">
          <Label htmlFor="date">Data Evento</Label>
          <Input type="password" id="password" />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="date">Hora Inicio</Label>
          <Input type="password" id="password" />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="date">Hora Termino</Label>
          <Input type="password" id="password" />
        </div>
      </div>

      <div className="flex-col self-stretch flex gap-2">
        <Button variant="default">Agendar</Button>
      </div>
    </div>
  );
};

export default CardAgendar;
