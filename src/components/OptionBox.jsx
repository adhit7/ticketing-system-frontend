import { ErrorMessage, Field, useField } from 'formik';
import React from 'react';

const inputClass =
  'text-gray-700 bg-gray-100 border-gray-300  focus:outline-none sm:text-sm';

const OptionBox = (props) => {
  const [field, meta] = useField(props);

  const { name, label, info, type, listOfItems } = props;
  const errorClass = meta.touched && meta.error ? 'error' : '';

  return (
    <div>
      <label className='text-lg font-medium text-gray-700 text-start'>
        {label}
        {info && (
          <div className='text-sm font-medium text-gray-700'>({info})</div>
        )}
      </label>
      <div>
        <div className='grid grid-cols-3 gap-2'>
          {listOfItems?.map((item) => (
            <label
              key={item}
              htmlFor={item}
              className='ms-2 text-sm font-medium mt-5 items-center'
            >
              <Field
                type={type}
                name={name}
                value={item}
                className={`
                ${inputClass}  
                ${errorClass ? 'border border-red-500' : ''}
                ${type !== 'radio' ? 'rounded' : ''}
              `}
              />
              {item}
            </label>
          ))}
        </div>
        <ErrorMessage
          name={name}
          component='div'
          className='w-auto block font-medium text-sm text-red-600 mt-1'
        />
      </div>
    </div>
  );
};

export default OptionBox;
