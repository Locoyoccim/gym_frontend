import { createContext, useEffect, useReducer } from "react";
import { useAuth } from "./AuthProvider";
import {
  CompleteSerie,
  childrenContext,
  ReducerSeries,
  ActionSeries,
} from "../../../interfaces";
import GetSeries from "../../../servicios/GetSeries";

export const SerieContext = createContext<ReducerSeries | undefined>(undefined);

function SeriesContext({ children }: childrenContext) {
  const { GetToken } = useAuth();
  const jwt = GetToken() || "";
  const { data } = GetSeries("series/", jwt);

  const reductor = (
    estado: CompleteSerie[],
    action: ActionSeries
  ): CompleteSerie[] => {
    switch (action.tipo) {
      case "agregar":
        return [
          ...estado,
          ...(Array.isArray(action.value) ? action.value : [action.value]),
        ];
      default:
        return estado;
    }
  };

  const initState = reductor([], { tipo: "agregar", value: data });
  const [estado, enviar] = useReducer(reductor, initState);

  useEffect(() => {
    if (data && data.length > 0 && estado.length === 0) {
      enviar({ tipo: "agregar", value: data });
    }
  }, [data]);

  return (
    <>
      <SerieContext.Provider value={{ estado, enviar }}>
        {children}
      </SerieContext.Provider>
    </>
  );
}

export default SeriesContext;
