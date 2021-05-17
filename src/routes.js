import Dashboard from "views/Dashboard.js";
import Datos from "views/forms/Datos.js";
import Login from "views/pages/Login.js";

const routes = [
  {
    path: "/dashboard",
    name: "Panel",
    icon: "nc-icon nc-bulb-63",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/datos",
    name: "Estudiante",
    mini: "E",
    icon: "nc-icon nc-single-02",
    component: Datos,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Cerrar sesion",
    icon: "nc-icon nc-circle-10",
    component: Login,
    layout: "/auth",
  },
];

export default routes;