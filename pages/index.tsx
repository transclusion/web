import {ArticlePreview, ArticlePreviewLink, AppHeader} from '~/components'
import {sanityClient} from '~/sanityClient'
import {Card, Container, Stack, Text} from '@transclusion/ui'
import groq from 'groq'
import {NextPage} from 'next'
import Head from 'next/head'
import React from 'react'

interface IndexPageProps {
  articles?: ArticlePreview[]
}

const PAGE_QUERY = groq`{
  'articles': *[_type == 'article' && defined(slug) && defined(publishedAt)] | order(publishedAt desc) {
    'key': _id,
    publishedAt,
    metadata,
    slug,
    title,
    excerpt
  }
}`

const IndexPage: NextPage<IndexPageProps> = (props) => {
  const {articles} = props

  if (!articles) return <Text>Loading...</Text>

  return (
    <>
      <Head>
        <title>Transclusion</title>
      </Head>

      <AppHeader />

      <Card padding={[4, 5]}>
        <Container maxWidth={2}>
          <Stack spacing={6}>
            {articles.map((article) => (
              <ArticlePreviewLink
                article={article}
                key={article.key}
                link={{
                  as: `/article/${article.slug.current}`,
                  href: '/article/[slug]',
                }}
              />
            ))}
          </Stack>
        </Container>
      </Card>
    </>
  )
}

IndexPage.getInitialProps = () => sanityClient.fetch(PAGE_QUERY)

export default IndexPage
