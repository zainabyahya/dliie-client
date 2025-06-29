import React from "react";
import AccordionSidebar from "../components/AccordionSidebar";
import { Outlet } from "react-router-dom";
import { useGetAreasQuery, useGetCompetenciesQuery } from "../services/api";
import Loader from "../ui/Loader";
import ErrorState from "../ui/ErrorState";

const Learning = () => {
  const {
    data: areas = [],
    isLoading: aLoading,
    isError: aError,
  } = useGetAreasQuery();
  const {
    data: competencies = [],
    isLoading: cLoading,
    isError: cError,
  } = useGetCompetenciesQuery();

  if (aLoading || cLoading)
    return <Loader message="جاري تحميل البيانات التعليمية..." />;
  if (aError || cError) return <ErrorState message="فشل في جلب المحتوى ." />;

  const areasWithCompetencies = areas.map((area) => ({
    ...area,
    competencies: competencies.filter(
      (c) => c.area._id.toString() === area._id
    ),
  }));

  return (
    <div className="flex flex-col md:flex-row min-h-screen" dir="rtl">
      {/* Sidebar Column */}
      <div className="w-full md:w-1/4">
        <AccordionSidebar areas={areasWithCompetencies} />
      </div>
      {/* Main Content Column */}
      <div className="flex-1 p-4 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default Learning;
