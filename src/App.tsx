import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createOvermind } from "overmind";
import { Provider } from "overmind-react";
import { Outlet, useNavigation } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";

import { __dev__ } from "./constants";
import { config } from "./store";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Panel from "./components/templates/panel/Panel";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();
const overmind = createOvermind(config, {
  devtools: __dev__,
});

const App = () => {
  const navigation = useNavigation();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider value={overmind}>
        <div className="App">
          <ToastContainer />
          <Panel>
            {navigation.state === "loading" ? (
              <div className="gen-template__loader">
                <SyncOutlined spin />
              </div>
            ) : (
              <Outlet />
            )}
          </Panel>
        </div>
        {/* <ReactQueryDevtools /> */}
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
