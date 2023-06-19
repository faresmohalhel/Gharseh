import { Link, useNavigate} from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import '../regesration/style.css';
import Hero from '../assets/hero.png'
import { AuthContext } from "../Context/AuthContext";
import { UserContext } from "../Context/UserContext";


export default function Login() {

    let { auth, setAuth, refresh } = useContext(AuthContext);
    let { user, setUser, userRefresh } = useContext(UserContext);

    const Navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
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

        if (!formData.email) {
            errors.password = 'البريد الإلكتروني مطلوب';
        }else if (!formData.password) {
            errors.password = 'كلمة المرور مطلوبة';
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
                    email: formData.email,
                    password: formData.password

                };
                const response = await axios.post(
                    'http://localhost:5501/api/Login',
                    userData
                );
                localStorage.setItem('token', response.data.jwttoken);
                setAuth(true);
                userRefresh()
                refresh()
                Navigate('/');
                setErrors('');
                setFormData({
                    email: '',
                    password: '',
                });
            } catch (error) {
                console.log('Error:', error.message);
                setErrors({password:'البريد الإلكتروني او كلمة السر غير صحيحة '})
            }
        } else {
            setErrors(errors);
        }
    };
    return (
        <>
            <section className="h-screen hero "  dir="ltr">
                <div className="container h-full px-6 py-24">
                    <div
                        className="pl-60 mt-14 g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">

                        <div className=" md:mb-0 md:w-6/12 lg:w-6/12">
                            <img
                                src={Hero}
                                className="w-full"
                                alt="Phone image" />
                        </div>


                        <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                            <div className='h-44 w-full flex items-center justify-center flex-col'><h1 className='text-4xl font-bold   '>تسجيل دخول</h1> <div className='w-16 ml-28 mt-2 h-1 bg-gradient-to-r  from-slate-700 to-green-300'></div></div>
                            <form onSubmit={handleSubmit}>

                                <div className='flex flex-col mt-6 w-full'>
                                    <div className="   ">
                                    </div>
                                    <div className="flex items-center text-lg  ">
                                        <input type="email" name="email"
                                            value={formData.email}
                                            onChange={handleChange} id="username" className="border-b-2 appearance-none  text-right pr-10 border-black  w-full py-2 px-4 outline-none text-gray-700 leading-tight   focus:border-b-green-500" placeholder="البريد الاكتروني" />
                                        <svg className="absolute ml-[30rem] w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z" /></svg>
                                    </div>
                                   
                                </div>

                                <div className='flex flex-col mt-6 w-full'>
                                    <div className="   ">
                                        <div className="flex items-center text-lg ">
                                            <input type="password" name="password"
                                                value={formData.password}
                                                onChange={handleChange} id="username" className="border-b-2 appearance-none  text-right pr-10 border-black  w-full py-2 px-4 outline-none text-gray-700 leading-tight   focus:border-b-green-500" placeholder="كلمة المرور  " />
                                            <svg className="absolute ml-[30rem] w-5 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 17c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm2-7v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10-4c0-2.206 1.795-4 4-4s4 1.794 4 4v4h-8v-4zm11 16h-14v-10h14v10z" /></svg>
                                        </div>
                                    </div>
                                    <div className='w-full flex items-end  mt-2 mr-2 justify-end'>{errors.password && <span className='text-red-600'>{errors.password}</span>}</div>
                                </div>
                                <div className="mb-6 flex items-center justify-between mt-5">



                                    <Link
                                        to="/ForgotPassword"
                                        className=" text-sm text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                    >هل نسيت كلمة السر؟</Link>
                                    <Link
                                        to="/Signup"
                                        className=" text-sm text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                    >ليس لديك حساب؟</Link>
                                </div>

                                <button type="submit" className="box-border relative z-30 inline-flex items-center justify-center w-full px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-green-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-green-300 ring-offset-indigo-200 hover:ring-offset-green-500 ease focus:outline-none">
                                    <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                                    <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                                    <span className="relative z-20 flex items-center text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="relative  w-5 h-5 mr-2 text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><line x1="128" y1="232" x2="128" y2="88" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><line x1="128" y1="152" x2="80" y2="128" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><line x1="128" y1="128" x2="176" y2="104" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><path d="M132.5,181.2A64,64,0,1,0,194.7,69.9a8.6,8.6,0,0,1-4-4.2,68,68,0,0,0-125.4,0,8.6,8.6,0,0,1-4,4.2,64,64,0,1,0,62.2,111.3A8.2,8.2,0,0,1,132.5,181.2Z" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /></svg>

                                        تسجيل دخول
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}
