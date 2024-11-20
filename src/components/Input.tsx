import { ChangeEvent, useState } from "react";

interface InputProps {
  onSearch: (input: string) => void;
}

export const Input: React.FC<InputProps> = ({ onSearch }) => {
  const [text, setText] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <header className="m-8">
      <h1>Bluemate</h1>
      <main>
        <input
          type="text"
          onChange={handleChange}
          className="border-[20px] border-blue-600 "
        />
        <button onClick={() => onSearch(text)} className="bg-blue-600">
          Search
        </button>
      </main>
    </header>
  );
};
