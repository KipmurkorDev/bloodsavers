import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({});

  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError({});

    try {
      const response = await axios.post(
        `https://blood-savers-api.vercel.app/blood-savers/login`,
        formData
      );

      if (response.status === 200) {
        toast.success("Login successful!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        setIsSubmitting(false);
        if (error.response.status === 404) {
          toast.error("User not registered");
        } else if (error.response.status === 401) {
          toast.error("Wrong Credentials");
        } else if (error.response.status === 400) {
          setError(error.response.data.errors);
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" });
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
        <p className="text-center text-gray-600 text-lg font-medium mb-6">
          Welcome back to BloodSaver
        </p>
        <form onSubmit={handleSubmit} className="mx-10 sm:mx-0">
          <div className="mb-4">
            <label htmlFor="email" className="block text-xs font-bold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="johndoe@example.com"
              className="w-2/3 px-3 py-2 rounded-md border-2 border-gray-300 placeholder-gray-500 text-xs font-medium"
              disabled={isSubmitting}
            />
            {error.email && (
              <p className="text-red-500 text-xs mt-1">{error?.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-xs font-bold mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=""
              className="w-2/3 px-3 py-2 rounded-md border-2 border-gray-300 placeholder-gray-500 text-xs font-medium"
              disabled={isSubmitting}
            />
            {error.password && (
              <p className="text-red-500 text-xs mt-1">{error?.password}</p>
            )}
          </div>
          <div className="ml-16">
            <button
              type="submit"
              className="w-1/3 md:w-1/2 bg-red-800 rounded-md py-1 text-white text-sm font-medium mx-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <p className="ml-24 py-1 text-xs">
          New here?
          <Link to="/signup" className="text-blue-400 pl-1">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
