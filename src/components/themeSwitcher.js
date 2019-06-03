import React from 'react'
import styled from 'styled-components'
import {useTheme} from '../theme'

const Root = styled.label`
  display: inline-block;

  & input {
    display: none;
  }

  & input + div {
    position: relative;
    width: 3rem;
    height: 1.5rem;
    background: ${({theme}) => theme.fg};
    border-radius: 0.75rem;
    box-shadow: 0 0 0 1px ${({theme}) => theme.fg};

    & > div {
      position: absolute;
      width: 1.5rem;
      height: 1.5rem;
      background: ${({theme}) => theme.bg};
      border-radius: 0.75rem;
      transition: transform 100ms;
      transform: translate3d(0, 0, 0);
    }
  }

  & input:checked + div > div {
    transform: translate3d(100%, 0, 0);
  }
`

export function ThemeSwitcher () {
  const {mode, setTheme, theme} = useTheme()
  const handleChange = evt => {
    setTheme(evt.target.checked ? 'dark' : 'light')
  }
  return (
    <Root theme={theme}>
      <input type='checkbox' onChange={handleChange} checked={mode === 'dark'} />
      <div>
        <div />
      </div>
    </Root>
  )
}
