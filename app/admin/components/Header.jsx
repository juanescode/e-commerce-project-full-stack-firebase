"use client";

import { Menu } from "lucide-react";

export default function Header({ toggleSidebar }) {
  return (
    <section className="fixed top-0 flex items-center w-full gap-3 px-4 py-4 bg-white border-b">
      <div className="flex items-center justify-center md:hidden">
        <button onClick={toggleSidebar}>
          <Menu />
        </button>
      </div>
      <h1 className="text-xl font-semibold">Dashboard</h1>
    </section>
  );
}
