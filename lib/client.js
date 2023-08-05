import sanityClient from "@sanity/client";
import imagineUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "nkwtjpz0",
  dataset: "production",
  apiVersion: "2023-07-09",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imagineUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
