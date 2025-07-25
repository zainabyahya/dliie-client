import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsList } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

const navLinks = [
  { label: "الصفحة الرئيسية", path: "/" },
  { label: "المكتبة", path: "/library" },
  { label: "التقييم", path: "/assessment" },
  { label: "وحدات التعلم", path: "/learning" },
  { label: "الديوان", path: "/community" },
];

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".dropdown-container")) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const renderAuthLinks = () => {
    if (isAuthenticated) {
      return (
        <>
          <span
            onClick={() => navigate("/profile")}
            className="block px-4 py-2 hover:bg-gray-200 cursor-pointer w-full text-right"
          >
            الملف الشخصي
          </span>
          <span
            onClick={logoutHandler}
            className="block px-4 py-2 hover:bg-gray-200 cursor-pointer w-full text-right"
          >
            تسجيل الخروج
          </span>
        </>
      );
    } else {
      return (
        <span
          onClick={() => navigate("/login")}
          className="block px-4 py-2 hover:bg-gray-200 cursor-pointer w-full text-right"
        >
          تسجيل الدخول
        </span>
      );
    }
  };

  return (
    <div className="w-full bg-tertiary p-5 text-lg flex flex-row justify-between items-center relative">
      {/* Website Name */}
      <div
        className="text-xl font-bold cursor-pointer px-5"
        onClick={() => navigate("/")}
      >
        ديجيتال ديوان
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden text-2xl cursor-pointer dropdown-container"
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen((prev) => !prev);
        }}
      >
        <BsList />
      </button>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden absolute z-10 top-16 left-0 flex flex-col items-end bg-white w-48 rounded-lg shadow-lg transition-all duration-300 ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        {navLinks.map(({ label, path }) => (
          <span
            key={path}
            onClick={() => {
              navigate(path);
              setMenuOpen(false);
            }}
            className="block px-4 py-2 hover:bg-gray-200 cursor-pointer w-full text-right"
          >
            {label}
          </span>
        ))}
        <hr className="w-full border-t border-gray-300 my-2" />
        {renderAuthLinks()}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex flex-row justify-between flex-1 gap-x-5">
        <div className="flex flex-row gap-5 items-center">
          {navLinks.map(({ label, path }) => (
            <span
              key={path}
              onClick={() => navigate(path)}
              className="cursor-pointer"
            >
              {label}
            </span>
          ))}
        </div>
        <div className="flex flex-row gap-5">
          {isAuthenticated ? (
            <>
              <span
                onClick={() => navigate("/profile")}
                className="block px-4 py-2 cursor-pointer"
              >
                الملف الشخصي
              </span>
              <span
                onClick={logoutHandler}
                className="block px-4 py-2 cursor-pointer"
              >
                تسجيل الخروج
              </span>
            </>
          ) : (
            <span
              onClick={() => navigate("/login")}
              className="block px-4 py-2 cursor-pointer"
            >
              تسجيل الدخول
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
