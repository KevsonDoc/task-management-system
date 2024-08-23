'use client';

import Api from '@/api';
import useToast from '@/hooks/useToast.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  FormField,
  IProjectContainerDI,
  PaginatedResult,
} from './project.contract';
import { queryClient } from '@/providers/QueryClientProvider';

const createProjectSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(1, { message: 'Title is required' })
    .max(100, { message: 'Title must be 100 characters or less' }),
  description: z
    .string({ required_error: 'Description is required' })
    .min(1, { message: 'Description is required' })
    .max(300, { message: 'Description must be 300 characters or less' }),
});

const fetchProject = async (page: number): Promise<PaginatedResult> => {
  const response = await Api.get('/project', {
    params: {
      page: page,
      limit: 20,
    },
  });
  return response.data;
};

export default function useProjectHook(): IProjectContainerDI {
  const [page, setPage] = useState<number>(1);
  const [isOpen, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormField>({
    resolver: zodResolver(createProjectSchema),
  });

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['project', page],
    queryFn: () => fetchProject(page),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (form: FormField) => Api.post('/project', form),
    onSuccess: (response: AxiosResponse) => {
      toast(response.status, ['Projeto criado com sucesso']);
      queryClient.invalidateQueries({ queryKey: ['project'] });
      onClose();
    },
    onError: (
      error: AxiosError<{
        error: string;
        message: string[];
        statusCode: number;
      }>,
    ) => {
      toast(
        error.response?.status!,
        error.response?.data.message ?? 'Erro no servidor',
      );
    },
  });

  const onSubmit = async (form: FormField): Promise<void> => {
    await mutateAsync(form);
  };

  const handleNextPage = (): void => setPage((oldPage) => oldPage++);
  const handlePreviousPage = (): void => setPage((oldPage) => oldPage--);
  const handleSetPage = (page: number): void => setPage(() => page);

  const onClose = (): void => setOpen(() => false);
  const onOpenModal = (): void => setOpen(() => true);

  return {
    createProject: {
      register,
      handleSubmit,
      onSubmit,
      errors,
      isLoading: isPending,
    },
    modal: {
      isOpen,
      onClose,
      onOpenModal,
    },
    project: {
      data,
      isLoading,
      isError,
      isFetching,
      handlePreviousPage,
      handleNextPage,
      handleSetPage,
    },
  };
}
