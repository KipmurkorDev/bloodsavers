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
      <div className="flex flex-col">
        <h2 className="text-[40px] font-bold text-center">Login</h2>
        <p className="text-center text-stone-400 text-lg font-medium py-6">
          Welcome back to BloodSaver
        </p>
        <form
          action=""
          className="inline-flex flex-col gap-6 w-[500px]"
          onSubmit={handleSubmit}
        >
          <div className="inline-flex flex-col gap-2">
            <label htmlFor="email" className="text-xl font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="johndoe@example.com"
              className="w-full px-6 h-[50px] rounded-[10px] border-2 border-neutral-400 placeholder:text-stone-400 placeholder:text-lg font-medium"
              disabled={isSubmitting}
            />
            {error.email && (
              <p className="text-red-500 text-sm">{error?.email}</p>
            )}
          </div>

          <div className="inline-flex flex-col gap-2">
            <label htmlFor="password" className="text-xl font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=""
              className="w-full px-6 h-[50px] rounded-[10px] border-2 border-neutral-400 placeholder:text-stone-400 placeholder:text-lg font-medium"
              disabled={isSubmitting}
            />
            {error.password && (
              <p className="text-red-500 text-sm">{error?.password}</p>
            )}
          </div>

          <div className="inline-flex items-center justify-center">
            <button
              type="submit"
              className="bg-red-800 rounded-[15px] h-[2.7em] w-[200px] mx-auto text-white text-lg font-medium"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <p className="py-3">
          New here?{" "}
          <Link to="/signup">
            <span className="text-blue-400">Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
