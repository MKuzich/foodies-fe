import clsx from "clsx";
import { useState } from "react";

import SegmentedSwitch from "../SegmentedSwitch/SegmentedSwitch";

const AuthBar = ({ onSignIn, onSignUp, className = "", isHome = true }) => {
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
        { label: "Sign Up", value: "signUp" },
      ]}
      value={mode}
      onChange={handleChange}
      isHome={isHome}
      className={clsx(className, !isHome && "authBarDark")}
    />
  );
};

export default AuthBar;
