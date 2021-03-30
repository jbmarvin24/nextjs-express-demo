import axios from 'axios';
import { createStandaloneToast } from '@chakra-ui/react';

const toast = createStandaloneToast();

axios.interceptors.response.use(null, (error) => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expectedError) {
    console.log('Logging the error', error);
    toast({
      status: 'error',
      description: 'An unexpected error occurred.',
    });
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
