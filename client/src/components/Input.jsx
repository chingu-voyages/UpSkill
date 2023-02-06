function Input({ children, type, name, inputRef, classStyle }) {
  return (
    <div className={`mx-6 mt-4 ${classStyle}`}>
      <label
        htmlFor="email-address"
        className="block text-left font-medium text-ivory-200 my-2"
      >
        {children}
      </label>
      <input
        className={`w-full border-ivory-300 rounded-md h-8 border-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 p-2`}
        name={name}
        type={type}
        ref={inputRef}
      />
    </div>
  );
}

export default Input;
