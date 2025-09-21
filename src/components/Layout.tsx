import { ReactNode } from "react";
import Navigation from "./Navigation";
import PaymentPopup from "./PaymentPopup";
import EditableFooter from "./EditableFooter";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <main className="relative">
        {children}
      </main>
      
      <EditableFooter />
      
      <PaymentPopup />
    </div>
  );
};

export default Layout;