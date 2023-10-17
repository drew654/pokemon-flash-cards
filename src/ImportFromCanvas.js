const ImportFromCanvas = (
  { courseName, listId }
) => {
  const handleClick = () => {
    window.open(`${window.location.origin}/canvas-insert-page?courseName=${courseName}&listId=${listId}`, "popup", "width=600,height=600");
  };

  return (
    <div>
      <button onClick={handleClick}>C</button>
    </div>
  );
};

export default ImportFromCanvas;
