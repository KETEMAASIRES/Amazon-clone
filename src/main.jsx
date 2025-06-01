import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DataProvider } from "./component/DataProvider/DataProvider.jsx";
import { initialState, reducer } from "./Utility/Reducer";

createRoot(document.getElementById("root")).render(
  <DataProvider reducer={reducer} initialState={initialState}>
    <App />
  </DataProvider>
);
