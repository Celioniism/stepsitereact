import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Mainpage from "./MainPage/Mainpage";
import ErrorPage from "./Error/ErrorPage";

const AdminComponent = React.lazy(() => import("../Admin/AdminComponent"));
const ReadTheLastStepComponent = React.lazy(() =>
  import("../pages/ReadPage/ReadTheLastStepComponent")
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/Home" element={<Mainpage />} />
        <Route path="/Admin" element={<AdminComponent />} />

        <Route
          path="/Read/TheLastStep"
          element={<ReadTheLastStepComponent />}
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>{" "}
    </Suspense>
  );
};

export default AppRoutes;
