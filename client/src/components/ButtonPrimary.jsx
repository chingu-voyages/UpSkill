import { Children } from "react";

function ButtonPrimary({ children, type }) {
  return (
    <button
      type={type}
      className="bg-grotto-100 font-semibold text-white p-2 rounded w-48 my-2 hover:bg-primary"
    >
      {children}
    </button>
  );
}

export default ButtonPrimary;
