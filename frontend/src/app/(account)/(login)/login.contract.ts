import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"

export type FormFieldValue = {
  email?: string | null
  password?: string | null
}

export interface ILoginContainerDI {
  form: {
    isLoading: boolean
    errors: FieldErrors<FormFieldValue>
    register: UseFormRegister<FormFieldValue>
    handleSubmit: UseFormHandleSubmit<FormFieldValue, undefined>
    onSubmit: (form: FormFieldValue) => void
  }
}