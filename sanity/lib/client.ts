import {createClient} from '@sanity/client'
var token = process.env.NEXT_PUBLIC_SANITY_STUDIO_TOKEN
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production',
  token,
  apiVersion: '2023-05-12',
});

export default sanityClient;