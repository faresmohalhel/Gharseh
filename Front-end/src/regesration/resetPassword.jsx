import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import '../regesration/style.css';
import { useParams } from 'react-router-dom';

export default function Login() {
    const { resetToken } = useParams();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const validateForm = () => {
        const errors = {};

        // Perform validation checks

        if (!formData.password) {
            errors.password = 'كلمة المرور مطلوبة';
        } else if (formData.password.length < 6) {
            errors.password = 'يجب أن تحتوي كلمة المرور على الأقل 6 أحرف';
        } else if (!/^[a-zA-Z0-9!@#$%^&*]+$/.test(formData.password)) {
            errors.password = 'يجب أن تحتوي كلمة المرور على أحرف إنجليزية وأرقام وحروف مميزة';
        } else if (!/\d/.test(formData.password)) {
            errors.password = 'يجب أن تحتوي كلمة المرور على رقم واحد على الأقل';
        } else if (!/[!@#$%^&*]/.test(formData.password)) {
            errors.password = 'يجب أن تحتوي كلمة المرور على حرف خاص واحد (!@#$%^&*) على الأقل';
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = 'يرجى تأكيد كلمة المرور';
        } else if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = 'كلمة المرور غير متطابقة';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            try {
                // Send the form data to the server
                const userData = {
                    password: formData.password,
                };
                const response = await axios.put(
                    `http://localhost:4009/api/resetPassword/${resetToken}`,
                    userData
                );
                console.log(response.data);
                setErrors({});
                setFormData({
                    password: '',
                    confirmPassword: ''
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
            <section className="h-screen">
                <div className="container h-full px-6 py-24">
                    <div className="mt-14 g-6 flex h-full flex-wrap items-center justify-center">
                        <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                            <div className='h-60 w-full flex items-end justify-end flex-col'>
                                <h1 className='text-4xl font-bold'>اعادة تعيين كلمة المرور</h1>
                                <div className='w-40 ml-28 mt-2 h-1 bg-gradient-to-r from-slate-700 to-green-300'></div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className='flex flex-col mt-6 w-full'>
                                    <div className="">
                                        <div className="flex items-center text-lg">
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                id="username"
                                                className="border-b-2 appearance-none text-right pr-10 border-black w-full py-2 px-4 outline-none text-gray-700 leading-tight focus:border-b-green-500"
                                                placeholder="كلمة المرور"
                                            />
                                            <svg className="absolute ml-[37rem] w-5 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 17c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm2-7v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10-4c0-2.206 1.795-4 4-4s4 1.794 4 4v4h-8v-4zm11 16h-14v-10h14v10z" /></svg>

                                        </div>
                                    </div>
                                    <div className='w-full flex items-end mr-2 justify-end'>
                                        {errors.password && (
                                            <span className='text-red-600'>{errors.password}</span>
                                        )}
                                    </div>
                                </div>
                                <div className='flex flex-col mt-6 w-full'>
                                    <div className="">
                                        <div className="flex items-center text-lg">
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                id="confirmPassword"
                                                className="border-b-2 appearance-none text-right pr-10 border-black w-full py-2 px-4 outline-none text-gray-700 leading-tight focus:border-b-green-500"
                                                placeholder="تأكيد كلمة المرور"
                                            />
                                            <svg className="absolute ml-[37rem] w-5 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 17c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm2-7v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10-4c0-2.206 1.795-4 4-4s4 1.794 4 4v4h-8v-4zm11 16h-14v-10h14v10z" /></svg>

                                        </div>
                                    </div>
                                    <div className='w-full flex items-end mr-2 justify-end'>
                                        {errors.confirmPassword && (
                                            <span className='text-red-600'>{errors.confirmPassword}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="mb-6 flex items-center justify-between mt-5">
                                    <Link
                                        to="/ForgotPassword"
                                        className="text-sm text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                    >
                                        رجوع
                                    </Link>
                                    <Link
                                        to="/Signup"
                                        className="text-sm text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                    >
                                        ليس لديك حساب؟
                                    </Link>
                                </div>
                                <button
                                    type="submit"
                                    className="box-border relative z-30 inline-flex items-center justify-center w-full px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-green-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-green-300 ring-offset-indigo-200 hover:ring-offset-green-500 ease focus:outline-none"
                                >
                                    <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                                    <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                                    <span className="relative z-20 flex items-center text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="relative  w-5 h-5 mr-2 text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><line x1="128" y1="232" x2="128" y2="88" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" /><line x1="128" y1="152" x2="80" y2="128" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" /><line x1="128" y1="128" x2="176" y2="104" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" /><path d="M132.5,181.2A64,64,0,1,0,194.7,69.9a8.6,8.6,0,0,1-4-4.2,68,68,0,0,0-125.4,0,8.6,8.6,0,0,1-4,4.2,64,64,0,1,0,62.2,111.3A8.2,8.2,0,0,1,132.5,181.2Z" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" /></svg>

                                        اعادة تعيين كلمة المرور
                                    </span>
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
