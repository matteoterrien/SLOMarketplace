import React, { FC, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "./Spinner";

interface LinkItem {
  to: string;
  label: string;
}

const links: LinkItem[] = [
  { to: "/", label: "Home" },
  { to: "/profile", label: "Profile Page" },
  { to: "/", label: "Messages" },
];

interface SettingsModalProps {
  onCloseRequested: () => void;
  darkmode?: boolean;
}

const SettingsModal: FC<SettingsModalProps> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      props.onCloseRequested();
    }
  };

  const handleLinkClick = () => {
    props.onCloseRequested();
  };

  return (
    <div
      className="w-screen h-screen fixed z-50 bg-white/50 flex justify-center items-center"
      onClick={handleOverlayClick}
    >
      <div
        className={`flex flex-col items-center w-1/2 md:w-1/3 lg:w-1/4 h-1/2 p-4 rounded-2xl gap-3
          ${props.darkmode ? "bg-neutral-700" : "bg-[var(--color-accent0)]"}`}
        ref={ref}
      >
        {isLoading ? (
          <div className="absolute flex justify-center items-center z-20 text-white size-55">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="w-full flex flex-row justify-between mb-2">
              <p className="text-2xl font-bold text-neutral-100">Menu</p>
              <button
                aria-label="Close"
                className="px-4 py-1 rounded-lg hover:bg-neutral-300 active:bg-neutral-400 text-white"
                onClick={props.onCloseRequested}
              >
                X
              </button>
            </div>

            {links.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                onClick={handleLinkClick}
                className="bg-neutral-100 w-3/4 h-8 rounded-2xl flex justify-center items-center hover:bg-neutral-200 active:bg-neutral-300"
              >
                <p className="text-black">{link.label}</p>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SettingsModal;
