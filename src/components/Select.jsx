import React from 'react';
import { ErrorMessage, useField } from 'formik';

const inputClass = `focus:ring-0 w-full border border-gray-500 rounded-lg peer bg-inherit`;

const Select = () => {
  const [field, meta] = useField(props);
  const { name, listOfItems } = props;
  const errorClass = meta.touched && meta.error ? 'error' : '';

  return (
    <div className='relative bg-white mt-4 w-full'>
      <select
        className={`
          ${inputClass}
          ${errorClass ? 'border border-red-500' : ''}
        `}
      >
        {listOfItems?.map((item) => (
          <option {...field} label={item}>
            {item}
          </option>
        ))}
      </select>
      <ErrorMessage
        name={name}
        component='div'
        className='w-auto block font-medium text-sm text-red-600 mt-1'
      />
    </div>
  );
};

export default Select;
