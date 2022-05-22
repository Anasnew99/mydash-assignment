import React from "react";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  fullWidth?: boolean;
}

function Input(props: IInputProps) {
  return (
    <div className={`input ${props.error ? "input__error" : ""}`}>
      {props.label && <label className="input-label">{props.label}</label>}
      <input
        {...props}
        className={"input-field"}
        style={{ width: props.fullWidth ? "100%" : "auto" }}
      />
      {props.error && <div className={"input-error"}>{props.error}</div>}
    </div>
  );
}

export default Input;
