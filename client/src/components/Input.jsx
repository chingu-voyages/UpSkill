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
        className={`w-full border-ivory-300 rounded-md h-8 border-2 focus:border-green p-2`}
        name={name}
        type={type}
        ref={inputRef}
      />
    </div>
  );
}

export default Input;
