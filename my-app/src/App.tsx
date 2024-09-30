
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useRoutes } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import PurchaseMater from './pages/PurchasePlan/PurchasePlanMaster/PurchasePlanMaster';
import PurchasePlanDetailsAdd from './pages/PurchasePlan/PurchasePlanDetails/PurchasePlanDetailsAdd';
import PurchasePlanDetailsEdit from './pages/PurchasePlan/PurchasePlanDetails/PurchasePlanDetailsEdit';
  const routesConfig = [
    {
      path:"/",
      element:<PurchaseMater/>
    },
    {
      path:"/add",
      element:<PurchasePlanDetailsAdd/>
    },
    {
      path:"/edit/:id",
      element:<PurchasePlanDetailsEdit/>
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



