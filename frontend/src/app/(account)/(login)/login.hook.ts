'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormFieldValue, ILoginContainerDI } from './login.contract';
import { useMutation } from '@tanstack/react-query';
import Api from '@/api';
import useToast from '@/hooks/useToast.hook';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';

const userSchema = z
  .object({
    email: z.string({ required_error: 'E-mail é um campo obrigatório' }),
    password: z.string({ required_error: 'Senha é um campo obrigatório' }),
  })
  .required();

export default function useLoginHook(): ILoginContainerDI {
  const { toast } = useToast();
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFieldValue>({
    resolver: zodResolver(userSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (form: FormFieldValue) =>
      Api.post('/authentication/login', form),
    onSuccess: (
      response: AxiosResponse<{
        token: string;
        user: {
          id: string;
          email: string;
          name: string;
        };
      }>,
    ) => {
      Api.defaults.headers.common.Authorization = `Bearer + 1 ${response.data.token}`;
      Api.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${response.data.token}`;
        return config;
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      toast(response.status, ['Bem vindo']);
      route.push('/dashboard/project');
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

  const onSubmit = async (form: FormFieldValue): Promise<void> => {
    await mutateAsync(form);
  };

  return {
    form: {
      isLoading: isPending,
      errors,
      register,
      handleSubmit,
      onSubmit,
    },
  };
}
