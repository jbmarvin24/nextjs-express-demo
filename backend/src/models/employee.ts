import { Prisma } from '@prisma/client';
import * as yup from 'yup';
import { validationHelper } from '../helpers/validationHelper';

export const schema = yup.object().shape({
  name: yup.string().max(100).required().label('Name'),
  birthday: yup.date().required().label('Birthday'),
  age: yup.number().required().max(100).min(1).label('Age'),
  employmentStatusId: yup.number().min(1).required().label('Employment Status'),
  gender: yup.string().required().oneOf(['Male', 'Female']).label('Gender'),
});

export const validateEmployee = async (data: object): Promise<Prisma.EmployeeCreateInput> => (await validationHelper(schema, data)) as any;
