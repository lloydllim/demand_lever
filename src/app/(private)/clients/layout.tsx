import ClientSidebar from "@/components/client/client-sidebar";

export type IClientPageLayoutProps = {
  children: React.ReactNode;
};

const ClientPageLayout: React.FC<IClientPageLayoutProps> = ({ children }) => {
  return (
    <ClientSidebar>
      <div className="flex flex-col h-screen items-center justify-center space-y-4">
        {children}
      </div>
    </ClientSidebar>
  );
};

ClientPageLayout.displayName = "ClientPageLayout";

export default ClientPageLayout;
