import {groqLoader} from './loaders/groq'

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

  // Already loaded
  if (ref.get('data')) return Promise.resolve()

  ref.set({isLoading: true})

  return getLoader(query.type)
    .load(query)
    .then(data => ref.set({data}))
    .catch(err => ref.set({error: err.message}))
}

export function resolveLoaders (ref, queries) {
  return Promise.all(queries.map(l => load(ref, l)))
}
