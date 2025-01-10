import ClientSidebar from "@/components/client/client-sidebar";

export type IClientPageLayoutProps = {
  children: React.ReactNode;
};

const ClientPageLayout: React.FC<IClientPageLayoutProps> = ({ children }) => {
  return <ClientSidebar>{children}</ClientSidebar>;
};

ClientPageLayout.displayName = "ClientPageLayout";

export default ClientPageLayout;
