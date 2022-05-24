/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Clients from "layouts/clients";
import Address from "layouts/address"
import Employees from "layouts/employees";
import Products from "layouts/products";
import Sections from "layouts/sections";
import Departments from "layouts/departments";
import Sales from "layouts/sales";
// import Billing from "layouts/billing";
// import Profile from "layouts/profile";

//Forms
import FormClient from "forms/clients";
import FormEditClient from "forms/clients/editClient"
import FormEditAddress from "forms/address";
import FormEmployee from "forms/employees";
import FormEditEmployee from "forms/employees/editEmployee";
import FormProduct from "forms/products";
import FormEditProduct from "forms/products/editProduct";
import FormSale from "forms/sales";
import FormEditSale from "forms/sales/editSale";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  // {
  //   type: "collapse",
  //   name: "Página inicial",
  //   key: "dashboard",
  //   icon: <Icon fontSize="small">dashboard</Icon>,
  //   route: "/dashboard",
  //   component: <Dashboard />,
  // },
  {
    type:"collapse",
    name: "Clientes",
    icon: <Icon fontSize="small">table_view</Icon>,
    key:"allClients",
    route: "/clients",
    component: <Clients />,
  },
  {
    type:"collapse",
    name: "Novo cliente",
    icon: <Icon fontSize="small">table_view</Icon>,
    key:"newClient",
    route: "/clients/create",
    component: <FormClient />,
  },
  {
    key:"editClient",
    route: "/clients/edit/:id",
    component: <FormEditClient />,
  },
  {
    type: "collapse",
    name: "Endereços",
    key: "address",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/address",
    component: <Address />,
  },
  {
    key:"editAddress",
    route: "/address/edit/:id",
    component: <FormEditAddress />,
  },
  {
    type: "collapse",
    name: "Produtos",
    key: "products",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/products",
    component: <Products />,
  },
  {
    type:"collapse",
    name: "Novo produto",
    icon: <Icon fontSize="small">table_view</Icon>,
    key:"newProduct",
    route: "/products/create",
    component: <FormProduct />,
  },
  {
    key:"editProduct",
    route: "/products/edit/:id",
    component: <FormEditProduct />,
  },
  {
    type: "collapse",
    name: "Seções",
    key: "sections",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/sections",
    component: <Sections />,
  },
  {
    type: "collapse",
    name: "Vendas",
    key: "sales",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/sales",
    component: <Sales />,
  },
  {
    type:"collapse",
    name: "Nova venda",
    icon: <Icon fontSize="small">table_view</Icon>,
    key:"newSale",
    route: "/sales/create",
    component: <FormSale />,
  },

  {
    key:"editSale",
    route: "/sales/edit/:id",
    component: <FormEditSale />,
  },
  {
    type: "collapse",
    name: "Colaboradores",
    key: "employees",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/employees",
    component: <Employees />,
  },
  {
    type:"collapse",
    name: "Novo colaborador",
    icon: <Icon fontSize="small">table_view</Icon>,
    key:"newEmployee",
    route: "/employees/create",
    component: <FormEmployee />,
  },
  {
    key:"editEmployee",
    route: "/employees/edit/:id",
    component: <FormEditEmployee />,
  },
  {
    type: "collapse",
    name: "Departamentos",
    key: "departments",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/departments",
    component: <Departments />,
  },
  // {
  //   type: "collapse",
  //   name: "Cartões",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  
];

export default routes;
