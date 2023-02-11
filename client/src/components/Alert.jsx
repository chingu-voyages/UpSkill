import { useEffect, useState } from "react";

const Alert = ({
  children,
  color,
  position,
  font = "semibold",
  size = "xs",
}) => {
  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className={`flex fixed ${position} m-3 p-3 text-white text-${size} rounded-lg shadow-lg font-${font}`}
    >
      {children}
    </div>
  );
};

export default Alert;
