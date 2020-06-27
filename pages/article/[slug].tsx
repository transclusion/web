import {AppHeader, Article, ArticleBody} from '~/components'
import {sanityClient} from '~/sanityClient'
import {Card, Container, Heading, Stack, Text} from '@transclusion/ui'
import React from 'react'
import {NextPage} from 'next'
import Head from 'next/head'
import groq from 'groq'

interface ArticlePageProps {
  article?: Article
}

const PAGE_QUERY = groq`{
  'article': *[_type == 'article' && slug.current == $slug] {
    body,
    title
  }[0]
}`

const ArticlePage: NextPage<ArticlePageProps> = (props) => {
  const {article} = props

  if (!article) return <Text>Loading...</Text>

  return (
    <>
      <Head>
        <title>{article.title} – Transclusion</title>
      </Head>

      <AppHeader />

      <Card padding={[4, 5]}>
        <Container maxWidth={2}>
          <Stack spacing={5}>
            <Heading fontSize={[2, 3, 4]}>{article.title}</Heading>
            <ArticleBody blocks={article.body} />
          </Stack>
        </Container>
      </Card>
    </>
  )
}

ArticlePage.getInitialProps = ({query}) =>
  sanityClient.fetch(PAGE_QUERY, {
    slug: query.slug,
  })

export default ArticlePage
