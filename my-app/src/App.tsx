
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import './scss/style.css'
// src/index.js hoặc src/App.js
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useRoutes } from 'react-router-dom';
import List from './pages/List';
import AddProduct from './pages/Add';
import EditProduct from './pages/Edit';
import 'react-toastify/dist/ReactToastify.css';
  const routesConfig = [
    {
      path:"/",
      element:<List/>
    },
    {
      path:"/add",
      element:<AddProduct/>
    },
    {
      path:"/edit/:id",
      element:<EditProduct/>
    },

  ]
function App() {
    const routes = useRoutes(routesConfig);
    return <main>
      {routes}
      <ToastContainer autoClose={3000} newestOnTop={true}/>
    </main>;
   

}
export default App;



