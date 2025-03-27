import * as yup from 'yup';

let ContactSchema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  phone: yup.string().required('Telefone é obrigatório'),
});

export default ContactSchema;
