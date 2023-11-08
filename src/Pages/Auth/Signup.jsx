
import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'


function InputField({label, type, name, id, value, placeholder, onChange}) {
  return (
    <div className='inline-flex flex-col'>
      <label htmlFor={name} className="text-xl font-medium">{label}</label>
      <input type={type} name={name} id={id} value={value} placeholder={placeholder} onChange={onChange} className="w-[350px] px-6 h-[50px] rounded-[10px] border-2 border-neutral-400 placeholder:text-stone-400 placeholder:text-lg font-medium" />
    </div>
  )
}



function SelectField({label, name, id, value, onChange}) {
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
    </div>
  )
}


const Signup = ({onLogin}) => {
  const [formData, setFormData] = useState({fullName: '', email: '', country: '', bloodGroup: '', state: '', city: '', phone: '', password: ''});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if(formData.fullName !== '' && formData.email !== '' && formData.country !== '' && formData.bloodGroup !== '' && formData.state !== '' && formData.city !== '' && formData.phone !== '' && formData.password !== '') {
      onLogin();
      navigate('/home');
    } else {
      alert('Please fill all the fields');
    }
  }


  return (
    <>
    <div className="flex flex-col justify-center items-center align-middle mt-10">
      <div >
        <h2 className="text-[40px] font-bold text-center">Register</h2>
        <p className="text-center text-stone-400 text-lg font-medium py-6">Join BloodSavers help save lives</p>
        <form action="" className='flex flex-col gap-8' onSubmit={handleSubmit}>

          <div className='flex gap-6'>
              <InputField label="Full Name" type="text" name="fullName" id="fullName" placeholder='Enter full name' onChange={handleChange} />
              <InputField label="Email" type="email" name="email" id="email" placeholder='johndoe@example.com' onChange={handleChange}/>
          </div>

          <div className='flex gap-6'>
            <InputField label='Country' type='text' name='country' id='country' placeholder='USA' onChange={handleChange}/>
            <SelectField label='Blood Group' name='bloodGroup' id='bloodGroup' onChange={handleChange}/>
          </div>

          <div className='flex gap-6'>
            <InputField label='State/Province' type='text' name='state' id='state' placeholder='California' onChange={handleChange}/>
            <InputField label='City' type='text' name='city' id='city' placeholder='Los Angeles' onChange={handleChange}/>
          </div>

          <div className='flex gap-6'>
            <InputField label='Phone Number' type='tel' name='phone' id='phone' placeholder='+1 234 5678 90' onChange={handleChange}/>
            <InputField label='Password' type='password' name='password' id='password' onChange={handleChange}/>
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
