import { FaGithub, FaInstagram } from "react-icons/fa6";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full p-4 bg-neutral-800 flex flex-col shadow-xl">
      <h2 className="text-center font-bold text-neutral-400 text-lg mx-auto ">
        by KarlinCoder
      </h2>
      <div className="flex justify-center gap-1">
        <a href="https://github.com/KarlinCoder" target="_blank">
          <FaGithub className="text-neutral-400 text-3xl hover:text-neutral-200 cursor-pointer active:text-neutral-400" />
        </a>
        <a
          href="https://www.instagram.com/its.karlin.coder/?igsh=MW1oYnNwMHIxYmRjbg%3D%3D"
          target="_blank"
        >
          <FaInstagram className="text-neutral-400 text-3xl hover:text-neutral-200 cursor-pointer active:text-neutral-400" />
        </a>
      </div>
    </footer>
  );
};
