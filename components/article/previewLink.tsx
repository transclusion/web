import {Box, Heading, Stack, Text} from '@transclusion/ui'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import {ArticleExcerpt} from './excerpt'
import {ArticlePreview} from './types'

interface ArticlePreviewLinkProps {
  article: ArticlePreview
  link: {
    as: string
    href: string
  }
}

const Root = styled(Box)`
  display: block;
  text-decoration: inherit;
  color: inherit;
`

export function ArticlePreviewLink(props: ArticlePreviewLinkProps) {
  const {article, link} = props

  return (
    <Link as={link.as} href={link.href} passHref>
      <Root as="a">
        <Stack spacing={3}>
          <Heading size={2}>{article.title}</Heading>
          <Text size={0}>{article.publishedAt}</Text>
          <ArticleExcerpt blocks={article.excerpt} />
        </Stack>
      </Root>
    </Link>
  )
}
