import * as React from 'react'
import { Link, Outlet, ScrollRestoration, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const Route = createRootRoute({
  component: RootComponent,
})


// Create a client
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 5, retryDelay: 1000 } }
})

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      {/**    global header goes here */}
      <div className="p-2 flex gap-2 text-lg">
        <Link to="/" activeProps={{ className: 'font-bold', }} activeOptions={{ exact: true }}>
          Home
        </Link>{' '}
        <Link to="/users" activeProps={{ className: 'font-bold', }}>
          Users
        </Link>
        <Link to="/about" activeProps={{ className: 'font-bold', }}>
          About
        </Link>
      </div>
      <hr />
      <ScrollRestoration />
      <Outlet />  {/* This is where te body of the pages will be rendered */}
      {/**    global footer goes here */}
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools position="bottom-left" />
      </QueryClientProvider>
)}
