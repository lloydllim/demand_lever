import ClientOnboardingForm from "@/components/client/client-onboarding-form";
import ClientSubscriptionCreateForm from "@/components/client/client-subscription-create-form";

export type IClientOnboardingServerPageProps = {};

const ClientOnboardingServerPage: React.FC<
  IClientOnboardingServerPageProps
> = async () => {
  return (
    <div className="md:w-[60vw] md:h-[60vh] mx-auto space-y-4">
      <ClientOnboardingForm />
      <h1 className="text-2xl font-bold">Select Plan</h1>
      <ClientSubscriptionCreateForm />
    </div>
  );
};

ClientOnboardingServerPage.displayName = "ClientOnboardingServerPage";

export default ClientOnboardingServerPage;
