const Alert = ({ children, color }) => {
  return (
    <div
      className={`fixed z-[999] bottom-0 left-0 m-3 p-3 bg-${color}-500 
      text-white rounded-lg shadow-lg font-semibold`}
    >
      {children}
    </div>
  );
};

export default Alert;
