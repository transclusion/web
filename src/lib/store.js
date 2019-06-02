import {get, set} from 'segmented-property'

function joinPath (...segments) {
  return segments.filter(Boolean).join('/')
}

function createRef (store, refKey) {
  return {
    get: (key, defaultValue) => store.get(joinPath(refKey, key), defaultValue),
    key: refKey,
    ref: key => store.ref(joinPath(refKey, key)),
    set: (...args) => {
      const key = args.length === 2 ? args[0] : null
      const value = args.length === 2 ? args[1] : args[0]
      store.set(joinPath(refKey, key), value)
    },
    subscribe: observer => store.subscribe(refKey, observer),
    store,
    update: fn => store.update(refKey, fn)
  }
}

export function createStore (opts = {}) {
  const {initialState, onChange} = opts
  const observers = {}
  let state = initialState || {}
  let prevState
  const _notifyObservers = keyArray => {
    const key = keyArray.join('/')
    if (observers[key]) {
      const prevValue = key === '.' ? prevState : get(prevState, key)
      const currValue = key === '.' ? state : get(state, key)
      if (prevValue !== currValue) observers[key].forEach(observer => observer(currValue))
    }
    keyArray.pop()
    if (keyArray.length) _notifyObservers(keyArray)
    else if (key !== '.') _notifyObservers(['.'])
    return store
  }
  const _get = (key, defaultValue) => {
    const val = get(state, key)
    return val === undefined ? defaultValue : val
  }
  const _set = (key, value) => {
    prevState = state
    state = set(state, key || null, value)
    _notifyObservers(key ? key.split('/') : ['.'])
    if (onChange && prevState !== state) onChange(key, value)
  }
  const ref = key => createRef(store, key)
  const subscribe = (_key, observer) => {
    const key = _key || '.'
    if (!observers[key]) observers[key] = []
    observers[key].push(observer)
    return () => {
      observers[key].splice(observers[key].indexOf(observer), 1)
    }
  }
  const update = (key, fn) => _set(key, fn(_get(key)))
  const store = {get: _get, ref, set: _set, subscribe, update}
  return store
}
