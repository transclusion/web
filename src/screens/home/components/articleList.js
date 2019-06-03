import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {ArticlePreview} from './articlePreview'

const Root = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  transition: transform 500ms;
`

export function ArticleList ({items, time}) {
  const rootElm = useRef(null)
  const [focusedTime, setFocusedTime] = useState(time)
  const offset = (time - focusedTime) / 50000000
  let io
  let elms = []

  useEffect(() => {
    const opts = {
      root: document.querySelector('#scrollArea'),
      rootMargin: '0px',
      threshold: [0.5, 1.0]
    }
    io = new window.IntersectionObserver(entries => {
      entries.forEach(e => {
        if (rootElm.current) {
          const index = Array.from(rootElm.current.childNodes).indexOf(e.target.parentNode)
          if (e.intersectionRatio > 0.5) {
            setFocusedTime(
              items[index].publishedAt ? Date.parse(items[index].publishedAt) : Date.now()
            )
          }
        }
      })
    }, opts)
    if (elms.length) {
      elms.forEach(elm => io.observe(elm))
      elms = []
    }
  }, ['articleList', time])

  const register = elm => {
    if (elm) {
      if (io) {
        io.observe(elm)
      } else {
        elms.push(elm)
      }
    }
  }

  return (
    <Root
      ref={rootElm}
      style={{
        transform: `translate3d(${Math.round(offset)}px, 0, 0)`
      }}
    >
      {items.map(d => (
        <ArticlePreview data={d} key={d.key} onRegister={register} time={time} />
      ))}
    </Root>
  )
}
