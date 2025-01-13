import ClientSidebar from "@/components/client/client-sidebar";

export type IClientPageLayoutProps = {
  children: React.ReactNode;
};

const ClientPageLayout: React.FC<IClientPageLayoutProps> = ({ children }) => {
  return (
    <ClientSidebar>
      <div className="flex flex-col space-y-4 p-6">{children}</div>
    </ClientSidebar>
  );
};

ClientPageLayout.displayName = "ClientPageLayout";

export default ClientPageLayout;
