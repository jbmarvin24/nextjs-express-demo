import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import { useField } from 'formik';

export interface RadioFieldProps {
  name: string;
}

const RadioField = ({ name }: RadioFieldProps) => {
  const [field, meta, helpers] = useField({
    name,
  });

  // May Error bakit walang initial bilog yung radio button?

  return (
    <FormControl as="fieldset">
      <FormLabel as="legend">Gender</FormLabel>
      <RadioGroup {...field} onChange={(val) => helpers.setValue(val)}>
        <HStack spacing="24px">
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
        </HStack>
      </RadioGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default RadioField;
