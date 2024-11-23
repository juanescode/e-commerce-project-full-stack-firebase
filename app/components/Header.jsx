import { Heart, Search, ShoppingCart, UserCircle2 } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import AuthContextProvider from "@/context/AuthContext";
import HeaderClientButtons from "./HeaderClientButtons";
import AdminButton from "./AdminButton";

export default function Header() {
  const menuList = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about-us",
    },
    {
      name: "Contact",
      link: "/contact-us",
    },
  ];
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white border-b bg-opacity-65 backdrop-blur-2xl md:py-4 md:px-16">
      <Link href={"/"}>
        <img className="h-4 md:h-5" src="/logo.png" alt="Logo" />
      </Link>
      <div className="items-center hidden gap-2 font-semibold md:flex">
        {menuList?.map((item) => {
          return (
            <Link href={item?.link}>
              <button className="px-4 py-2 text-sm rounded-lg hover:bg-gray-50">
                {item?.name}
              </button>
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-1">
        <AuthContextProvider>
          <AdminButton />
        </AuthContextProvider>
        <Link href={`/search`}>
          <button
            title="Search Products"
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-50"
          >
            <Search size={14} />
          </button>
        </Link>
        <AuthContextProvider>
          <HeaderClientButtons />
        </AuthContextProvider>
        <Link href={`/account`}>
          <button
            title="My Account"
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-50"
          >
            <UserCircle2 size={14} />
          </button>
        </Link>
        <AuthContextProvider>
          <LogoutButton />
        </AuthContextProvider>
      </div>
    </nav>
  );
}