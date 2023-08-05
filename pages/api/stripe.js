import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51Nb5j6SBxdCjd8em5y3DXVlYA1zorq83st39fTe70jtspDTLsGVW7aRVEl1PyZBiRg6B6dDAMjOxTx6n52YHLP8N00CR8OILgr"
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const params = {
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          {
            shipping_rate: "shr_1Nbh4PSBxdCjd8emXACzIEN5",
          },
          {
            shipping_rate: "shr_1Nbh5cSBxdCjd8emFY0O66xR",
          },
        ],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "http://cdn.sanity.io/images/nkwtjpz0/production/"
            )
            .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        mode: "payment",
        success_url: `${req.headers.origin}/success=true`,
        cancel_url: `${req.headers.origin}/canceled=true`,
      };
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
