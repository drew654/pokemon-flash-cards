const ImportFromCanvas = () => {
  const handleClick = () => {
    window.open(`${window.location.origin}/canvas`, "popup", "width=400,height=400");
  };

  return (
    <div>
      <button onClick={handleClick}>C</button>
    </div>
  );
};

export default ImportFromCanvas;
