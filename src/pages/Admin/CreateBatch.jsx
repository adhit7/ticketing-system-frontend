import React from 'react';
import Button from '../../components/Button';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useCreateBatchMutation } from '../../slices/adminApiSlice';
import { toast } from 'react-toastify';
import Input from '../../components/Input';

const CreateBatch = () => {
  const [createBatch, { isLoading }] = useCreateBatchMutation();

  const handleBatch = async (formValues, resetForm) => {
    const { courseName } = formValues;

    try {
      const res = await createBatch({ courseName, role: 'admin' }).unwrap();

      toast.success(res?.message, { position: 'top-right' });
      resetForm();
    } catch (err) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
    }
  };

  return (
    <div className='bg-gray-50 flex justify-center'>
      <div className='bg-white flex flex-col shadow-lg rounded-xl p-10 sm:mx-auto my-10 mx-5 lg:w-8/12 sm:w-10/12 w-full'>
        <h1 className='text-2xl	text-indigo-600 font-semibold self-center mb-5'>
          Create Batch
        </h1>

        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='py-8 pt-1 px-4 sm:px-10'>
            <Formik
              initialValues={{
                courseName: '',
              }}
              validationSchema={Yup.object({
                courseName: Yup.string().required('Course name is required'),
              })}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                await handleBatch(values, resetForm);
                setSubmitting(false);
              }}
            >
              <Form>
                <Input
                  label='Course Name'
                  type='courseName'
                  name='courseName'
                  placeholder='Enter unique name for the course'
                />
                <div className='flex justify-center'>
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

export default CreateBatch;
