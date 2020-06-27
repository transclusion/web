import {Card, Code, Container, Heading, Stack} from '@transclusion/ui'
import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const Root = styled(Card)`
  border-bottom: 1px solid #ccc;
`

const StyledLink = styled.a`
  color: inherit;
`

export function AppHeader() {
  return (
    <Root padding={[4, 5]}>
      <Container maxWidth={2}>
        <Stack spacing={2}>
          <Heading size={1}>
            <Link href="/" passHref>
              <StyledLink>Marius Lundgård</StyledLink>
            </Link>
          </Heading>
          <Code size={1}>Tinkerings of a UI freak</Code>
        </Stack>
      </Container>
    </Root>
  )
}
