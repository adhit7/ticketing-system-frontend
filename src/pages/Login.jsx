import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setCredentials } from '../slices/authSlice';

import * as Yup from 'yup';

import Button from '../components/Button';
import ErrorBox from '../components/ErrorBox';
import FormHeader from '../components/FormHeader';
import Input from '../components/Input';
import { useAdminLoginMutation } from '../slices/adminApiSlice';
import { useLearnerLoginMutation } from '../slices/learnerApiSlice';
import { useMentorLoginMutation } from '../slices/mentorApiSlice';

const Login = () => {
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const [adminLogin] = useAdminLoginMutation();

  const [learnerLogin] = useLearnerLoginMutation();

  const [mentorLogin] = useMentorLoginMutation();

  // const [activateUser] = useActivateUserMutation();

  // const { activateUserStatus } = useSelector((state) => state.auth);

  // const activationHandler = async () => {
  //   try {
  //     const res = await activateUser({ userId: activateUserStatus }).unwrap();
  //     dispatch(setCredentials({ ...res }));
  //   } catch (err) {
  //     toast.error(
  //       'While activating your account, something went wrong. Please login again',
  //       { position: 'top-right' }
  //     );
  //   }
  // };

  const handleLogin = async (formValues, resetForm) => {
    setError('');
    const { email, password } = formValues;
    try {
      let res;
      if (role === 'admin') {
        res = await adminLogin({ email, password }).unwrap();
      } else if (role === 'learner') {
        res = await learnerLogin({ email, password }).unwrap();
      } else if (role === 'mentor') {
        res = await mentorLogin({ email, password }).unwrap();
      }
      dispatch(setCredentials({ ...res }));
      resetForm();
    } catch (err) {
      setError(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    // if (activateUserStatus !== '') {
    //   activationHandler();
    // }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    if (pathname === '/learner/login') {
      setRole('learner');
    } else if (pathname === '/mentor/login') {
      setRole('mentor');
    } else if (pathname === '/admin/login') {
      setRole('admin');
    }
  }, []);

  return (
    <div className='min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <FormHeader>Login to your account</FormHeader>
      {error && <ErrorBox message={error} />}
      <div className='sm:mx-auto sm:w-full sm:max-w-md rounded bg-white shadow shadow-md pt-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='py-8 pt-1 px-4 sm:px-10'>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email('Invalid email address')
                  .required('Email is required'),
                password: Yup.string().required('Password is required'),
              })}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                await handleLogin(values, resetForm);
                setSubmitting(false);
              }}
            >
              <Form>
                <Input label='Email' type='email' name='email' />
                <Input label='Password' type='password' name='password' />

                <div className='mt-6 flex items-start justify-between'>
                  <div className='flex items-center'>
                    <input
                      id='remember-me'
                      name='remember-me'
                      type='checkbox'
                      className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                    />
                    <label
                      htmlFor='remember-me'
                      className='ml-2 block text-sm text-gray-900'
                    >
                      Remember me
                    </label>
                  </div>
                  <div className='text-sm'>
                    <Link
                      to='/forgot-password'
                      className='font-medium text-indigo-600 hover:text-indigo-500'
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                <div className='mt-7'>
                  <Button
                    type='submit'
                    label='Login'
                    // loading={isLoading}
                    message='Logging in'
                  />
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
