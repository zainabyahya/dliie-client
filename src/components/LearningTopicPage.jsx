import React from "react";
import { useParams } from "react-router-dom";
import { useGetModulesByCompetencyQuery } from "../services/api";
import Loader from "../ui/Loader";
import ErrorState from "../ui/ErrorState";
import EmptyState from "../ui/EmptyState";
const LearningTopicPage = () => {
  const { areaId, topic: compId } = useParams();

  const { data, isLoading, isError, error } =
    useGetModulesByCompetencyQuery(compId);

  const module = data?.modules?.[0];

  if (isLoading) {
    return <Loader message="جاري تحميل البيانات التعليمية..." />;
  }

  if (isError) {
    return <ErrorState message="فشل في جلب المحتوى ." />;
  }

  if (!module) {
    return <EmptyState message="لا توجد مواد تعليمية بعد." />;
  }

  return (
    <div className="p-4 bg-gray-50" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">المحتوى التعليمي</h1>

      <div className="mb-8 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">{module.title}</h2>

        {(module.sections || []).map((sec) => (
          <section key={sec._id} className="mb-6">
            <h2 className="text-xl font-medium mb-2">{sec.title}</h2>
            <div
              className="prose prose-rtl text-lg"
              dangerouslySetInnerHTML={{ __html: sec.html }}
            />
          </section>
        ))}
      </div>
    </div>
  );
};

export default LearningTopicPage;
