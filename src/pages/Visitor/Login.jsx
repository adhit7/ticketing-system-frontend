import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setCredentials } from '../../slices/authSlice';

import * as Yup from 'yup';

import Button from '../../components/Button';
import ErrorBox from '../../components/ErrorBox';
import FormHeader from '../../components/FormHeader';
import Input from '../../components/Input';
import { useAdminLoginMutation } from '../../slices/adminApiSlice';
import { useLearnerLoginMutation } from '../../slices/learnerApiSlice';
import { useMentorLoginMutation } from '../../slices/mentorApiSlice';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const [adminLogin] = useAdminLoginMutation();

  const [learnerLogin] = useLearnerLoginMutation();

  const [mentorLogin] = useMentorLoginMutation();

  const handleLogin = async (formValues, resetForm) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pathname.startsWith('/learner')) {
      setRole('learner');
    } else if (pathname.startsWith('/mentor')) {
      setRole('mentor');
    } else if (pathname.startsWith('/admin')) {
      setRole('admin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='bg-gray-50 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <FormHeader>
        {role !== 'admin'
          ? role === 'mentor'
            ? 'Mentor'
            : 'Learner'
          : 'Admin'}{' '}
        Login
      </FormHeader>
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

                {role !== 'admin' && (
                  <div className='mt-6 flex items-start justify-between'>
                    <div className='text-sm'>
                      <Link
                        to={
                          role === 'mentor' ? '/learner/login' : '/mentor/login'
                        }
                        onClick={() =>
                          role === 'mentor'
                            ? setRole('learner')
                            : setRole('mentor')
                        }
                        className='font-medium text-indigo-600 hover:text-indigo-500'
                      >
                        {role === 'mentor'
                          ? 'Are you Learner?'
                          : 'Are you Mentor?'}
                      </Link>
                    </div>
                    <div className='text-sm'>
                      <Link
                        to={
                          role === 'mentor'
                            ? '/mentor/forgot-password'
                            : '/learner/forgot-password'
                        }
                        className='font-medium text-indigo-600 hover:text-indigo-500'
                      >
                        Forgot your password
                      </Link>
                    </div>
                  </div>
                )}
                <div className='mt-7'>
                  <Button
                    type='submit'
                    label='Login'
                    loading={loading}
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
