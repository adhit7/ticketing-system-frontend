import React from 'react';
import { ErrorMessage, Field, useField } from 'formik';

const inputClass = `px-2 py-3 focus:ring-0 w-full border border-gray-500 rounded-lg peer bg-inherit`;

const Select = (props) => {
  const [field, meta] = useField(props);
  const { name, label, listOfItems, option = '', classes = '' } = props;
  const errorClass = meta.touched && meta.error ? 'error' : '';

  return (
    <div className='relative bg-white mt-3'>
      <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <div className='mt-1'>
        <Field
          as='select'
          name={name}
          className={`
          ${inputClass}
          ${errorClass ? 'border border-red-500' : ''}
          ${classes}
        `}
        >
          {option !== '' && (
            <option
              value={`---Select ${option}---`}
            >{`---Select ${option}---`}</option>
          )}
          {listOfItems?.map((item, index) => (
            <option key={index} {...field} value={item}>
              {item}
            </option>
          ))}
        </Field>
      </div>
      <ErrorMessage
        name={name}
        component='div'
        className='w-auto block font-medium text-sm text-red-600 mt-1'
      />
    </div>
  );
};

export default Select;
