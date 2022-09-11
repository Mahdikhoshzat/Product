import React, { useContext } from 'react'

import Products from './components/Products/Products'
import Auth from './components/Auth'
import { AuthContext } from './context/auth-context'
import useDarkMode from './hooks/dark-mode'

import './App.css'

const App = (props) => {
  const [theme, toggleTheme] = useDarkMode()

  const authContext = useContext(AuthContext)

  let content = <Auth />

  if (authContext.isAuth) {
    content = (
      <div
        className="app"
        style={{
          background: theme === 'dark' ? '#212121' : '#ffffff',
          color: theme === 'dark' ? '#ffffff' : '#212121',
          transition: '.2s all',
          textAlign: 'center',
        }}
      >
        <Products />
        <button type="button" onClick={toggleTheme}>
          تغیر تم
        </button>
      </div>
    )
  }

  return content
}

export default App
