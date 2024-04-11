import React, { useState } from 'react';
import Button from '../components/Button';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useCreateBatchMutation } from '../slices/adminApiSlice';
import { toast } from 'react-toastify';
import AdminInput from '../components/AdminInput';
import CheckBox from '../components/CheckBox';

const CreateMentor = () => {
  const [availableBatch, setAvailableBatch] = useState([
    'First',
    'Second',
    'Third',
  ]);

  const handleMentor = async (formValues, resetForm) => {
    console.log('q', formValues);
    // const { courseName } = formValues;

    // try {
    //   const res = await createBatch({ courseName, role: 'admin' }).unwrap();

    //   toast.success(res?.message, { position: 'top-right' });
    //   resetForm();
    // } catch (err) {
    //   toast.error(err?.data?.message || err.error, { position: 'top-right' });
    // }
  };

  return (
    <div className='bg-gray-50 flex justify-center'>
      <div className='bg-white flex flex-col shadow-lg rounded-xl p-10 sm:mx-auto my-10 mx-5 lg:w-8/12 sm:w-10/12 w-full'>
        <h1 className='text-2xl	text-violet-900 font-semibold self-center'>
          Create Mentor
        </h1>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            batch: [],
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            email: Yup.string().required('Email is required'),
            batch: Yup.array()
              .min(1, 'Atleast one')
              .required('Select one or more batches is required'),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            await handleMentor(values, resetForm);
            setSubmitting(false);
          }}
        >
          <Form>
            <AdminInput label='First Name' type='text' name='firstName' />
            <AdminInput label='Last Name' type='text' name='lastName' />
            <AdminInput label='Email' type='email' name='email' />

            {availableBatch?.length > 0 && (
              <CheckBox
                label='Batch'
                type='checkbox'
                name='batch'
                listOfItems={availableBatch}
              />
            )}

            <div className='flex justify-center'>
              <Button
                type='submit'
                label='Create'
                // loading={isLoading}
                message='Creating'
                classes={'md:w-1/6 my-3'}
              />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateMentor;
