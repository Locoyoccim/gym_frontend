import { useState } from "react";
import "./inputEye.css";

interface props{
    operation: () => void
}

function InputEye( { operation } :props ) {
  const [eyeAnimation, setEyeAnitmation] = useState<string>("");
  return (
    <>
      <button
        id="eye_container"
        className={eyeAnimation}
        onClick={(e) => {
          e.preventDefault(),
            setEyeAnitmation(eyeAnimation === "" ? "animation_in" : ""),
            operation();
        }}
      >
        <i className="bi bi-eye-fill"></i>
      </button>
    </>
  );
}

export default InputEye;
