import Link from "next/link";

export default function Header() {
  const menuList = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About Us",
      link: "/about-us",
    },
    {
      name: "Contact Us",
      link: "/contact-us",
    },
  ];
  return (
    <nav className="flex items-center justify-between py-4 border-b px-14 ">
      <img className="h-9" src="/logo.png" alt="" />
      <div className="flex items-center gap-4 font-semibold">
        {menuList?.map((item) => {
          return (
            <Link href={item?.link} key={item?.name}>
              <button>{item?.name}</button>
            </Link>
          );
        })}
      </div>
      <Link href={"/login"}>
        <button className="px-5 py-2 font-bold text-white bg-blue-600 rounded-full">
          Login
        </button>
      </Link>
    </nav>
  );
}
