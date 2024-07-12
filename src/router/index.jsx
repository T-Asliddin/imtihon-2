import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import { SignIn, SignUp , Products, Workers, Category} from "@pages";
import { Drawer } from "@ui";
const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/*" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="drawer/*" element={<Drawer />}>
        <Route index element={<Category/>} />
        <Route path="products" element={<Products/>} />
        <Route path="workers" element={<Workers/>} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Index;
