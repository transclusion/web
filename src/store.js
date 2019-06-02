import React, {useContext, useEffect, useState} from 'react'

export const StoreContext = React.createContext(null)

export const StoreProvider = ({children, store}) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export function useStore (key, defaultValue) {
  const ref = useContext(StoreContext).ref(key)
  const [state, setState] = useState(ref.get(null, defaultValue))
  const update = fn => () => ref.update(fn)
  useEffect(() => ref.subscribe(setState), [key])
  return [state, update]
}

export function useRef (key) {
  return useContext(StoreContext).ref(key)
}
