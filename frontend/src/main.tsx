import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Page Imports
import Home from './pages/Home.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import ContentRoot from './pages/ContentRoot.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, 
        element: <Home />, 
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "data-science",
        element: <ContentRoot title="Data Science"  />,
      },
        {
        path: "data-structures",
        element: <ContentRoot title="Data Structures"  />, 
      },
        {
        path: "algorithm-design",
        element: <ContentRoot title="Algorithm Design" />, 
      },
        {
        path: "systems-programming",
        element: <ContentRoot title="Systems Programming"  />, 
      },
    ]
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)