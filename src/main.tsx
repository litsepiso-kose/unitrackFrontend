import React from 'react'
import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { CircularProgress } from '@mui/joy'
import store from './redux/store.ts'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <React.StrictMode>
    <Suspense fallback={<CircularProgress />}>
      <App />
    </Suspense>
  </React.StrictMode>
  </Provider>,
)
