import React, {useEffect} from 'react'
import {useHistory} from './history'
import {resolveLoaders} from './loader'
import screens from './screens'
import {useRef} from './store'

export function matchRoute ({path, query}) {
  switch (true) {
    case path === '/':
      return {name: 'home', params: {}}
    case path.startsWith('/article/'):
      return {
        name: 'article',
        params: {slug: path.substr(9).split('/')[0]}
      }
    default:
      return {name: 'notFound', params: {path}}
  }
}

export function App () {
  const ref = useRef()
  const route = matchRoute(useHistory().location)
  const {Component, load} = screens[route.name]
  useEffect(() => {
    if (load) resolveLoaders(ref, load(route.params))
  }, [route.name])
  return <Component {...route.params} />
}

export default App
