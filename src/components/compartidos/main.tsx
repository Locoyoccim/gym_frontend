import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "../generales/mainPage/MainPage.tsx";
import NuevaRutina from "../generales/nuevaRutina/NuevaRutina.tsx";
import "./index.css";
import ExerciseHistory from "../generales/historia_Rutinas/ExerciseHistory.tsx";
import SelectDate from "./memoria/SelectDate.tsx";
import SeriesContext from "./memoria/SeriesContext.tsx";
import ExerciseProvider from "./memoria/ExerciseProvider.tsx";
import { AuthProvider } from "./memoria/AuthProvider.tsx";
import Profile from "../generales/profile/Profile.tsx";
import SingIn from "../generales/singin/SingIn.tsx";
import UserInfo from "../generales/userInfoForm/UserInfo.tsx";
import ErrorPage from "./ErrorPage/ErrorPage.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SingIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "dashboard/:id_user",
    element: <ProtectedRoute Element={MainPage} />,
  },
  {
    path: "nuevaRutina/:id_user",
    element: <ProtectedRoute Element={NuevaRutina} />,
  },
  {
    path: "exercise_history/:id_user",
    element: <ProtectedRoute Element={ExerciseHistory} />,
  },
  {
    path: "profile/:id_user",
    element: <ProtectedRoute Element={Profile} />,
  },
  {
    path: "userRegistration/:id_user",
    element: <ProtectedRoute Element={UserInfo} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SeriesContext>
      <SelectDate>
        <ExerciseProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </ExerciseProvider>
      </SelectDate>
    </SeriesContext>
  </React.StrictMode>
);
