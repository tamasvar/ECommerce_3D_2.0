import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { stripe } from "@/lib/stripe";
import { CheckoutSession } from "@/components/checkout-session";

interface Props {
  searchParams: {
    session_id?: string;
    totalAmount?: number;
    itemsCount?: number;
  };
}

export default async function Page({ searchParams }: Props) {
  const { session_id, totalAmount = 0, itemsCount = 0 } = searchParams;

  // Get the user session
  const sessionUser = await getServerSession(authOptions);

  let customerDetails;

  // If user is not authenticated, get the customer details from Stripe
  if (!sessionUser) {
    if (session_id) {
      const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
      customerDetails = checkoutSession?.customer_details;
    }
  } else {
    customerDetails = sessionUser.user;
  }

  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {/* Checkout session */}
        <CheckoutSession totalAmount={totalAmount} itemsCount={itemsCount} customerDetails={customerDetails} />

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
          <a href="#" className="text-sm font-semibold">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}
