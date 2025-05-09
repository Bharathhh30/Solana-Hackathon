import React from 'react'
import { createBrowserRouter ,RouterProvider} from 'react-router-dom';
import SpotlightPreview from './components/SpotLightUsage';
import Tipping from './Pages/Tipping';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SpotlightPreview />,
  },
  {
    path: "/tipping",
    element: <Tipping />,
  },
 
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App