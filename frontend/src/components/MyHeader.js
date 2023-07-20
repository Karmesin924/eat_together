const MyHeader = ({ headText, leftChild, rightChild }) => {
  return (
    <header className="pt-5 pb-5 font-bold flex items-center bg-project">
      <div className="flex ml-4 justify-start w-1/4">{leftChild}</div>
      <div className="flex justify-center w-1/2 text-3xl">{headText}</div>
      <div className="flex mr-4 text-right justify-end w-1/4">{rightChild}</div>
    </header>
  );
};

export default MyHeader;
