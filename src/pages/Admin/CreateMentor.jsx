import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  useCreateMentorMutation,
  useGetBatchesMutation,
} from '../../slices/adminApiSlice';
import { toast } from 'react-toastify';
import Input from '../../components/Input';
import OptionBox from '../../components/OptionBox';

const CreateMentor = () => {
  const [availableBatch, setAvailableBatch] = useState([]);

  const [createMentor, { isLoading }] = useCreateMentorMutation();

  const [getBatches] = useGetBatchesMutation();

  const handleMentor = async (formValues, resetForm) => {
    const { firstName, lastName, email, batch } = formValues;
    try {
      const res = await createMentor({
        firstName,
        lastName,
        email,
        batches: batch,
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
      const res = await getBatches({ role: 'admin' }).unwrap();
      if (res?.batches) {
        const filterCourseNames = res?.batches
          ?.filter((item) => !item?.mentor && item)
          ?.map((item) => item?.courseName);
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
        <h1 className='text-2xl	text-indigo-600 font-semibold self-center mb-5'>
          Create Mentor
        </h1>

        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='py-8 pt-1 px-4 sm:px-10'>
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
                <Input label='First Name' type='text' name='firstName' />
                <Input label='Last Name' type='text' name='lastName' />
                <Input label='Email' type='email' name='email' />

                {availableBatch?.length > 0 && (
                  <OptionBox
                    label='Batch'
                    type='checkbox'
                    name='batch'
                    listOfItems={availableBatch}
                    info='Displays only batches with no mentor'
                  />
                )}

                <div className='flex justify-center mt-3'>
                  <Button
                    type='submit'
                    label='Create'
                    loading={isLoading}
                    message='Creating'
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

export default CreateMentor;
