import { useState } from 'react';
import { toast } from 'react-toastify';
import { IoIosClose } from 'react-icons/io';

const Modal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.phone.length < 10) {
      toast.error('Please enter a valid phone number');
    } else {
      toast.success('Alert sent successfully');
      onClose(); // Close the modal after successful submission
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-4 text-black">Emergency Alert System</h2>
        <p className="mb-4 text-gray-400 text-sm">Notify your contact in case of an emergency</p>
        <form onSubmit={handleSubmit}>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter contact's phone number"
            className="w-full mb-4 p-2 border rounded"
          />
          <button className="bg-red-800 text-white py-2 px-4 rounded" type="submit">
            Send Alert
          </button>
          <div className="absolute right-0 top-0 cursor-pointer mt-2 mr-2">
          <IoIosClose onClick={onClose} size={50} className='text-black' />
        </div>
        </form>

      </div>
    </div>
  );
};

export default Modal;
