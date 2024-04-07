import DashHeader from "@/components/shared/dashHeader";
import { ReactNode } from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div>
      <DashHeader />
      {children}
    </div>
  );
};

export default DashboardLayout;
