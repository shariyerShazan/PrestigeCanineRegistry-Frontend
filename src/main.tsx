import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { Router } from './router/Router'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import ReduxStore from './redux/ReduxStore'
import {persistStore, type Persistor} from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react'
let persistor: Persistor = persistStore(ReduxStore)
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Provider store={ReduxStore}>
        <PersistGate loading={null} persistor={persistor}>
            <RouterProvider  router={Router}/>
            <ToastContainer />
        </PersistGate>
     </Provider>
  </StrictMode>,
)
