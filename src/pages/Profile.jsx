import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import FormWrapper from "../ui/FormWrapper";
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useDeleteAccountMutation,
} from "../services/api";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: profile, isLoading, error } = useGetMyProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [deleteAccount] = useDeleteAccountMutation();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDeleteAccount = async () => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm("هل أنت متأكد من حذف الحساب؟ لا يمكن التراجع عن هذا الإجراء.")
    ) {
      try {
        await deleteAccount().unwrap();
        window.location.href = "/";
      } catch (err) {
        alert("فشل في حذف الحساب");
        console.error(err);
      }
    }
  };

  if (isLoading) return <p className="p-6">جار التحميل...</p>;
  if (error || !profile)
    return <p className="p-6 text-red-600">فشل تحميل الملف الشخصي.</p>;

  const {
    user: userInfo = {},
    assessmentScore = 0,
    currentLevel = "غير معروف",
    currentlyDoing = null,
  } = profile;

  return (
    <div className="p-6 max-w-2xl mx-auto" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">الملف الشخصي</h1>

      <div className="bg-white rounded-md shadow-md p-6 space-y-4">
        <p>
          <span className="font-semibold">الاسم:</span> {userInfo.firstName}{" "}
          {userInfo.lastName}
        </p>
        <p>
          <span className="font-semibold">المستوى الحالي:</span> {currentLevel}
        </p>
        <p>
          <span className="font-semibold">النتيجة التقييمية:</span>{" "}
          {assessmentScore}
        </p>
        <p>
          <span className="font-semibold">الوحدة الحالية:</span>{" "}
          {currentlyDoing ? currentlyDoing.title : "لا يوجد"}
        </p>

        <div className="flex gap-4 mt-4">
          <Button
            label="تعديل المعلومات الشخصية"
            onPress={() => setIsEditOpen(true)}
          />
          <Button
            label="حذف الحساب"
            onPress={handleDeleteAccount}
            type="tertiary"
            color="red"
          />
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="تعديل الملف الشخصي"
      >
        <FormWrapper
          initialValues={{
            currentLevel,
            currentlyDoing: currentlyDoing ? currentlyDoing._id : "",
          }}
          fields={[
            { name: "currentLevel", placeholder: "المستوى الحالي" },
            { name: "currentlyDoing", placeholder: "المعرفة الحالية (ID)" },
          ]}
          buttonLabel="حفظ التغييرات"
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await updateProfile(values).unwrap();
              setIsEditOpen(false);
            } catch (err) {
              alert("فشل تعديل البيانات");
              console.error(err);
            } finally {
              setSubmitting(false);
            }
          }}
        />
      </Modal>
    </div>
  );
};

export default Profile;
