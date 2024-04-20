import React, { useState } from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { Form, Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/Button';
import TextArea from '../../components/TextArea';
import { useCreateQueryMutation } from '../../slices/learnerApiSlice';
import { toast } from 'react-toastify';

const Title = ({ children }) => (
  <h6 className='text-violet-900 font-semibold my-3'>{children}</h6>
);

const CreateQuery = () => {
  const categoryData = [
    {
      name: 'Zen-Class Doubt',
      subCategory: [
        {
          name: 'Task',
          tags: [
            'html',
            'css',
            'javascript',
            'react',
            'redux',
            'nodejs',
            'express',
            'mongodb',
            'sql',
          ],
        },
        {
          name: 'WebCode',
        },
        {
          name: 'Class Topic',
        },
        {
          name: 'Webkata',
        },
        {
          name: 'Codekata',
        },
        {
          name: 'Assessment',
        },
      ],
    },
    {
      name: 'Placement Related',
      subCategory: [
        {
          name: 'Company Info',
        },
        {
          name: 'Completion Certificate',
        },
        {
          name: 'Portfolio',
        },
      ],
    },
    {
      name: 'Coordination Related',
      subCategory: [
        {
          name: 'Session Timing',
        },
        {
          name: 'Session Joining Link',
        },
        {
          name: 'Session Feedback',
        },
        {
          name: 'Completion Certificate',
        },
        {
          name: 'Payment',
        },
      ],
    },
    {
      name: 'Pre-Bootcamp Related',
      subCategory: [
        {
          name: 'Session',
        },
        {
          name: 'Payment',
        },
        {
          name: 'CodeKata',
        },
        {
          name: 'WebKata',
        },
        {
          name: 'Task',
        },
        {
          name: 'Other',
        },
      ],
    },
  ];

  const [createQuery, { isLoading }] = useCreateQueryMutation();

  const handleQuery = async (formValues, resetForm) => {
    const {
      category,
      subCategory,
      tags,
      preferredLanguage,
      title,
      description,
      from,
      till,
    } = formValues;

    const queryValues = {
      category,
      subCategory,
      tags,
      preferredLanguage,
      title,
      description,
      availableTime: { from: from, till: till },
    };

    try {
      const res = await createQuery({ queryValues, role: 'learner' }).unwrap();
      toast.success(res?.message, { position: 'top-right' });
      resetForm();
    } catch (err) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
    }
  };

  return (
    <div className='h-full'>
      <Formik
        initialValues={{
          category: '',
          subCategory: '',
          tags: [],
          preferredLanguage: '',
          title: '',
          description: '',
          from: '09:00',
          till: '19:00',
        }}
        validationSchema={Yup.object({
          category: Yup.string()
            .required('Category is required')
            .notOneOf(['---Select Category---'], 'Category is required'),
          subCategory: Yup.string()
            .required('Sub Category is required')
            .notOneOf(
              ['---Select Sub-Category---'],
              'Sub Category is required'
            ),
          preferredLanguage: Yup.string()
            .required('Language is required')
            .notOneOf(['---Select Language---'], 'Language is required'),
          title: Yup.string().required('Query title is required'),
          description: Yup.string().required('Query Description is required'),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await handleQuery(values, resetForm);
          // const availableTime = {'from' :queryValues?.from,'till' :queryValues?.till}

          setSubmitting(false);
        }}
      >
        {({ values }) => (
          <Form>
            <div className='bg-white flex flex-col shadow-lg rounded-xl p-8 sm:mx-auto my-10 mx-5 lg:w-7/12 sm:w-10/12 w-full mb-5'>
              <Title>Topic</Title>

              <div className='md:w-2/5 self-center'>
                <Select
                  name='category'
                  label='Category'
                  listOfItems={categoryData.map((item) => item?.['name'])}
                  option='Category'
                />
                {values?.category !== '' &&
                  categoryData.find((item) => item?.name === values?.category)
                    ?.subCategory.length > 0 && (
                    <Select
                      label='Sub Category'
                      name='subCategory'
                      listOfItems={categoryData
                        .find((item) => item?.name === values?.category)
                        ?.subCategory?.map((item) => item?.['name'])}
                      option='Sub-Category'
                    />
                  )}
                {/* {values?.subCategory !== '' && values?.subCategory?.tags?.length > 0 &&
                  categoryData.find((item) => item?.name === values?.category)
                    ?.subCategory.length > 0 && (
                    <Select
                      label='Sub Category'
                      name='subCategory'
                      listOfItems={categoryData
                        .find((item) => item?.name === values?.category)
                        ?.subCategory?.map((item) => item?.['name'])}
                      option='Sub-Category'
                    />
                )} */}

                <Select
                  label='Preferred Language'
                  name='preferredLanguage'
                  listOfItems={['Tamil', 'English', 'Hindi']}
                  option='Language'
                />
              </div>
              <Title>Details</Title>
              <div className='md:w-2/5 self-center'>
                <Input type='text' name='title' label='Query Title' />
                <TextArea name='description' label='Query Description' />
              </div>
              <Title>Your available Time ? ( Ours : 9:00 AM - 7:00 PM )</Title>
              <div className='md:w-2/5 self-center'>
                <Input type='time' label='From' name='from' />
                <Input type='time' label='Till' name='till' />
              </div>
              <div className='flex justify-center'>
                <Button
                  type='submit'
                  label='Create Query'
                  loading={isLoading}
                  message='Creating'
                  classes={'md:w-1/6 my-2'}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateQuery;
