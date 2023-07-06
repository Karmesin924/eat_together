const MyButton = ({ text, onClick }) => {
  return (
    <button
      className=" pl-2 pr-2 pt-2 pb-2 bg-project text-white rounded-xl cursor-pointer disabled:bg-disabled disabled:cursor-not-allowed hover:bg-buttonhover hover:text-buttonhovercolor hover:font-bold"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default MyButton;
