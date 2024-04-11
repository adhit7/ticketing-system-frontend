import { ErrorMessage, useField, useFormik } from 'formik';
import React from 'react';

const inputClass =
  'text-gray-700 bg-gray-100 border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm';

const CheckBox = (props) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormik(props);

  const { name, label, type, listOfItems } = props;
  const errorClass = meta.touched && meta.error ? 'error' : '';

  return (
    <div className='flex w-9/12 justify-between items-center py-5 flex-wrap'>
      <label className='text-lg font-medium text-gray-700'>{label}</label>
      <div className='grid md:grid-cols-4 gap-3'>
        {listOfItems?.map((item) => (
          <div key={item}>
            <input
              type={type}
              value={item}
              name={name}
              className={`
                ${inputClass}  
                ${errorClass ? 'border border-red-500' : ''}`}
              // onChange={(e) =>
              //   !name?.includes(e.target.value) &&
              //   setFieldValue(name, [...name, e.target.value])
              // }
            />
            <label htmlFor={item} className='ms-2 text-sm font-medium '>
              {item}
            </label>
          </div>
        ))}
        <ErrorMessage
          name={name}
          component='div'
          className='w-auto block font-medium text-sm text-red-600 mt-1'
        />
      </div>
    </div>
  );
};

export default CheckBox;
