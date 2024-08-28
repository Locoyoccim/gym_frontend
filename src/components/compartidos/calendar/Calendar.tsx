import { useContext, useEffect, useState } from "react";
import { ActualDate } from "../memoria/SelectDate";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar_choice.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function Calendar_choice() {
  const contexto = useContext(ActualDate);
  const [value, onChange] = useState<Value>(new Date());

  const date = value as Date;
  const dia: string = date?.getDate()?.toString().padStart(2, "0") ?? ""; // Obtener día con dos dígitos
  const mes: string = (date?.getMonth() + 1)?.toString().padStart(2, "0") ?? ""; // Obtener mes con dos dígitos
  const anio: string = date?.getFullYear()?.toString() ?? "";
  const formatoFecha = `${anio}-${mes}-${dia}`;

  useEffect(() => {
    contexto?.enviar({ tipo: "update", value: formatoFecha });
  }, [value]);

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

export default Calendar_choice;
