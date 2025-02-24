import { useRef } from "react";
import { Link } from "react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/profile", label: "Profile Page" },
  { to: "/", label: "Messages" },
];

function SettingsModal(props) {
  const ref = useRef(null);

  const handleOverlayClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      props.onCloseRequested();
    }
  };

  return (
    <div
      className="w-screen h-screen fixed z-50 bg-white/50 flex justify-center items-center"
      onClick={handleOverlayClick}
    >
      <div
        className={` flex flex-col items-center w-1/2 md:w-1/3 lg:w-1/4 h-1/2 p-4 rounded-2xl gap-3
          ${props.darkmode ? "bg-neutral-700" : "bg-[var(--color-accent0)]"}`}
        ref={ref}
      >
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
          <div
            key={index}
            className="bg-neutral-100 w-3/4 h-8 rounded-2xl flex justify-center items-center hover:bg-neutral-200 active:bg-neutral-300"
          >
            <Link to={link.to}>
              <button className="text-black" onClick={props.onCloseRequested}>
                {link.label}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SettingsModal;
