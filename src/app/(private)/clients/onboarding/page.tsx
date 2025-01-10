// import ClientOnboardingForm from "@/components/client/client-onboarding-form";
import ClientSubscriptionCreateForm from "@/components/client/client-subscription-create-form";

export type IClientOnboardingServerPageProps = {};

const ClientOnboardingServerPage: React.FC<
  IClientOnboardingServerPageProps
> = async () => {
  return (
    <div className="md:w-[60vw] md:h-[60vh] mx-auto">
      {/* <ClientOnboardingForm /> */}
      <ClientSubscriptionCreateForm />
    </div>
  );
};

ClientOnboardingServerPage.displayName = "ClientOnboardingServerPage";

export default ClientOnboardingServerPage;
