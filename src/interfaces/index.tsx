import { ReactNode, ChangeEvent, ComponentType } from "react";

export interface functions {
  setModalConfirmation: (value: string) => void;
  setShowModal: (value: string) => void;
}
export interface functionEye {
  operation: () => void;
}
export interface userProps {
  id?: number;
  nombre?: string;
  email?: string;
  password?: string;
}
export interface infoUserProps {
  id_user?: number;
  nombre?: string;
  actualizacion: ReactNode;
  edad: number;
  peso_kg: number;
  estatura: number;
  genero: string;
}
export interface dataUserProps {
  nombre: string;
  apellidos: string;
  email: string;
  username: string;
  password: string;
}
export type childrenContext = {
  children: ReactNode;
};
export type ElementComponent = {
  Element: ComponentType; //Revisar, posible cambio para agregar ComponentType<any>
};
export interface series {
  peso: number;
  reps: number;
  rir: number;
  recu: number;
}
export interface fechaSerieProps {
  fecha: string;
  series: series[];
}
export interface CompleteSerie {
  name?: string;
  series: series[];
  fecha: string;
  usuario_id: number;
  ejercicio?: number;
}
export interface modalProps1 {
  ModalTittle: string;
  ModalMsj: string;
  ConfirmationMsj: string;
  ReturnMsj: string;
  sendToBackend: () => void;
  setModalConfirmation: (value: string) => void;
  ModalState: string;
  isLoading: boolean;
}
export interface ModalProps2 {
  modalState: string;
  setShowModal: (e: string) => void;
}
export interface getInputValues {
  index: number;
  getInputValues: (index: number, ejercicio: number, series: series[]) => void;
}
export interface getSeriesInfo {
  index: number;
  series: series[];
  getSeriesInfo: (index: number, prop: keyof series, value: number) => void;
}

export type changeEvent = ChangeEvent<HTMLInputElement>;
