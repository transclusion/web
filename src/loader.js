import {groqLoader} from './loaders/groq'

// const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function getLoader (type) {
  switch (type) {
    case 'groq':
      return groqLoader
    default:
      throw new Error(`Unknown query: ${type}`)
  }
}

export function load (store, query) {
  const ref = store.ref(query.key)

  if (ref.get('data')) {
    // already loaded
    return Promise.resolve()
  }

  ref.set({isLoading: true})

  return (
    getLoader(query.type)
      .load(query)
      .then(data => ref.set({data}))
      // .then(data => delay(0).then(() => ref.set({data})))
      .catch(err => ref.set({error: err.message}))
  )
}

export function resolveLoaders (ref, queries) {
  return Promise.all(queries.map(l => load(ref, l)))
}
