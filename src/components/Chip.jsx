function Chip({ text, active, onClick }) {
  return (
    <button className={`chip${active ? " on" : ""}`} onClick={onClick}>
      {text}
    </button>
  );
}

export default Chip;
