import ClientOnboardingForm from "@/components/client/client-onboarding-form";

export type IClientOnboardingServerPageProps = {};

const ClientOnboardingServerPage: React.FC<
  IClientOnboardingServerPageProps
> = async () => {
  return <ClientOnboardingForm />;
};

ClientOnboardingServerPage.displayName = "ClientOnboardingServerPage";

export default ClientOnboardingServerPage;
