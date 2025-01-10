import ClientSubscriptionCreateForm from "@/components/client/client-subscription-create-form";

export type IClientSubscriptionServicePageProps = {};

const ClientSubscriptionServicePage: React.FC<
  IClientSubscriptionServicePageProps
> = async () => {
  return (
    <div className="md:w-[60vw] md:h-[60vh] mx-auto">
      <ClientSubscriptionCreateForm />
    </div>
  );
};

ClientSubscriptionServicePage.displayName = "ClientSubscriptionServicePage";

export default ClientSubscriptionServicePage;
