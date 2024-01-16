"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
type linkType = { link: string; path: string };
const NavBarLinks = (props: linkType) => {
  let pathName = `${usePathname()}`;
  return (
    <Link
      href={props.path}
      className={` text-lg ${
        pathName === props.path
          ? "font-bold text-primary"
          : "text-black/50 font-medium"
      }`}
    >
      {props.link}
    </Link>
  );
};

export default NavBarLinks;
