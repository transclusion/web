import createSanityClient, {ClientConfig} from '@sanity/client'

const __DEV__ = process.env.NODE_ENV === 'development'

const config: ClientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
  useCdn: false,
  useProjectHostname: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  ignoreBrowserTokenWarning: __DEV__,
}

export const sanityClient = createSanityClient(config)
