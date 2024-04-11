import React from 'react';
import { ErrorMessage, useField } from 'formik';

const inputClass =
  'appearance-none block w-80 py-2 px-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm';

const AdminInput = (props) => {
  const [field, meta] = useField(props);
  const { name, label, type, placeholder } = props;
  const errorClass = meta.touched && meta.error ? 'error' : '';

  return (
    <div className='inline-flex justify-between items-center w-9/12 py-5 flex-wrap'>
      <label htmlFor={name} className='text-lg font-medium text-gray-700'>
        {label}
      </label>

      <input
        className={`
            ${inputClass}
            ${errorClass ? 'border border-red-500' : ''}
          `}
        type={type}
        {...field}
        placeholder={placeholder}
      />

      <ErrorMessage
        name={name}
        component='div'
        className='w-auto block font-medium text-sm text-red-600 mt-1'
      />
    </div>
  );
};

export default AdminInput;
