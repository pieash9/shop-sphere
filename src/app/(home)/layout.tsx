import Header from "@/components/shared/header";
import { ReactNode } from "react";

const HomeLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
export default HomeLayout;
