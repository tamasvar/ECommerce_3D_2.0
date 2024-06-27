import { createClient } from 'next-sanity';
import { useCdn,apiVersion } from "../env"

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn,
  token: process.env.SANITY_STUDIO_TOKEN,
  apiVersion,
});

export default sanityClient;