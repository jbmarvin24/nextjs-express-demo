import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, IconButton, Stack, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tooltip, Tr, useToast } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import useSWR, { mutate, trigger } from 'swr';
import DeleteAlertDialog from '../../common/deleteAlertDialog';
import { Employee } from '../../models/employee';
import { deleteEmployee, getEmployees } from '../../services/employeeService';

const apiEndPoint = '/employees';

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await getEmployees();
  return {
    props: {
      initialEmployees: data,
    },
  };
};

export interface IEmployeesProps {
  initialEmployees: Employee[];
}

const Employees = ({ initialEmployees }: IEmployeesProps) => {
  const router = useRouter();
  const toast = useToast();
  const { data } = useSWR<Employee[]>(apiEndPoint, { initialData: initialEmployees });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const deleteDialogCancelRef = useRef();
  const [forDeleteEmployeeId, setForDeleteEmployeeId] = useState(0);

  const handleDeleteDialogClose = async () => {
    setDeleteDialogOpen(false);
    mutate(
      apiEndPoint,
      data.filter((x) => x.id !== forDeleteEmployeeId),
      false
    );
    await deleteEmployee(forDeleteEmployeeId);
    trigger(apiEndPoint);
    toast({
      isClosable: true,
      status: 'success',
      title: 'Successfully Deleted',
    });
  };

  return (
    <Stack alignItems="center" pt={40}>
      <Box p={6} borderWidth="1px" borderRadius="lg" borderColor="gray.300">
        <Stack spacing={5}>
          <Heading as="h3" size="xl">
            Employees
          </Heading>
          <Button colorScheme="teal" variant="solid" leftIcon={<AddIcon />} width="20" onClick={() => router.push('/employees/create')}>
            Add
          </Button>
          <Table variant="simple" width="1xl">
            <TableCaption>Employee List</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Birthday</Th>
                <Th isNumeric>Age</Th>
                <Th>Gender</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((employee, i) => (
                <Tr key={i}>
                  <Td>{employee.name}</Td>
                  <Td>{new Date(employee.birthday).toDateString()}</Td>
                  <Td isNumeric>{employee.age}</Td>
                  <Td>{employee.gender}</Td>
                  <Td>{employee.employmentStatusId}</Td>
                  <Td>
                    <Tooltip label="Edit" aria-label="A tooltip">
                      <IconButton
                        colorScheme="teal"
                        aria-label="Edit"
                        size="sm"
                        mr={2}
                        icon={<EditIcon />}
                        onClick={() => router.push('/employees/' + employee.id)}
                      />
                    </Tooltip>
                    <Tooltip label="Delete" aria-label="A tooltip">
                      <IconButton
                        colorScheme="red"
                        aria-label="Delete"
                        size="sm"
                        icon={<DeleteIcon />}
                        onClick={() => {
                          setDeleteDialogOpen(true);
                          setForDeleteEmployeeId(employee.id);
                        }}
                      />
                    </Tooltip>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Stack>
      </Box>
      <DeleteAlertDialog
        header="Delete Employee"
        isOpen={deleteDialogOpen}
        cancelRef={deleteDialogCancelRef}
        onClose={(val) => (val ? handleDeleteDialogClose() : setDeleteDialogOpen(false))}
      />
    </Stack>
  );
};

export default Employees;
