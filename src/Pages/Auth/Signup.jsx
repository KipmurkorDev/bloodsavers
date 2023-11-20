import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
function RadioField({ label, name, id, value, options, onChange, error }) {
  return (
    <div className="mb-2">
      <label className="block text-xs font-semibold">{label}</label>
      <div className="flex gap-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={`${id}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="mr-1"
            />
            <label htmlFor={`${id}-${option.value}`}>{option.label}</label>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

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
    <div className="mb-2 lg:w-1/2">
      <label htmlFor={name} className="block text-xs font-semibold mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-2 py-1 rounded-md border-2 border-gray-300 placeholder-gray-500 text-sm font-medium"
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

function SelectField({ label, name, id, value, onChange, error }) {
  return (
    <div className="mb-2 lg:w-1/2">
      <label htmlFor={name} className="block text-xs font-semibold">
        {label}
      </label>
      <select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-2 py-1 rounded-md border-2 border-gray-300 placeholder-gray-500 text-sm font-medium"
      >
        <option value="A+" class="text-black">
          A+
        </option>
        <option value="A-" class="text-black">
          A-
        </option>
        <option value="B+" class="text-black">
          B+
        </option>
        <option value="B-" class="text-black">
          B-
        </option>
        <option value="AB+" class="text-black">
          AB+
        </option>
        <option value="AB-" class="text-black">
          AB-
        </option>
        <option value="O+" class="text-black">
          O+
        </option>
        <option value="O-" class="text-black">
          O-
        </option>
      </select>
      {error && <p className="text-red-500 text-xs">{error}</p>}
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
    userType: "donor",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_APP_API_URL;

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
    <div className="flex flex-col justify-center items-center align-middle mt-8">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-5">
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

          <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-5">
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

          <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-5">
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
          <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-5 lg:items-center">
            <div className="lg:w-1/2">
              <RadioField
                label="User Type"
                name="userType"
                id="userType"
                value={form.userType}
                options={[
                  { label: "Donor", value: "donor" },
                  { label: "Recipient", value: "recipient" },
                ]}
                onChange={handleChange}
                error={errors?.userType}
              />
            </div>
            <div className="lg:w-1/2">
              <label htmlFor="profile" className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <p className="text-black text-lg font-medium lg:ml-3">
                    Profile
                  </p>
                  <span className="text-2xl text-red-800">
                    <FontAwesomeIcon icon={faImage} />
                  </span>
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
                <p className="text-red-500 text-xs mt-1">{errors?.profile}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-5">
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

          <div className="ml-24">
            <button
              type="submit"
              className="w-1/3 md:w-1/2 bg-red-800 rounded-md py-1 text-white text-sm font-medium mx-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        <p className="text-center py-2 text-xs">
          Already have an account?
          <Link to="/login" className="text-blue-400 pl-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
