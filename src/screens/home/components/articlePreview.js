import BlockContent from '@sanity/block-content-to-react'
import {get} from 'segmented-property'
import React from 'react'
import styled from 'styled-components'
import {Link} from '../../../history'
import {useTheme} from '../../../theme'

const Preview = styled.li`
  position: relative;
  right: ${({offset}) => `${offset}px`};
  margin: 10em 0;

  & > div {
    padding-bottom: ${({w, h}) => `${(h / w) * 100}%`};
  }

  & > a {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-decoration: none;
    display: block;
    background: ${props => props.bg};
    color: ${props => props.fg};
  }

  & > a > div {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 2em 1.25em;
    /* transition: opacity 250ms; */
  }

  & > a:hover > div {
    /* opacity: 0; */
  }

  & h3 {
    font-family: SF Mono, Menlo, monospace;
    font-size: 2em;
    line-height: 1;
    margin: 0 0 0.25rem;
  }

  & p {
    margin: 0;
  }
`

export function ArticlePreview ({data, onRegister, time}) {
  const theme = useTheme()
  const publishedTime = Date.parse(data.publishedAt)
  const offset = (time - publishedTime) / 50000000
  const headerRatio = get(data, 'metadata/headerRatio') || '1:1'
  const fg = get(data, 'metadata/fg/hex') || theme.bg
  const bg = get(data, 'metadata/bg/hex') || theme.fg
  const [w, h] = headerRatio.split(':').map(Number)
  return (
    <Preview w={w} h={h} fg={fg} bg={bg} offset={Math.round(offset)}>
      <div ref={onRegister} />
      <Link path={data.slug && `/article/${data.slug.current}`}>
        <div>
          <h3>{data.title}</h3>
          {/* <p>{data.publishedAt}</p> */}
          {data.excerpt && <BlockContent blocks={data.excerpt} />}
        </div>
      </Link>
    </Preview>
  )
}
