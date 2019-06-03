import React from 'react'
import {get} from 'segmented-property'
import styled from 'styled-components'
import {useTheme} from '../../../theme'
import {Body} from './body'
import {Excerpt} from './excerpt'

const Root = styled.article`
  max-width: 40em;
  margin: 0 auto;

  & > div {
    padding: 1.5em;
    margin: 0 auto;

    & h2 {
      margin: 4rem 0 2rem;
    }

    & code {
      font-family: SF Mono, Menlo, monospace;
      font-size: 14px;
      background: ${({theme}) => theme.code.bg};
      color: ${({theme}) => theme.code.fg};
      padding: 2px;
    }

    & a {
      color: ${({theme}) => theme.link.fg};
      text-decoration: none;

      @media (hover: hover) {
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`

const ArticleHeader = styled.header`
  position: relative;
  background: ${props => props.bg};
  color: ${props => props.fg};

  & > div {
    padding-bottom: ${({w, h}) => `${(h / w) * 100}%`};
  }

  & > div > div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
  }

  & > div > div > div {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: 2em 1.25em;
    transform: translate3d(0, -100%, 0);
  }

  & h1 {
    font-family: SF Mono, Menlo, monospace;
    font-size: 2em;
    line-height: 1;
    margin: 0 0 0.25rem;
  }

  & p {
    margin: 0;
  }
`

export function Article ({data}) {
  const theme = useTheme()
  const fg = get(data, 'metadata/fg/hex') || theme.bg
  const bg = get(data, 'metadata/bg/hex') || theme.fg
  const headerRatio = get(data, 'metadata/headerRatio') || '1:1'
  const [w, h] = headerRatio.split(':').map(Number)

  return (
    <Root theme={theme}>
      <ArticleHeader w={w} h={h} fg={fg} bg={bg}>
        <div>
          <div>
            <div>
              <h1>{data.title}</h1>
              {/* <p>{data.publishedAt}</p> */}
              {data.excerpt && <Excerpt blocks={data.excerpt} />}
            </div>
          </div>
        </div>
      </ArticleHeader>
      <div>{data.body && <Body blocks={data.body} />}</div>
    </Root>
  )
}
