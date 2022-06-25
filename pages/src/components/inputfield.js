import {
  InputGroup,
  InputLeftAddon,
  FormControl,
  Input,
  FormHelperText,
} from '@chakra-ui/react';
import { useField } from 'formik';

export default function inputfield() {
  const { label, ...restOfProps } = props;
  const [field, meta] = useField(props);

  return (
    <FormControl id={props.name} isInvalid={!!meta.error && !!meta.touched}>
      {label && (
        <FormLabel mb={'1'} htmlFor={props.name}>
          {label}
        </FormLabel>
      )}

      <InputGroup>
        {leftAddon && <InputLeftAddon bg={'purple.500'} child={leftAddon} />}
        <Input focusBorderColor={'purple.500'} {...field} {...restOfProps} />
        {meta.error && meta.touched && (
          <FormHelperText>{meta.error}</FormHelperText>
        )}
      </InputGroup>
    </FormControl>
  );
}
