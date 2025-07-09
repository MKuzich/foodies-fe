import { useState } from "react";
import SegmentedSwitch from "./SegmentedSwitch";

const AuthBar = ({ onSignIn, onSignUp, className = "" }) => {
  const [mode, setMode] = useState("signIn");

 
  const handleChange = (val) => {
    setMode(val);
    if (val === "signIn") onSignIn();
    else onSignUp();
  };

  return (
    <SegmentedSwitch
      options={[
        { label: "Sign In", value: "signIn" },
        { label: "Sign Up", value: "signUp" }
      ]}
      value={mode}
      onChange={handleChange}
      className={className}
    />
  );
};

export default AuthBar;