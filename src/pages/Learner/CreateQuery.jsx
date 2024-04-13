import React, { useState } from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { Form, Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/Button';
import TextArea from '../../components/TextArea';

const Title = ({ children }) => (
  <h6 className='text-violet-900 font-semibold mb-3'>{children}</h6>
);

const CreateQuery = () => {
  const [categoryValues, setCategoryValues] = useState({
    subCategory: '',
    tags: [],
  });
  const categoryData = [
    {
      name: 'Zen-Class Doubt',
      subCategory: [
        {
          id: 1,
          name: 'Task',
        },
        {
          id: 2,
          name: 'Hackathon',
        },
        {
          id: 3,
          name: 'Class Topic',
        },
      ],
    },
    {
      name: 'Placement Related',
      subCategory: [],
    },
    {
      name: 'Coordination Related',
      subCategory: [
        {
          id: 1,
          name: 'Session Timing',
        },
        {
          id: 2,
          name: 'Session Joining Link',
        },
        {
          id: 3,
          name: 'Session Feedback',
        },
        {
          id: 4,
          name: 'Completion Certificate',
        },
        {
          id: 5,
          name: 'Payment',
        },
      ],
    },
    {
      name: 'Pre-Bootcamp Related',
      subCategory: [
        {
          _id: 1,
          name: 'Session',
        },
        {
          _id: 2,
          name: 'Payment',
        },
        {
          _id: 3,
          name: 'CodeKata',
        },
        {
          _id: 4,
          name: 'WebKata',
        },
        {
          _id: 5,
          name: 'Task',
        },
        {
          _id: 6,
          name: 'Other',
        },
      ],
    },
  ];
  return (
    <div className='bg-gray-50 h-full	'>
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
          category: Yup.string().required('Category is required'),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log('aa', values);
          // await handleForgotPassword(values, resetForm);
          setSubmitting(false);
        }}
      >
        <Form>
          <div
            className='bg-white 
            flex flex-col
            shadow-lg rounded-xl 
            p-8 sm:mx-auto
            my-10 mx-5 lg:w-7/12 sm:w-10/12 w-full mb-5'
          >
            <Title>Topic</Title>
            <div className='md:w-2/5 self-center'>
              <Select
                name='category'
                label='Category'
                listOfItems={categoryData.map((item) => item?.['name'])}
                option='Category'
              />
              {/* {values?.category !== '' &&
                categoryData?.[values?.category]?.subCategory.length > 0 && (
                  <Select
                    label='Sub Category'
                    name='subCategory'
                    listOfItems={categoryData?.[
                      values?.category
                    ]?.subCategory?.map((item) => item?.['name'])}
                  />
                )} */}
              {/* {category?.tags?.length > 0 && (
            <Select
              multiple
              size={5}
              label='Tags'
              name='tags'
              id='tags'
              formik={formik}
            >
              {category?.tags?.map((tag, i) => (
                <option value={tag} key={i}>
                  {tag}
                </option>
              ))}
            </Select>
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
              <Input
                type='text'
                name='title'
                label='Query Title'
                // formik={formik}
                // onChange={formik.handleChange}
                // value={formik.values.title}
              />
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
                // loading={isLoading}
                message='Creating'
                classes={'md:w-1/6 my-2'}
              />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateQuery;
