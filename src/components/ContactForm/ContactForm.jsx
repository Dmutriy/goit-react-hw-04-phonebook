import { Formik } from 'formik';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { FormContact, Label, Input, ErrorText } from './ContactForm.styled.js';

const nameValidate =
  "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";
const phoneValidate = RegExp(
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{1,3}\\)[ \\-]*)|([0-9]{1,4})[ \\-]*)*?[0-9]{1,4}?[ \\-]*[0-9]{1,9}?$/
);

const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(3)
    .max(16)
    .matches(
      nameValidate,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    ),
  number: yup
    .string()
    .required()
    .min(6)
    .max(10)
    .matches(
      phoneValidate,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    ),
});

const initialValues = {
  name: '',
  number: '',
};

const ContactForm = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    const isSuccess = onSubmit({ ...values });
    if (!isSuccess) return;

    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <FormContact autoComplete="off">
        <Label>
          Name
          <Input type="text" name="name"></Input>
          <ErrorText component="div" name="name" />
        </Label>
        <Label>
          Number
          <Input type="tel" name="number"></Input>
          <ErrorText component="div" name="number" />
        </Label>
        <Button variant="contained" type="submit">
          Add contact
        </Button>
      </FormContact>
    </Formik>
  );
};

export default ContactForm;
