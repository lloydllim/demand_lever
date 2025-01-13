import { stripeCheckSessionIdAndUpdateAction } from "@/app/actions/stripe/stripe-check-session-id-and-update.action";
import ClientSubscriptionCreateForm from "@/components/client/client-subscription-create-form";

export interface IClientSubscriptionServicePageProps {
  searchParams: Promise<{
    session_id: string;
  }>;
}

const ClientSubscriptionServicePage: React.FC<
  IClientSubscriptionServicePageProps
> = async (props) => {
  const { session_id } = await props.searchParams;

  if (session_id) {
    const result = await stripeCheckSessionIdAndUpdateAction(session_id);
    if (result.error) {
      return (
        <div className="space-y-4 w-full max-w-[800px] mx-auto">
          <h1 className="text-2xl font-bold">Something went wrong.</h1>

          <p>
            An error happenned while processing your payment. The team has been
            notified. Please try again later.
          </p>
        </div>
      );
    } else if (result.result === true) {
      return (
        <div className="space-y-4 w-full max-w-[800px] mx-auto">
          <h1 className="text-2xl font-bold">Payment successful</h1>

          <p>
            Your payment was successful. You can now access your subscription.
          </p>
        </div>
      );
    }
  }

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
