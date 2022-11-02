export type ModalView = 'login' | 'signup' | 'resetPassword';

export interface AuthModalState {
  open: boolean;
  view: ModalView;
}

export type FormLoginValues = {
  email: string;
  password: string;
};

export type FormSignUpValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type FormResetPasswordValues = {
  email: string;
};
