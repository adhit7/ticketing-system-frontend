import React from 'react';
import { ErrorMessage, Field, useField } from 'formik';

const inputClass =
  'appearance-none block w-full py-2 px-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm';

const TextArea = (props) => {
  const [field, meta] = useField(props);
  const { name, label, classes = '' } = props;
  const errorClass = meta.touched && meta.error ? 'error' : '';

  return (
    <div className='mb-6'>
      <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <div className='mt-1'>
        <Field
          as='textarea'
          className={`
            ${inputClass}
            ${errorClass ? 'border border-red-500' : ''}
            ${classes}
          `}
          {...field}
        />
      </div>
      <ErrorMessage
        name={name}
        component='p'
        className='font-medium text-sm text-red-600 mt-1'
      />
    </div>
  );
};

export default TextArea;
