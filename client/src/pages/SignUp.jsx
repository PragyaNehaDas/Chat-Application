import React, { useState } from "react";
import GenderCheckbox from "../components/GenderCheckbox";
import { Link } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";

const SignUp = () => {
  const [formData, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignUp();

  const handleCheckboxChange = (gender) => {
    setFormdata({ ...formData, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(formData);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className=" w-full p-6 rounded-lg shadow-md bg-gray-200">
        <h1 className="text-3xl font-semibold text-center text-slate-700">
          Sign Up to
          <span className="text-blue-700"> Chat Application</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-400">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="enter username"
              className="w-full input input-bordered h-10"
              value={formData.username}
              onChange={(e) =>
                setFormdata({ ...formData, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-400">Email</span>
            </label>
            <input
              type="email"
              placeholder="enter email"
              className="w-full input input-bordered h-10"
              value={formData.email}
              onChange={(e) =>
                setFormdata({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-400">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="enter password"
              className="w-full input input-bordered h-10"
              value={formData.password}
              onChange={(e) =>
                setFormdata({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-400">
                confirmPassword
              </span>
            </label>
            <input
              type="password"
              placeholder="enter confirm password"
              className="w-full input input-bordered h-10"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormdata({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>

          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={formData.gender}
          />

          <Link
            to={"/login"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-gray-400"
          >
            Already have an account?
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-2 bg-blue-700 font-bold text-white" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : ("Sign Up")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
