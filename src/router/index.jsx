import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import { SignIn, SignUp, Products, Workers, Category, SinglPage ,Product} from "@pages";
import { Drawer } from "@ui";
const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/*" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="drawer/*" element={<Drawer />}>
          <Route index element={<Category />} />
          <Route path="products" element={<Products />}>
          <Route index element={<Product />}/>
            <Route path="singl-page/:id" element={<SinglPage />} />
          </Route>
          <Route path="workers" element={<Workers />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Index;
