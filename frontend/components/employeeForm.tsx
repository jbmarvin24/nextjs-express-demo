import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import useSWR, { mutate, trigger } from 'swr';
import RadioField from '../common/radioField';
import { Employee, InitialValues, schema } from '../models/employee';
import { createEmployee, updateEmployee } from '../services/employeeService';

const apiEndPoint = '/employees';

export interface IEmployeeFormProps {
  isNew?: boolean;
  employee: Employee;
}

const EmployeeForm = ({ isNew, employee }: IEmployeeFormProps) => {
  const toast = useToast();
  const router = useRouter();
  const { data } = useSWR<Employee[]>(apiEndPoint);

  const handleSubmit = async (values) => {
    if (isNew) {
      mutate(apiEndPoint, [...data, values], false);
      await createEmployee(values);
      trigger(apiEndPoint);
    } else {
      const newData = data.filter((x) => x.id !== values.id);
      mutate(apiEndPoint, [...newData, values], false);
      await updateEmployee(values.id, values);
      trigger(apiEndPoint);
    }
    toast({
      isClosable: true,
      status: 'success',
      title: 'Successfully Saved!',
    });
    router.push('/employees');
  };

  return (
    <Stack alignItems="center" pt={40}>
      <Box p={6} borderWidth="1px" borderRadius="lg" borderColor="gray.300" width="lg">
        <Stack spacing={3}>
          <Heading as="h3" size="xl">
            {isNew ? 'Create' : 'Update'}
          </Heading>
          <Formik initialValues={isNew ? InitialValues : employee} validationSchema={schema} onSubmit={handleSubmit}>
            {({ values, errors, touched, isSubmitting }) => (
              <Form>
                <Stack spacing={5}>
                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input {...field} id="name" placeholder="Name" />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="birthday">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.birthday && form.touched.birthday}>
                        <FormLabel htmlFor="birthday">Birthday</FormLabel>
                        <Input {...field} id="birthday" placeholder="mm/dd/yyyy" />
                        <FormErrorMessage>{form.errors.birthday}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="age">
                    {({ field, form }) => {
                      return (
                        <FormControl isInvalid={form.errors.age && form.touched.age}>
                          <FormLabel htmlFor="age">Age</FormLabel>
                          <NumberInput
                            name={field.name}
                            id="age"
                            value={field.value}
                            onChange={(val) => form.setFieldValue('age', val)}
                            onBlur={field.onBlur}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                          <FormErrorMessage>{form.errors.age}</FormErrorMessage>
                        </FormControl>
                      );
                    }}
                  </Field>
                  <Field name="employmentStatusId">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.employmentStatusId && form.touched.employmentStatusId}>
                        <FormLabel htmlFor="employmentStatusId">Employment Status</FormLabel>
                        <Select {...field} placeholder="Select option">
                          <option value={1}>Regular</option>
                          <option value={2}>Provationary</option>
                          <option value={3}>Separated</option>
                        </Select>
                        <FormErrorMessage>{form.errors.employmentStatusId}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <RadioField name="gender" />
                </Stack>
                <Button mt={6} colorScheme="teal" isLoading={isSubmitting} type="submit">
                  Submit
                </Button>
                {/* <pre>{JSON.stringify(values, null, 4)}</pre>
                <pre>{JSON.stringify(errors, null, 4)}</pre> */}
              </Form>
            )}
          </Formik>
        </Stack>
      </Box>
    </Stack>
  );
};

export default EmployeeForm;
