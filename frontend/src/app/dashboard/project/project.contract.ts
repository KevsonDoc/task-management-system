import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

export type FormField = {
  title: string;
  description: string;
};

export type PaginatedResult = {
  page: 1;
  nextPage: 1;
  previousPage: 2;
  totalPerPage: 3;
  total: 2;
  data: {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    endDate: null | string;
    users: {
      id: string;
      name: string;
    }[];
  }[];
};

export interface IProjectContainerDI {
  createProject: {
    register: UseFormRegister<FormField>;
    handleSubmit: UseFormHandleSubmit<FormField, undefined>;
    onSubmit: (form: FormField) => Promise<void>;
    errors: FieldErrors<FormField>;
    isLoading: boolean;
  };
  modal: {
    isOpen: boolean;
    onOpenModal: () => void;
    onClose: () => void;
  };
  project: {
    data: PaginatedResult | undefined;
    isLoading: boolean;
    isError: boolean;
    isFetching: boolean;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
    handleSetPage: (page: number) => void;
  };
}
