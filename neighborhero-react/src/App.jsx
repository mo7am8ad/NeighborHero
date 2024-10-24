import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { Layout } from './Router';
import './App.css';

function App() {
//catch our fetch data we use 
  return (
    <div className="App">
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;
