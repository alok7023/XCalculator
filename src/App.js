import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const buttons = [
    "7",
    "8",
    "9",
    "+",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "*",
    "C",
    "0",
    "=",
    "/",
  ];
  const calculateResult = () => {
    try {
      const calculateResult = eval(inputValue);
      if (isNaN(calculateResult)) setResult("NaN");
      else if (calculateResult === Infinity) setResult("Infinity");
      else setResult(calculateResult);
    } catch (e) {
      setResult("Error");
    }
  };

  const clearDisplay = () => {
    setInputValue("");
    setResult("");
  };
  const handleButtonClick = (number) => {
    try {
      if (number === "=") {
        if (!inputValue.trim()) {
          setResult("Error");
        } else {
          calculateResult();
        }
      } else if (number === "C") {
        clearDisplay();
      } else {
        setInputValue((prev) => prev + number);
      }
    } catch (error) {
      setResult("Error");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      if (/[\d+*/=\-C]/.test(key)) {
        handleButtonClick(key);
      } else if (event.which === 13 || event.keyCode === 13) {
        handleButtonClick("=");
      } else if (key === "Backspace") {
        setInputValue((prev) => prev.slice(0, -1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <div className="container">
      <h1>React Calculator</h1>
      <input
        type="text"
        value={inputValue}
        placeholder="0"
        className="calc_input"
        readOnly
      />
      <h3>Result : {result || "0"}</h3>
      <div className="calc_btn">
        {buttons.map((number, i) => (
          <button key={i} onClick={() => handleButtonClick(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
