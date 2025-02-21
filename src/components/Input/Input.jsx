function Input(props) {
  return (
    <input
      type="text"
      {...props}
      className=" w-120 bg-white text-black p-3 rounded-3xl focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-0"
    />
  );
}

export default Input;
