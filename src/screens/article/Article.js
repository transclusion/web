import React from 'react'
import styled from 'styled-components'
import {SEO, Spinner} from '../../components'
import {Link} from '../../history'
import {createShareImage} from '../../sanity'
import {useStore} from '../../store'
import {Article} from './components/article'

const Loader = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Root = styled.main``

const Nav = styled.nav`
  margin-bottom: 1.5rem;
  line-height: 1.25;
  font-size: 15px;

  & > a {
    display: block;
    color: inherit;
    text-decoration: none;
    padding: 2rem 1.5rem;
    font-weight: bold;
  }
`

function ArticleScreen ({slug}) {
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
      <Article {...article} />
    </Root>
  )
}

export default ArticleScreen
