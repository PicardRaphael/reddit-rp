import * as yup from 'yup';

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email('Veuillez introduire un email valide.')
      .required("L'email est obligatoire."),
    password: yup.string().required('Le mot de passe est obligatoire.'),
  })
  .required();
export const resetPasswordSchema = yup
  .object({
    email: yup
      .string()
      .email('Veuillez introduire un email valide.')
      .required("L'email est obligatoire."),
  })
  .required();

export const signUpSchema = yup
  .object({
    email: yup
      .string()
      .email('Veuillez introduire un email valide.')
      .required("L'email est obligatoire."),
    password: yup
      .string()
      .required('Le mot de passe est obligatoire.')
      .matches(/\w*[a-z]\w*/, 'Le mot de passe doit comporter une minuscule.')
      .matches(/\w*[A-Z]\w*/, 'Le mot de passe doit comporter une majuscule.')
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        'Le mot de passe doit comporter un caractère spécial.'
      )
      .min(
        6,
        ({ min }) =>
          `Le mot de passe doit comporter au moins ${min} caractères.`
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas.'),
  })
  .required();
