import * as yup from 'yup';

// Lahat ng may kinalaman sa Employee dito ilalagay

export interface Employee {
  id?: number;
  name: string;
  birthday: string;
  age: number;
  gender: string;
  employmentStatusId: number;
}

export const InitialValues: Employee = {
  name: '',
  birthday: '',
  age: 0,
  employmentStatusId: 0,
  gender: 'Male',
};

export const schema = yup.object().shape({
  name: yup.string().max(100).required().label('Name'),
  birthday: yup.date().required().label('Birthday'),
  age: yup.number().required().max(100).min(1).label('Age'),
  employmentStatusId: yup.number().min(1).required().label('Employment Status'),
  gender: yup.string().required().oneOf(['Male', 'Female']).label('Gender'),
});
