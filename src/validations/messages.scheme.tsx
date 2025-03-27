import * as yup from 'yup';

let MessagesSchema = yup.object().shape({
  connection: yup.string().required('A conexão é obrigatória'),
  content: yup.string().required('A Mensagem é obrigatória'),
  contacts: yup.array().required('Selecione um contato'),
  date: yup.string().required('A data de envio é obrigatória'),
});

export default MessagesSchema;
