import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({});

  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError({}); // Reset error state

    try {
      const response = await axios.post(
        `${baseUrl}/blood-savers/login`,
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
      if (error.response) {
        setIsSubmitting(false);
        if (error.response.status === 404) {
          toast.error("User not registered");
        } else if (error.response.status === 401) {
          toast.error("Wrong Credentials");
        } else if (error.response.status === 400) {
          setError(error.response.data.errors); // Show backend errors
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
    <div className="flex flex-col justify-center items-center align-middle mt-10">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
        <p className="text-center text-gray-600 text-lg font-medium mb-6">
          Welcome back to BloodSaver
        </p>
        <form onSubmit={handleSubmit} className='mx-10 sm:mx-0'>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="johndoe@example.com"
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 placeholder-gray-500 text-lg font-medium"
              disabled={isSubmitting}
            />
            {error.email && (
              <p className="text-red-500 text-sm">{error?.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-lg font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=""
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 placeholder-gray-500 text-lg font-medium"
              disabled={isSubmitting}
            />
            {error.password && (
              <p className="text-red-500 text-sm">{error?.password}</p>
            )}
          </div>

          <div className="my-6">
            <button
              type="submit"
              className="w-full bg-red-800 rounded-md py-2 text-white text-lg font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <p className="text-center">
          New here?{" "}
          <Link to="/signup" className="text-blue-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
