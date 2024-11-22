import { ChangeEvent, ReactNode, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { VscLoading } from "react-icons/vsc";

interface InputProps {
  onSearch: (input: string) => void;
  children: ReactNode[];
  loading: boolean;
}

export const Input: React.FC<InputProps> = ({
  onSearch,
  children,
  loading,
}) => {
  const [text, setText] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <header className="flex flex-col gap-5 justify-center items-center w-full pt-8">
      <div className="relative">
        <h1 className="text-3xl md:text-[2.6rem]">
          Youtube<span className="font-bold">Downloader</span>
          <p className="absolute bottom-[-16px] right-[-25px] text-sm w-[100px]">
            by KarlinCoder
          </p>
        </h1>
      </div>
      <main className="relative flex justifyc-center min-w-[50px] max-w-[700px] w-full px-8">
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch(text);
          }}
          type="text"
          onChange={handleChange}
          className="w-full border-[2px] text-lg border-neutral-500 bg-white py-3 px-6 outline-none border-r-0 rounded-full focus:shadow-xl transition-shadow"
          placeholder="Video o URL del video"
        />
        <button
          disabled={loading}
          onClick={() => onSearch(text)}
          className="absolute grid place-content-center right-0 h-full mr-[30px] w-[52px] bg-neutral-700 hover:bg-neutral-800 active:bg-neutral-700 rounded-full text-white disabled:bg-neutral-500"
        >
          {loading ? (
            <VscLoading className="animate-spin" />
          ) : (
            <FaMagnifyingGlass />
          )}
        </button>
        <footer className="absolute w-full max-w-[348px] bottom-[-25px] text-center ">
          {children}
        </footer>
      </main>
    </header>
  );
};
