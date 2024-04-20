import React, { useEffect, useState } from 'react';
import FormHeader from '../../components/FormHeader';
import ErrorBox from '../../components/ErrorBox';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  useMentorNewPasswordMutation,
  useMentorTempPasswordMutation,
} from '../../slices/mentorApiSlice';
import { setCredentials, setTempPasswordStatus } from '../../slices/authSlice';
import { toast } from 'react-toastify';
import {
  useLearnerNewPasswordMutation,
  useLearnerTempPasswordMutation,
} from '../../slices/learnerApiSlice';

const NewPassword = () => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('');
  const { pathname } = useLocation();
  const [tempToken, setTempToken] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const [learnerTempPassword] = useLearnerTempPasswordMutation();
  const [learnerNewPassword] = useLearnerNewPasswordMutation();

  const [mentorTempPassword] = useMentorTempPasswordMutation();
  const [mentorNewPassword] = useMentorNewPasswordMutation();

  const { checkTempPassword } = useSelector((state) => state.auth);

  //Checks with the generated random string in db
  //then chenges the checkTempPassword to true where shows new password form
  const handleTempPassword = async (formvalues, resetForm) => {
    setLoading(true);
    setError('');
    const { tempToken } = formvalues;
    setTempToken(tempToken);
    try {
      let res;
      if (role === 'learner') {
        res = await learnerTempPassword({ tempToken }).unwrap();
      } else if (role === 'mentor') {
        res = await mentorTempPassword({ tempToken }).unwrap();
      }
      dispatch(setTempPasswordStatus(true));
      toast.success(res?.message, { position: 'top-right' });
      resetForm();
    } catch (err) {
      setError(err?.data?.message || err.error);
    } finally {
      setLoading(false);
    }
  };

  //Sets the new password
  const handleNewPassword = async (formvalues, resetForm) => {
    setLoading(true);
    setError('');
    const { password } = formvalues;
    try {
      let res;
      if (role === 'learner') {
        res = await learnerNewPassword({
          tempToken: tempToken,
          password,
        }).unwrap();
      } else if (role === 'mentor') {
        res = await mentorNewPassword({
          tempToken: tempToken,
          password,
        }).unwrap();
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
    }
  }, []);

  return (
    <div className='bg-gray-50 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 m-auto'>
      <FormHeader>Reset Password</FormHeader>
      <div className='sm:mx-auto sm:w-full mb-4 mt-4 sm:max-w-md rounded bg-white shadow shadow-md p-9'>
        {error && <ErrorBox message={error} />}

        <Formik
          initialValues={{
            tempToken: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={Yup.object(
            checkTempPassword
              ? {
                  password: Yup.string().required('New Password is required'),
                  confirmPassword: Yup.string()
                    .required('Confirm Password is required')
                    .oneOf(
                      [Yup.ref('password')],
                      'Your passwords do not match'
                    ),
                }
              : {
                  tempToken: Yup.string().required(
                    'Temporary Password is required'
                  ),
                }
          )}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (checkTempPassword) {
              await handleNewPassword(values, resetForm);
            } else {
              await handleTempPassword(values, resetForm);
            }
            setSubmitting(false);
          }}
        >
          <Form>
            {checkTempPassword ? (
              <>
                <Input label='New Password' type='password' name='password' />
                <Input
                  label='Confirm Password'
                  type='password'
                  name='confirmPassword'
                />
              </>
            ) : (
              <Input label='Temporary Password' type='text' name='tempToken' />
            )}

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

export default NewPassword;
