import React, {useContext, useEffect, useState} from 'react'
import qs from 'qs'

export const HistoryContext = React.createContext(null)

export const HistoryProvider = ({children, source}) => {
  const [location, setLocation] = useState(source.location)
  useEffect(() => source.location$.subscribe(setLocation), ['history'])
  return (
    <HistoryContext.Provider value={{...location, ...source}}>{children}</HistoryContext.Provider>
  )
}

export function useHistory () {
  return useContext(HistoryContext)
}

export function Link ({children, path, query, ...props}) {
  const source = useHistory()
  if (!source) throw new Error('Missing history context')
  const url = path
  const onClick = evt => {
    evt.preventDefault()
    source.pushState(path, query)
  }
  return (
    <a {...props} href={url} onClick={onClick}>
      {children}
    </a>
  )
}

export function getHistoryStateFromWindow () {
  return {
    path: window.location.pathname,
    query: qs.parse(window.location.search.substr(1)),
    title: document.title
  }
}

export function createBrowserHistorySource () {
  const observers = []

  const pushState = (path, query = {}, title) => {
    const search = qs.stringify(query)
    const url = path + (search ? `?${search}` : '')
    window.history.pushState(null, title, url)
    source.location = {path, query, title}
    observers.forEach(fn => fn(source.location))
  }

  const replaceState = (path, query = {}, title) => {
    const search = qs.stringify(query)
    const url = path + (search ? `?${search}` : '')
    window.history.replaceState(null, title, url)
    source.location = {path, query, title}
    observers.forEach(fn => fn(source.location))
  }

  const _onPopState = () => {
    const path = window.location.pathname
    const query = {}
    const title = document.title
    source.location = {...source.location, path, query, title}
    observers.forEach(fn => fn(source.location))
  }

  const _listen = () => {
    if (observers.length) window.addEventListener('popstate', _onPopState)
  }

  const _unlisten = () => {
    if (!observers.length) window.removeEventListener('popstate', _onPopState)
  }

  const location$ = {
    subscribe (observer) {
      observers.push(observer)
      _listen()
      return () => {
        observers.splice(observers.indexOf(observer), 1)
        _unlisten()
      }
    }
  }

  const source = {
    location: getHistoryStateFromWindow(),
    location$,
    pushState,
    replaceState
  }

  return source
}

export function createServerHistorySource (location) {
  const location$ = {
    subscribe: () => void 0 // do nothing
  }

  return {
    location,
    location$,
    pushState: () => void 0,
    replaceState: () => void 0
  }
}
