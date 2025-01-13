import ClientOnboardingForm from "@/components/client/client-onboarding-form";

const ClientOnboardingServerPage: React.FC = async () => {
  return (
    <div className="space-y-4 w-full max-w-[800px] mx-auto">
      <ClientOnboardingForm />;
    </div>
  );
};

ClientOnboardingServerPage.displayName = "ClientOnboardingServerPage";

export default ClientOnboardingServerPage;
