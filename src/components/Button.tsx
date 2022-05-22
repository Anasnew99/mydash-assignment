import React from "react";

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      className={`button bg--blue ${props.disabled ? "button--disabled" : ""}`}
      {...props}
    />
  );
}
