import {useState, useEffect} from 'react'
import Hero from './Hero'
import { toast } from 'react-toastify'

function InputField({label, type, name, id, value, placeholder, onChange, error, checked}) {
  return (
    <div className='inline-flex flex-col gap-2'>
      <label htmlFor={name} className="text-xl font-medium">{label}</label>
      <input type={type} name={name} id={id} value={value} placeholder={placeholder} onChange={onChange}
      checked={checked}
       className="w-full px-6 h-[50px] rounded-[10px] border-2 border-neutral-400 placeholder:text-stone-400 placeholder:text-lg font-medium" />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

const Donate = () => {

  const [formData, setFormData] = useState({
    "name": "",
    "email": "",
    "bloodQuantity": "",
    "yes":true,
    "no": false
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)


  const handleChange = (e) => {
    const value = e.target.type === 'radio' ? e.target.name === 'yes' : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(validate(formData))
    setIsSubmitting(true)
  }



  const validate = (values) => {
    let errors = {}

    if(!values.name) {
      errors.name = "Name is required"
    }

    if(!values.email) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid"
    }

    if(!values.bloodQuantity) {
      errors.bloodQuantity = "Blood quantity is required"
    } else if (values.bloodQuantity < 450) {
      errors.bloodQuantity = "Blood quantity must be greater than 450"
    }

    if (!values.yes && !values.no) {
      errors.yes = "Please select an option";
    }

    if(Object.keys(errors).length === 0) {
      toast.success("Form submitted successfully")
    } else {
      toast.error("Please fill all the fields correctly")
    }
    return errors

  }

  useEffect(() => {
    if (isSubmitting) {
      const validationErrors = validate(formData);
      setErrors(validationErrors);
    }
  }, [isSubmitting, formData]);



  return (
    <div>
      <Hero />
      <form action="" className='flex flex-col gap-4 w-1/2 justify-center mx-auto my-20' onSubmit={handleSubmit}>
          <InputField label='Name' type='text' name='name' id='name' onChange={handleChange} value={formData.name} error={errors.name} placeholder='John Doe' />
          <InputField label='Email' type='email' name='email' id='email' onChange={handleChange} value={formData.email} error={errors.email} placeholder='johndoe@example.com' />

        <div className='inline-flex justify-between'>
          <InputField label='Blood quantity' type='number' name='bloodQuantity' id='bloodQuantity' onChange={handleChange} error={errors.bloodQuantity} value={formData.bloodQuantity} placeholder='450' />
          <div className='inline-flex flex-col'>
            <label htmlFor="frequency">First time donating?</label>
            <div className='inline-flex justify-between'>
              <InputField label='Yes' type='radio' name='yes' id='yes' onChange={handleChange} error={errors.yes} value={formData.yes} checked={formData.yes} />
              <InputField label='No' type='radio' name='no' id='no' onChange={handleChange} error={errors.no} value={formData.no} checked={!formData.yes} />
            </div>
          </div>
        </div>
        <button className="px-6 py-3 w-1/3 mx-auto text-lg bg-rose-700 text-white rounded-lg transition hover:duration-500 ease-in-out hover:bg-white hover:text-rose-400 hover:border hover:border-rose-700">
          Donate blood
        </button>
      </form>
    </div>
  )
}

export default Donate
