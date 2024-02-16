import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Mainpage from "./Mainpage";
import ErrorPage from "./ErrorPage";

const AdminComponent = React.lazy(() => import("../Admin/AdminComponent"));
const ReadComponent = React.lazy(() => import("../pages/ReadComponent"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/Home" element={<Mainpage />} />
      <Route path="/Admin" element={<AdminComponent />} />
      <Route path="/Read" element={<ReadComponent />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
