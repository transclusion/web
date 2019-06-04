import DataLoader from 'dataloader'
import {client} from '../sanity'

function batchGroqQueries (queries) {
  const keys = queries.map((_, idx) => `q${idx}`)
  const query = `{${keys.map((k, idx) => `'${k}': ${queries[idx].query}`).join(',')}}`
  return client
    .fetch(query)
    .then(result => keys.map(k => result[k]))
    .catch(err => {
      console.log(err, err.request)
      const customErr = new Error('failed to load')
      customErr.service = 'groq'
      customErr.isNetworkError = err.isNetworkError
      return Promise.reject(customErr)
    })
}

export const groqLoader = new DataLoader(queries => batchGroqQueries(queries))
