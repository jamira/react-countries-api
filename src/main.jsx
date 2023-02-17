import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Country from './components/Country'
import { ThemeProvider } from './contexts/ThemeProvider'
import { CountryProvider } from './contexts/CountryProvider'
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CountryProvider>
          <App />
        </CountryProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
