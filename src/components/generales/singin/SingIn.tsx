import LogIn from "./LogIn.tsx";
import CreateAccount from "./CreateAccount.tsx";
import { useState } from "react";
import "../singin/singin.css";

function SingIn() {
  const [windowDisplay, setWindowDisplay] = useState<string>("");

  const windowChange = (action: string) => {
    setWindowDisplay(action);
  };

  return (
    <section id="singIn_container">
      <LogIn windowChange={windowChange} />
      <CreateAccount windowChange={windowChange} windowState={windowDisplay} />
    </section>
  );
}

export default SingIn;
