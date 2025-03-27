import * as yup from 'yup';

let ConnectionSchema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
});

export default ConnectionSchema;
