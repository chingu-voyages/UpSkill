function ButtonUse({ children }) {
  return (
    <button className="bg-grotto-100 m-2 hover:bg-primary px-6 max-[399px]:px-2 py-1 text-xs lg:text-sm text-white rounded-full  outline outline-2 border-none outline-grotto-100">
      {children}
    </button>
  );
}

export default ButtonUse;
