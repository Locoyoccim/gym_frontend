import { useState } from "react";
import { functionEye } from "../../../interfaces";
import "./inputEye.css";


function InputEye( { operation } : functionEye ) {
  const [eyeAnimation, setEyeAnimation] = useState<string>("");
  return (
    <>
      <button
        id="eye_container"
        className={eyeAnimation}
        onClick={(e) => {
          e.preventDefault(),
            setEyeAnimation(eyeAnimation === "" ? "animation_in" : ""),
            operation();
        }}
      >
        <i className="bi bi-eye-fill"></i>
      </button>
    </>
  );
}

export default InputEye;
