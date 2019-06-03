import React, {useState} from 'react'
import styled from 'styled-components'
import {SEO, Spinner} from '../../components'
import {createShareImage} from '../../sanity'
import {useStore} from '../../store'
import {ArticleList} from './components/articleList'

const Loader = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Root = styled.main`
  overflow: hidden;

  & > header {
    font-size: calc(15 / 16 * 1rem);
    line-height: 1.25;
    padding: 2rem 1.5rem 0;

    & h1 {
      font-size: inherit;
      margin: 0 0 0.25rem;
    }

    & p {
      margin: 0;
    }
  }

  & > div {
    margin: 0 auto;
    max-width: 40em;
  }
`

function Home () {
  const [time] = useState(Date.now())
  const [articles] = useStore('articles', {})
  const [settings] = useStore('settings', {})
  const error = articles.error || settings.error
  if (error) return <div>Error: {error}</div>
  if (!articles.data || !settings.data) {
    return (
      <Loader>
        <Spinner />
      </Loader>
    )
  }
  const seo = {
    ...(settings.data.seo || {}),
    url: `${settings.data.baseUrl}/`,
    image: createShareImage(settings.data.seo.image)
  }

  return (
    <Root>
      <SEO data={seo} />
      <header>
        <h1>{settings.data.title}</h1>
        <p>{settings.data.description}</p>
      </header>
      {articles.data.length > 0 && (
        <div>
          <ArticleList items={articles.data || []} time={time} />
        </div>
      )}
      {/* articles.data.length === 0 && <div>Nothing to see here.</div> */}
    </Root>
  )
}

export default Home
