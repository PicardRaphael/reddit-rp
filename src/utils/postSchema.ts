import * as yup from 'yup';

export const postSchema = yup
  .object({
    title: yup.string(),
    body: yup.string(),
  })
  .required();
