import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function InputField({
  label,
  type,
  name,
  id,
  value,
  placeholder,
  onChange,
  error,
}) {
  return (
    <div className="mb-4 sm:w-full lg:w-1/2">
      <label htmlFor={name} className="block text-lg font-medium">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-md border-2 border-gray-300 placeholder-gray-500 text-lg font-medium"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

function SelectField({ label, name, id, value, onChange, error }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-lg font-medium">
        {label}
      </label>
      <select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-md border-2 border-gray-300 placeholder-gray-500 text-lg font-medium"
      >
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    bloodGroup: "A+",
    state: "",
    city: "",
    phone: "",
    password: "",
    profile: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const file = type === "file" ? e.target.files[0] : null;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "file" ? file : value,
    }));
    setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `https://blood-savers-api.vercel.app/blood-savers/signup`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Successfully created an account", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/login");
      } else {
        console.error("Signup failed");
        toast.error("Error creating account");
      }
    } catch (error) {
      if (error.response) {
        setIsSubmitting(false);
        console.log(error.response);
        if (error.response.status === 400) {
          setErrors(error.response.data.errors);
          toast.error("Some fields are missing");
        } else if (error.response.status === 409) {
          toast.error("Account already created");
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error(error.response?.data?.message);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col justify-center items-center align-middle mt-10">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-4">Register</h2>
        <p className="text-center text-gray-600 text-lg font-medium mb-6">
          Join BloodSavers and help save lives
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:gap-4 lg:flex-row lg:gap-8">
            <InputField
              label="Full Name"
              type="text"
              name="name"
              id="name"
              placeholder="Enter full name"
              error={errors?.name}
              value={form.name}
              onChange={handleChange}
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              id="email"
              placeholder="johndoe@example.com"
              error={errors?.email}
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col md:flex-row md:gap-4 lg:flex-row lg:gap-8">
            <InputField
              label="Country"
              type="text"
              name="country"
              id="country"
              placeholder="USA"
              error={errors?.country}
              value={form.country}
              onChange={handleChange}
            />
            <SelectField
              label="Blood Group"
              name="bloodGroup"
              id="bloodGroup"
              error={errors?.bloodGroup}
              value={form.bloodGroup}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col md:flex-row md:gap-4 lg:flex-row lg:gap-8">
            <InputField
              label="State/Province"
              type="text"
              name="state"
              id="state"
              placeholder="California"
              error={errors?.state}
              value={form.state}
              onChange={handleChange}
            />
            <InputField
              label="City"
              type="text"
              name="city"
              id="city"
              placeholder="Los Angeles"
              error={errors?.city}
              value={form.city}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col md:flex-row md:gap-4 lg:flex-row lg:gap-8">
            <InputField
              label="Phone Number"
              type="tel"
              name="phone"
              id="phone"
              placeholder="+1 234 5678 90"
              error={errors?.phone}
              value={form.phone}
              onChange={handleChange}
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              id="password"
              error={errors?.password}
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="profile">
              <div className="flex items-center gap-2 cursor-pointer">
                <span className="text-2xl text-red-800">📷</span>
                <p className="text-red-800 text-lg font-medium">
                  Upload Profile Picture
                </p>
              </div>
            </label>
            <input
              type="file"
              name="profile"
              id="profile"
              accept="image/*"
              className="invisible"
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors?.profile && (
              <p className="text-red-500 text-sm">{errors?.profile}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-red-800 rounded-md py-2 text-white text-lg font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        <p className="text-center py-3">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
