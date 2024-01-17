"use client";
import { usePathname } from "next/navigation";
import NavBarLinks from "./NavBarLinks";

const NavBar = () => {
  let pathName = usePathname().split("/")[1];
  const links = [
    { link: "Feeds", path: `/${pathName}/feeds` },
    { link: "Users", path: `/${pathName}/users` },
    { link: "Profile", path: `/${pathName}/profile` },
  ];

  return (
    <>
      <nav className="flex items-center justify-between py-8 border-b border-black/20">
        <h1 className="text-primary text-3xl font-bold">TweeX</h1>
        <div className="space-x-10">
          {links.map((item) => {
            return (
              <NavBarLinks key={item.link} link={item.link} path={item.path} />
            );
          })}
        </div>
      </nav>
    </>
  );
};
export default NavBar;
