
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './config/route';
import 'reset-css';

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
