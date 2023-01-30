import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "virtual:svg-icons-register";
import router from "./router/router";

import "./index.less";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
