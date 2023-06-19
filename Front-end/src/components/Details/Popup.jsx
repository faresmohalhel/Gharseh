import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContext';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Popup = ({ toggle, setToggle }) => {
  const { user, setUser, userRefresh } = useContext(UserContext)
  const { id } = useParams()
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoadin] = useState(true)
  const [formData, setFormData] = useState({
    fullName: user.username,
    email: user.email,
    age: '',
    gender: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName) {
      errors.fullName = 'الاسم الكامل مطلوب';
    }

    if (!formData.age) {
      errors.age = 'العمر مطلوب';
    }

    if (!formData.email) {
      errors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'البريد الإلكتروني غير صالح';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
          setIsLoadin(false)
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios.post(
          `http://localhost:5501/api/Volunteer/${id}`,
          formData,
          config
        ).then((response) => {
          if(response.data.success){
            Swal.fire({
              icon: 'success',
              title:'تم التطوع بنجاح في هذه الفعالية',
              confirmButtonColor:'green'
            })
            setIsLoadin(true)
            setToggle(false)
            setErrors("");
          }else if(response.data.duplicated){
          Swal.fire({
            icon: 'warning',
            title:response.data.duplicated,
            confirmButtonColor:'green'
          }) 
          setIsLoadin(true);
          setToggle(false)
          setErrors("");
        }
        });

      } catch (error) {
        console.log('Error:', error.message);
      }
    } else {
      setErrors(errors);
    }
  };




  return (
    <>

      <>
        {toggle &&

          <div className="w-full flex items-center justify-center " dir='ltr'>
            <div
              className="overflow-x-hidden overflow-y-auto bg-gray-400/70 fixed h-modal md:h-full md:inset-0 z-50 justify-center items-center"
            >
              <div className="relative w-full max-w-md px-4 h-full md:h-auto">
                {/* Modal content */}
                <div className="bg-white rounded-lg shadow relative left-[35rem] top-20 dark:bg-gray-700">
                  <div className="flex justify-end p-2" dir='rtl'>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                      data-modal-toggle="authentication-modal"
                      onClick={() => setToggle(false)}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <form dir='rtl'
                    onSubmit={handleSubmit}
                    className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
                    action="#"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      تطوع الآن
                    </h3>
                    <div>
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                      >
                        الاسم الكامل
                      </label>
                      <input
                        value={formData.fullName}
                        type="text"
                        name="fullName"
                        onChange={handleChange}
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="ادخل اسمك الكامل"
                        required=""
                        disabled
                      />
                    </div>
                    <div className='w-full flex items-start  mr-2 justify-start'>{errors.fullName && <span className='text-red-600'>{errors.fullName}</span>}</div>
                    <div>
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                      >
                        البريد الإلكتروني
                      </label>
                      <input
                        value={formData.email}
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="البريد الإلكتروني"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required=""
                        disabled
                      />
                    </div>
                    <div className='w-full flex items-start  mr-2 justify-start'>{errors.email && <span className='text-red-600'>{errors.email}</span>}</div>
                    <div>
                      <label
                        htmlFor="age"
                        className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                      >
                        العمر
                      </label>
                      <input
                        type="number"
                        name="age"
                        id="age"
                        onChange={handleChange}
                        value={formData.age}

                        placeholder="العمر"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required=""
                      />
                    </div>
                    <div className='w-full flex items-start text-right mr-2  justify-start'>{errors.age && <span className='text-red-600'>{errors.age}</span>}</div>

                    <div>
                      <label
                        htmlFor="gender"
                        className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                      >
                        الجنس
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      >
                        <option value="none"></option>
                        <option value="female">ذكر</option>
                        <option value="male">أنثى</option>
                      </select>
                    </div>
                    {isLoading ?
                      <button
                        type="submit"
                        className="w-full text-white bg-green-500 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        تطوع معنا
                      </button>
                      : <button
                        type="submit"
                        className="w-full text-white bg-green-500 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        انتظر...
                      </button>}
                  </form>
                </div>
              </div>
            </div>
          </div>
        }
      </>






    </>

  )
}

export default Popup