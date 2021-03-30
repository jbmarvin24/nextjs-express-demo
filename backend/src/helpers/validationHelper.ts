import * as yup from 'yup';

export async function validationHelper(schema: yup.ObjectSchema<any, any>, data: object): Promise<object> {
  try {
    return await schema.validate(data, { abortEarly: false });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw new yup.ValidationError('Validation failed', {
        error: 'Validation Failed',
        invalidArgs: invalidArgs(error.inner),
      });
    } else throw new Error(error);
  }
}

interface IErrorMessage {
  [key: string]: string[];
}

function invalidArgs(validationErrors: yup.ValidationError[]): IErrorMessage {
  const errors: IErrorMessage = {};
  validationErrors.map((err) => {
    if (err.path) {
      if (errors[err.path]) errors[err.path].push(err.message);
      else errors[err.path] = [err.message];
    }
  });

  return errors;
}
