import React from "react";
interface ICheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
export default function Checkbox(props: ICheckBoxProps) {
  return (
    <div className={"checkbox"}>
      <input type={"checkbox"} className={"checkbox-field"} {...props} />
      {props.label && (
        <label htmlFor={props.id} className={"checkbox-label"}>
          {props.label}
        </label>
      )}
    </div>
  );
}
