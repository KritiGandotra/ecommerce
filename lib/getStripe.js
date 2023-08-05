import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51Nb5j6SBxdCjd8embSlIfrTi0Lk5KV2O4MjtMeMa4vm1kc4sJgtJnXlo5uqKYvkw50EoH51iDTn4iFCz5GNs2Hmy00IPRx5yLa"
    );
  }

  return stripePromise;
};

export default getStripe;
