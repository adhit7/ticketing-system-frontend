import React, { useEffect, useState } from 'react';
import FormHeader from '../../components/FormHeader';
import ErrorBox from '../../components/ErrorBox';
import SuccessBox from '../../components/SuccessBox';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Link, useLocation } from 'react-router-dom';
import { useMentorForgotPasswordMutation } from '../../slices/mentorApiSlice';
import { setTempPasswordStatus } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';
import { useLearnerForgotPasswordMutation } from '../../slices/learnerApiSlice';

const ForgotPassword = () => {
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const [learnerForgotPassword] = useLearnerForgotPasswordMutation();

  const [mentorForgotPassword] = useMentorForgotPasswordMutation();

  const handleForgotPassword = async (formValues, resetForm) => {
    const { email } = formValues;
    setLoading(true);
    try {
      let res;
      if (role === 'learner') {
        res = await learnerForgotPassword({ email }).unwrap();
      } else if (role === 'mentor') {
        res = await mentorForgotPassword({ email }).unwrap();
      }
      setSuccessMessage(res?.message);
      dispatch(setTempPasswordStatus(false));
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
    }
  }, []);

  return (
    <div className='min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 m-auto  bg-gray-50'>
      <FormHeader>Forgot Password</FormHeader>
      {error && <ErrorBox message={error} />}
      <div className='sm:mx-auto sm:w-full mb-4 mt-4 sm:max-w-md rounded bg-white shadow shadow-md p-9'>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid email address')
              .required('Email is required'),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            await handleForgotPassword(values, resetForm);
            setSubmitting(false);
          }}
        >
          <Form>
            <Input label='Email' type='email' name='email' />
            <Button type='submit' label='Submit' loading={loading} />
          </Form>
        </Formik>

        <div className='text-sm text-center pt-6'>
          <Link
            to={
              pathname.startsWith('/mentor')
                ? '/mentor/login'
                : '/learner/login'
            }
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
