import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import store from './stores/store'
import { Provider } from 'react-redux'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-cyan/theme.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
