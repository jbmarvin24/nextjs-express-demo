import { GetServerSideProps } from 'next';
import EmployeeForm from '../../components/employeeForm';
import { Employee } from '../../models/employee';
import { getEmployee } from '../../services/employeeService';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(context.query.id);
  const { data } = await getEmployee(id);
  return {
    props: {
      employee: data,
    },
  };
};

export interface IEmployeeProps {
  employee: Employee;
}

const EmployeeIdPage = ({ employee }: IEmployeeProps) => {
  return <EmployeeForm employee={employee} />;
};

export default EmployeeIdPage;
