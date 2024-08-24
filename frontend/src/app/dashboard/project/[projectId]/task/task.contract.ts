import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { Control, UseFormReturn } from 'react-hook-form';

export type FilterTaskField = {
  priority: { value: string; label: string; color: string };
  status: { value: string; label: string; color: string };
};

export type ShareTaskFormField = {
  [key: string]: { value: string[]; label: string; color: string };
};

export type CreateTaskFormField = {
  title: string;
  description: string;
  endDate?: Date;
  priority: { value: string; label: string; color: string };
  status: { value: string; label: string; color: string };
};

export type UpdateTaskFormField = {
  title: string;
  description: string;
  endDate?: Date;
  priority: { value: string; label: string; color: string };
  status: { value: string; label: string; color: string };
};

export type TaskModel = {
  id: string;
  title: string;
  description: string;
  projectId: string;
  createdAt: string;
  endDate: string | null;
  deletedAt: string | null;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' | 'CRITICAL';
  status:
    | 'BACKLOG'
    | 'TODO'
    | 'IN_DEVELOPMENT'
    | 'IN_REVIEW'
    | 'TESTING'
    | 'DONE';
  users: {
    id: string;
    name: string;
    permission: {
      id: string;
      name: string;
    }[];
  }[];
};

export type PaginatedTaskResult = {
  page: number;
  nextPage: number;
  previousPage: number;
  totalPerPage: number;
  total: number;
  data: {
    id: string;
    title: string;
    description: string;
    projectId: string;
    createdAt: string;
    endDate: string | null;
    deletedAt: string | null;
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' | 'CRITICAL';
    status:
      | 'BACKLOG'
      | 'TODO'
      | 'IN_DEVELOPMENT'
      | 'IN_REVIEW'
      | 'TESTING'
      | 'DONE';
    users: {
      id: string;
      name: string;
      permission: {
        id: string;
        name: string;
      }[];
    }[];
  }[];
};

export interface ITaskContainerDI {
  task: {
    find: {
      StatusOption: {
        value: string;
        label: string;
        color: string;
      }[];
      PriorityOption: {
        value: string;
        label: string;
        color: string;
      }[];
      control: Control<any, any>;
      data: PaginatedTaskResult | undefined;
      isLoading: boolean;
      isError: boolean;
      isFetching: boolean;
      handlePreviousPage: () => void;
      handleNextPage: () => void;
      handleSetPage: (page: number) => void;
    };
    create: {
      form: UseFormReturn<CreateTaskFormField>;
      onSubmit: (form: CreateTaskFormField) => Promise<void>;
      mutation: UseMutationResult<
        AxiosResponse<any, any>,
        AxiosError<
          {
            error: string;
            message: string[];
            statusCode: number;
          },
          any
        >,
        CreateTaskFormField,
        unknown
      >;
    };
    update: {
      form: UseFormReturn<UpdateTaskFormField>;
      onSubmit: (form: UpdateTaskFormField) => Promise<void>;
      mutation: UseMutationResult<
        AxiosResponse<any, any>,
        AxiosError<
          {
            error: string;
            message: string[];
            statusCode: number;
          },
          any
        >,
        UpdateTaskFormField,
        unknown
      >;
    };
    share: {
      form: UseFormReturn<ShareTaskFormField>;
      onSubmit: (form: ShareTaskFormField) => Promise<void>;
      mutation: UseMutationResult<
        AxiosResponse<any, any>,
        AxiosError<
          {
            error: string;
            message: string[];
            statusCode: number;
          },
          any
        >,
        ShareTaskFormField,
        unknown
      >;
    };
    view: {
      back: () => void;
      modalCreateTask: {
        isOpen: boolean;
        onCloseModal: () => void;
        onOpenModal: () => void;
      };
      modalShareTask: {
        isOpen: boolean;
        id?: string;
        title?: string;
        setShareModalTask: Dispatch<
          SetStateAction<{
            isOpen: boolean;
            id?: string;
            title?: string;
          }>
        >;
      };
      modalUpdateTask: {
        isOpen: boolean;
        data?: TaskModel;
        setModalUpdateTask: Dispatch<
          SetStateAction<{
            isOpen: boolean;
            data?: TaskModel;
          }>
        >;
      };
      modalShowTask: {
        isOpen: boolean;
        data?: TaskModel;
        setModalShowTask: Dispatch<
          SetStateAction<{
            isOpen: boolean;
            data?: TaskModel;
          }>
        >;
      };
    };
  };
}
