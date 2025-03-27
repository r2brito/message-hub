import * as yup from 'yup';

let LoginSchema = yup.object().shape({
  email: yup.string().required('O Email é obrigatório'),
  password: yup
    .string()
    .required('A sua senha é necessária para entrar')
    .max(15, 'Sua senha parece estar muito grande')
    .min(5, 'Sua senha parece estar muito curta'),
});

export default LoginSchema;
