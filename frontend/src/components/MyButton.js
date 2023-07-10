const MyButton = ({ text, onClick, disabled }) => {
  const buttonClassName = `pl-2 pr-2 pt-2 pb-2 bg-project text-white rounded-xl cursor-pointer ${
    disabled
      ? "bg-disabled cursor-not-allowed"
      : "hover:bg-buttonhover hover:text-buttonhovercolor hover:font-bold"
  }`;

  return (
    <button className={buttonClassName} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default MyButton;
