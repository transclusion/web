import React from 'react'
import {get} from 'segmented-property'
import styled from 'styled-components'
import {SEO, Spinner} from '../../components'
import {Link} from '../../history'
import {createShareImage} from '../../sanity'
import {useStore} from '../../store'
import Body from './Body'
import Excerpt from './Excerpt'

const Loader = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Root = styled.main`
  & > article {
    max-width: 40em;
    margin: 0 auto;
    color: #234;
  }

  & > article > div {
    padding: 1.5em;
    margin: 0 auto;

    & h2 {
      margin: 4rem 0 2rem;
    }

    & code {
      font-family: SF Mono, Menlo, monospace;
      font-size: 14px;
      background: #234;
      color: #def;
      padding: 2px;
      border-radius: 2px;
    }
  }
`

const Nav = styled.nav`
  margin-bottom: 1.5rem;
  line-height: 1.25;
  font-size: 15px;
  /* background: #fe0; */

  & > a {
    display: block;
    color: inherit;
    text-decoration: none;
    padding: 2rem 1.5rem;
    font-weight: bold;
    /* text-align: center; */

    &:hover {
      background: #f9f9f9;
    }
  }
`

const ArticleHeader = styled.header`
  position: relative;
  background: ${props => props.bg || '#f9f9f9'};
  color: ${props => props.fg || '#234'};
  border-radius: 2px;

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
    /* transition: opacity 250ms; */
    transform: translate3d(0, -100%, 0);
  }

  & > div:hover > div > div {
    /* opacity: 0; */
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

function Article ({slug}) {
  const [article] = useStore(`article/${slug}`, {})
  const [settings] = useStore(`settings`, {})
  if (article.error || settings.error) return <div>Error: {article.error || settings.error}</div>
  if (!article.data || !settings.data) {
    return (
      <Loader>
        <Spinner />
      </Loader>
    )
  }
  const headerRatio = get(article.data, 'metadata/headerRatio') || '1:1'
  const fg = get(article.data, 'metadata/fg/hex')
  const bg = get(article.data, 'metadata/bg/hex')
  const [w, h] = headerRatio.split(':').map(Number)
  const _seo = article.data.seo || {}
  const seo = {
    ..._seo,
    title: `${_seo.title || article.data.title} – ${settings.data.seo.title}`,
    url: `${settings.data.baseUrl}/article/${slug}`,
    image: createShareImage(_seo.image)
  }

  return (
    <Root>
      <SEO data={seo} defaults={settings.data.seo} />
      <Nav>
        <Link path='/'>{settings.data.title}</Link>
      </Nav>
      <article>
        <ArticleHeader w={w} h={h} fg={fg} bg={bg}>
          <div>
            <div>
              <div>
                <h1>{article.data.title}</h1>
                {/* <p>{article.data.publishedAt}</p> */}
                {article.data.excerpt && <Excerpt blocks={article.data.excerpt} />}
              </div>
            </div>
          </div>
        </ArticleHeader>
        <div>{article.data.body && <Body blocks={article.data.body} />}</div>
      </article>
    </Root>
  )
}

export default Article
