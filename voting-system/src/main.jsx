import { StrictMode } from 'react'
import { MantineProvider, createTheme } from '@mantine/core'
import { createRoot } from 'react-dom/client'
import Result from './Result.jsx'
import History from './History.jsx'
import Vote from './Vote.jsx'
import { AuthProvider } from './AuthContext.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import '@mantine/core/styles.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Result />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/vote",
    element: <Vote />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <RouterProvider router={router} />
      </MantineProvider>
    </AuthProvider>
  </StrictMode>,
)
