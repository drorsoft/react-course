import { Route } from "react-router";
import { BrowserRouter, Routes } from "react-router";
import { App } from "../App";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="try" element={<div>This is my try route</div>} />
      </Routes>
    </BrowserRouter>
  );
};
