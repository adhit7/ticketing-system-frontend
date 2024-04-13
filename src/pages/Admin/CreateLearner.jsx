import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  useCreateBatchMutation,
  useCreateLearnerMutation,
  useCreateMentorMutation,
  useGetBatchesMutation,
} from '../../slices/adminApiSlice';
import { toast } from 'react-toastify';
import AdminInput from '../../components/AdminInput';
import OptionBox from '../../components/OptionBox';

const CreateLearner = () => {
  const [availableBatch, setAvailableBatch] = useState([]);

  const [getBatches] = useGetBatchesMutation();

  const [createLearner, { isLoading }] = useCreateLearnerMutation();

  const handleLearner = async (formValues, resetForm) => {
    const { firstName, lastName, email, batchName } = formValues;
    try {
      const res = await createLearner({
        firstName,
        lastName,
        email,
        batchName,
        role: 'admin',
      }).unwrap();
      toast.success(res?.message, { position: 'top-right' });
      resetForm();
    } catch (err) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
    }
  };

  const handleBatch = async () => {
    try {
      const res = await getBatches().unwrap();
      if (res?.batches) {
        const filterCourseNames = res?.batches?.map((item) => item?.courseName);
        setAvailableBatch(filterCourseNames);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
    }
  };

  useEffect(() => {
    if (availableBatch?.length === 0) {
      handleBatch();
    }
  }, []);

  return (
    <div className='bg-gray-50 flex justify-center'>
      <div className='bg-white flex flex-col shadow-lg rounded-xl p-10 sm:mx-auto my-10 mx-5 lg:w-8/12 sm:w-10/12 w-full'>
        <h1 className='text-2xl	text-violet-900 font-semibold self-center'>
          Create Learner
        </h1>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            batchName: '',
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            email: Yup.string().required('Email is required'),
            batchName: Yup.string().required('Batch is required'),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            await handleLearner(values, resetForm);
            setSubmitting(false);
          }}
        >
          <Form className='grid'>
            <AdminInput label='First Name' type='text' name='firstName' />
            <AdminInput label='Last Name' type='text' name='lastName' />
            <AdminInput label='Email' type='email' name='email' />

            {availableBatch?.length > 0 && (
              <OptionBox
                label='Batch'
                type='radio'
                name='batchName'
                listOfItems={availableBatch}
                info='Select only one batch'
                onlyOne={true}
              />
            )}

            <div className='flex justify-center'>
              <Button
                type='submit'
                label='Create'
                loading={isLoading}
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

export default CreateLearner;
