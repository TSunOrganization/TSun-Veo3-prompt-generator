
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-600 text-red-700 dark:text-red-300 p-4 rounded-md shadow-md max-w-4xl mx-auto" role="alert">
      <p className="font-bold">An Error Occurred</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;