"use client";

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import {
  Cat,
  Layers2,
  LayoutDashboard,
  LibraryBig,
  LogOut,
  PackageOpen,
  ShieldCheck,
  ShoppingCart,
  Star,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function Sidebar() {
  const menuList = [
    {
      name: "Dashboard",
      link: "/admin",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Producs",
      link: "/admin/products",
      icon: <PackageOpen className="w-5 h-5" />,
    },
    {
      name: "Categories",
      link: "/admin/categories",
      icon: <Layers2 className="w-5 h-5" />,
    },
    {
      name: "Brands",
      link: "/admin/brands",
      icon: <Cat className="w-5 h-5" />,
    },
    {
      name: "orders",
      link: "/admin/orders",
      icon: <ShoppingCart className="w-5 h-5" />,
    },
    {
      name: "Customers",
      link: "/admin/customers",
      icon: <User className="w-5 h-5" />,
    },
    {
      name: "Reviews",
      link: "/admin/reviews",
      icon: <Star className="w-5 h-5" />,
    },
    {
      name: "Collections",
      link: "/admin/collections",
      icon: <LibraryBig className="w-5 h-5" />,
    },
    {
      name: "Admins",
      link: "/admin/admins",
      icon: <ShieldCheck className="w-5 h-5" />,
    },
  ];
  return (
    <section className="sticky top-0 flex flex-col gap-10 h-screen px-5 py-3 overflow-hidden bg-white border-r w-[260px] z-50 ">
      <div className="flex justify-center py-4">
        <img className="h-8" src="/logo.png" alt="" />
      </div>
      <ul className="flex flex-col flex-1 h-full gap-4 overflow-y-auto">
        {menuList?.map((item, key) => {
          return <Tab item={item} key={key} />;
        })}
      </ul>
      <div className="flex justify-center">
        <button
          onClick={async () => {
            try {
              await toast.promise(signOut(auth), {
                error: (e) => e?.message,
                loading: "Loading...",
                success: "Successfully Logged out",
              });
            } catch (error) {
              toast.error(error?.message);
            }
          }}
          className="flex items-center justify-center w-full gap-2 px-3 py-2 transition-all hover:bg-indigo-100 rounded-xl ease-soft-spring duration-400"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>
    </section>
  );
}

function Tab({ item }) {
  const pathname = usePathname();
  const isSelected = pathname === item?.link;
  return (
    <Link href={item?.link}>
      <li
        className={`flex items-center gap-2 px-4 py-2 font-semibold rounded-xl ease-soft-spring transition-all duration-300 ${
          isSelected ? "bg-[#879fff] text-white" : "bg-white text-black"
        }`}
      >
        {item?.icon} {item?.name}
      </li>
    </Link>
  );
}
