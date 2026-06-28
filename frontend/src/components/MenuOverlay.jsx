import React from "react";
import NavLink from "./NavLink";

const MenuOverlay = ({
  links,
  onClose,
  user,
  logout,
  onOpenLogin,
  onOpenRegister,
}) => {
  return (
    <div className="mx-4 mb-4 rounded-3xl border border-white/10 bg-slate-900/95 p-4 shadow-2xl shadow-black/40 md:hidden">
      <ul className="flex flex-col gap-2">
        {links.map((link, index) => (
          <li key={index}>
            <NavLink href={link.path} title={link.title} onClick={onClose} />
          </li>
        ))}
      </ul>

      <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
        {user ? (
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-semibold text-slate-300">
              Hi, {user.name}
            </span>
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20 cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => {
                onOpenLogin();
                onClose();
              }}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-center text-sm font-semibold text-white cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => {
                onOpenRegister();
                onClose();
              }}
              className="flex-1 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-2.5 text-center text-sm font-semibold text-white cursor-pointer"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuOverlay;
