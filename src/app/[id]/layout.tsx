import { ReactNode } from "react";
import NavBar from "@/components/navBar/NavBar";

type PageLayoutProps = {
  children: ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default PageLayout;
