import ClientSidebar from "@/components/client/client-sidebar";

export type IClientServerPage = {};

const ClientServerPage: React.FC<IClientServerPage> = () => {
  return <ClientSidebar></ClientSidebar>;
};

ClientServerPage.displayName = "ClientServerPage";

export default ClientServerPage;
