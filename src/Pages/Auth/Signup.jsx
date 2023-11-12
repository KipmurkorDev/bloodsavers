
import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FaCamera} from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'react-toastify';




function InputField({label, type, name, id, value, placeholder, onChange, error}) {
  return (
    <div className='inline-flex flex-col sm:w-full lg:w-1/2'>
      <label htmlFor={name} className="text-xl font-medium">{label}</label>
      <input type={type} name={name} id={id} value={value} placeholder={placeholder} onChange={onChange} className="w-[350px] px-6 h-[50px] rounded-[10px] border-2 border-neutral-400 placeholder:text-stone-400 placeholder:text-lg font-medium" />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}



function SelectField({label, name, id, value, onChange, error}) {
  return (
    <div className='inline-flex flex-col'>
      <label htmlFor={name} className="text-xl font-medium">{label}</label>
      <select name={name} id={id} value={value} onChange={onChange} className="w-[350px] px-6 h-[50px] rounded-[10px] border-2 border-neutral-400 placeholder:text-stone-400 placeholder:text-lg font-medium">
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}


const Signup = ({onLogin}) => {

  const [form, setForm] = useState({
    name: '',
    email: '',
    country: '',
    bloodGroup: '',
    state: '',
    city: '',
    phone: '',
    password: '',
    profile: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;


  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const file = type === "file" && e.target.files ? e.target.files[0] : null;
    setForm((prevForm) => ({ ...prevForm, [name]: type === "file" ? file : value }));
    setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      const response = await axios.post(`${baseUrl}/blood-savers/signup/`, form, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      if (response.status === 201) {
        toast.success("Successfully created an account", { position: toast.POSITION.TOP_RIGHT });
        navigate('/signup');
      } else {
        console.error("Signup failed");
        toast.error("Error creating account");
      }
    } catch (error) {
      if (error.response) {
        setIsSubmitting(false);
        if (error.response.status === 400) {
          setErrors(error.response.data.errors);
          toast.error("Some fields are missing");
        } else if (error.response.status === 409) {
          toast.error("Account already created");
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error(error.response.data.message);
      }
      setIsSubmitting(false);
    }
  };

  // const handleCameraClick = () => {
  //   document.getElementById('profile').click();
  // }


  return (
    <>
    <div className="flex flex-col justify-center items-center align-middle mt-10">
      <div >
        <h2 className="text-[40px] font-bold text-center">Register</h2>
        <p className="text-center text-stone-400 text-lg font-medium py-6">Join BloodSavers help save lives</p>
        <form action="" className='flex flex-col gap-8 sm:items-center' onSubmit={handleSubmit}>

          <div className='flex gap-6 sm:flex-col sm:gap-4 md:flex-col lg:flex-row lg:gap-8'>
              <InputField label="Full Name" type="text" name="name" id="name" placeholder='Enter full name' error={errors.name} onChange={handleChange} />
              <InputField label="Email" type="email" name="email" id="email" placeholder='johndoe@example.com' onChange={handleChange}/>
          </div>

          <div className='flex gap-6 sm:flex-col sm:gap-4 lg:flex-row lg:gap-8'>
            <InputField label='Country' type='text' name='country' id='country' placeholder='USA' error={errors.country} onChange={handleChange}/>
            <SelectField label='Blood Group' name='bloodGroup' id='bloodGroup' error={errors.bloodGroup} onChange={handleChange}/>
          </div>

          <div className='flex gap-6 sm:flex-col sm:gap-4 lg:flex-row lg:gap-8'>
            <InputField label='State/Province' type='text' name='state' id='state' placeholder='California' error={errors.state} onChange={handleChange}/>
            <InputField label='City' type='text' name='city' id='city' placeholder='Los Angeles' error={errors.city} onChange={handleChange}/>
          </div>

          <div className='flex gap-6 sm:flex-col sm:gap-4 lg:flex-row lg:gap-8'>
            <InputField label='Phone Number' type='tel' name='phone' id='phone' placeholder='+1 234 5678 90' error={errors.phone} onChange={handleChange}/>
            <InputField label='Password' type='password' name='password' id='password' error={errors.password} onChange={handleChange}/>
          </div>

          <div>
            <label htmlFor="profile">
              <div className="inline-flex gap-2 items-center justify-center  cursor-pointer">
                <FaCamera className="text-[30px] text-red-800" />
                <p className="text-red-800 text-lg font-medium">Upload Profile Picture</p>
              </div>
            </label>
            <input type="file" name="profile" id="profile" accept="image/*" className="invisible" onChange={handleChange} disabled={isSubmitting} />
            {errors.profile && <p className="text-red-500 text-sm">{errors.profile}</p>}
          </div>

          <div className="inline-flex items-center justify-center">
              <button type="submit" className="bg-red-800 rounded-[15px] h-[2.7em] w-[200px] mx-auto text-white text-lg font-medium">Register</button>
            </div>

        </form>

        <p className="py-3">
            Already have an account? <Link to='/login'><span className="text-blue-400">Login</span></Link>
          </p>
      </div>
      </div>
    </>
  )
}

export default Signup
