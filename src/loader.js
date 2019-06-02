import {client} from './sanity'

// const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export function resolveLoader (store, loader) {
  const ref = store.ref(loader.key)

  if (ref.get('data')) {
    // already loaded
    return Promise.resolve()
  }

  ref.set({isLoading: true})

  return (
    client
      .fetch(loader.query, loader.params)
      .then(data => ref.set({data}))
      // .then(data => delay(0).then(() => ref.set({data})))
      .catch(err => ref.set({error: err.message}))
  )
}

export function resolveLoaders (ref, loaders) {
  return Promise.all(loaders.map(l => resolveLoader(ref, l)))
}
