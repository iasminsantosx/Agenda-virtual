import { Route, Routes } from "react-router-dom";
import PageLogin from "@/pages/Login";
import Agenda from "@/pages/Agenda";
export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLogin />} />
      <Route path="/home" element={<Agenda />} />
    </Routes>
  );
};
