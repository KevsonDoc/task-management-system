import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

export type CreateUserFormField = {
  email: string;
  name: string;
  password: string;
};

export interface ICreateUserContainerDI {
  form: {
    isLoading: boolean;
    errors: FieldErrors<CreateUserFormField>;
    register: UseFormRegister<CreateUserFormField>;
    handleSubmit: UseFormHandleSubmit<CreateUserFormField, undefined>;
    onSubmit: (form: CreateUserFormField) => void;
  };
}
