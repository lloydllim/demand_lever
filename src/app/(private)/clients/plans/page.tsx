import ClientSubscriptionCreateForm from "@/components/client/client-subscription-create-form";

const ClientSubscriptionServicePage: React.FC = async () => {
  return (
    <div className="space-y-4 w-full max-w-[800px] mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Select your plan</h1>
        <p className="text-gray-500">
          Confirm your plan and proceed to payment.
        </p>
      </div>
      <ClientSubscriptionCreateForm />
    </div>
  );
};

ClientSubscriptionServicePage.displayName = "ClientSubscriptionServicePage";

export default ClientSubscriptionServicePage;
