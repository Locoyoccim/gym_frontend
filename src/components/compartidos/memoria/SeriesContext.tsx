import { createContext } from "react";
import { useAuth } from "./AuthProvider";
import { CompleteSerie, childrenContext } from "../../../interfaces";
import GetSeries from "../../../servicios/GetSeries";

export const SerieContext = createContext<CompleteSerie[]>([]);

function SeriesContext({ children }: childrenContext) {
  const {  GetToken } = useAuth();
  const jwt = GetToken() || ''
  const { data } = GetSeries('series/', jwt)

  return (
    <>
      <SerieContext.Provider value={data}>
        {children}
      </SerieContext.Provider>
    </>
  );
}

export default SeriesContext;