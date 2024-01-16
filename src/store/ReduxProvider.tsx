"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { ReactNode } from "react";
type PageLayoutProps = {
  children: ReactNode;
};
const ReduxProvider = ({ children }: PageLayoutProps) => {
  return <Provider store={store}>{children}</Provider>;
};
export default ReduxProvider;
