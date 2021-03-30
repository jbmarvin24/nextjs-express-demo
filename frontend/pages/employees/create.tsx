import EmployeeForm from '../../components/employeeForm';

export interface ICreateProps {}

const Create = ({}: ICreateProps) => {
  return <EmployeeForm isNew employee={null} />;
};

export default Create;
