import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import FormWrapper from "../ui/FormWrapper";
import {
  useGetMyProfileQuery,
  useUpdateUserInfoMutation,
  useDeleteAccountMutation,
} from "../services/api";
import { logout } from "../slices/authSlice";

import Loader from "../ui/Loader";
import ErrorState from "../ui/ErrorState";
import EmptyState from "../ui/EmptyState";

const Profile = () => {
  const dispatch = useDispatch();
  const { data: profile, isLoading, error } = useGetMyProfileQuery();
  const [updateUserInfo] = useUpdateUserInfoMutation();
  const [deleteAccount] = useDeleteAccountMutation();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDeleteAccount = async () => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm("هل أنت متأكد من حذف الحساب؟ لا يمكن التراجع عن هذا الإجراء.")
    ) {
      try {
        await deleteAccount().unwrap();
        dispatch(logout());
        window.location.href = "/";
      } catch (err) {
        alert("فشل في حذف الحساب");
        console.error(err);
      }
    }
  };

  if (isLoading) {
    return <Loader message="جاري تحميل البيانات الشخصية..." />;
  }

  if (error) {
    return <ErrorState message="فشل في جلب الملف ." />;
  }

  if (!profile) {
    return <EmptyState message="لا يوحد ملف شخصي بعد." />;
  }

  const {
    user: userInfo = {},
    assessmentScore = 0,
    currentLevel = "غير معروف",
    currentlyDoing = null,
  } = profile;

  const initialValues = {
    firstName: userInfo.firstName || "",
    lastName: userInfo.lastName || "",
    phoneNumber: userInfo.phoneNumber || "",
  };

  return (
    <div className="p-6 max-w-2xl mx-auto my-auto" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">الملف الشخصي</h1>

      <div className="bg-white rounded-md shadow-md p-6 space-y-4">
        <p>
          <span className="font-semibold">الاسم الأول:</span>{" "}
          {userInfo.firstName}
        </p>
        <p>
          <span className="font-semibold">الاسم الأخير:</span>{" "}
          {userInfo.lastName}
        </p>
        <p>
          <span className="font-semibold">رقم الهاتف:</span>{" "}
          {userInfo.phoneNumber}
        </p>
        <p>
          <span className="font-semibold">المستوى الحالي:</span> {currentLevel}
        </p>
        <p>
          <span className="font-semibold">نتيجة التقييم الأخيرة:</span>{" "}
          {assessmentScore}
        </p>
        <p>
          <span className="font-semibold">وحدة التعلم الحالية:</span>{" "}
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
          initialValues={initialValues}
          fields={[
            { name: "firstName", placeholder: "الاسم الأول" },
            { name: "lastName", placeholder: "الاسم الأخير" },
            { name: "phoneNumber", placeholder: "رقم الهاتف" },
          ]}
          buttonLabel="حفظ التغييرات"
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await updateUserInfo(values).unwrap();
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
