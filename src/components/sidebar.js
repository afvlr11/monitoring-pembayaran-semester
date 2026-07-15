"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  LayoutDashboard,
  GraduationCap,
  X,
} from "lucide-react";

const SideBar = ({ open, setOpen }) => {
  const pathname = usePathname();

  const menus = [
    {
      name: "Home",
      href: "/",
      icon: House,
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Mahasiswa",
      href: "/mahasiswa",
      icon: GraduationCap,
    },
  ];

  return (
    <>
      {/* Overlay HP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-64
          bg-slate-800 text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          flex flex-col
          shadow-xl
        `}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <Image
              src="/logo/logo-sttar.png"
              alt="Logo STTAR"
              width={55}
              height={55}
              className="bg-white rounded-full p-1"/>

            <div>
              <h1 className="text-xl font-bold">
                STTAR
              </h1>

              <p className="text-xs text-slate-300">
                Sekolah Tinggi Teknik
                <br/>
                Atlas Nusantara
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden">
            <X size={24} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const active =
              pathname === menu.href ||
              (menu.href !== "/" &&
                pathname.startsWith(menu.href));

            return (
              <Link
                key={menu.href}
                href={menu.href}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3
                  px-4 py-3 rounded-xl
                  transition-all duration-300

                  ${
                    active
                      ? "bg-pink-500 text-white border-l-4 border-pink-200 shadow-lg"
                      : "hover:bg-slate-700 hover:translate-x-1"
                  }
                `}>
                <Icon size={20} />

                <span className="font-medium">
                  {menu.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-700 p-5">
          <p className="text-center text-xs text-slate-400">
            © 2026 STTAR
          </p>

          <p className="text-center text-[11px] text-slate-500 mt-1">
            Version 1.0
          </p>
        </div>
      </aside>
    </>
  );
};

export default SideBar;