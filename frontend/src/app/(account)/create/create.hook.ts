'use client';
import { AxiosError, AxiosResponse } from 'axios';
import { z } from 'zod';
import { CreateUserFormField } from './create.contract';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Api from '@/api';
import { useMutation } from '@tanstack/react-query';
import useToast from '@/hooks/useToast.hook';
import { useRouter } from 'next/navigation';

const userSchema = z.object({
  email: z
    .string({ required_error: 'E-mail is required' })
    .email({ message: 'Invalid e-mail address' }),
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, { message: 'Name is required' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export default function useCreateAccountHook() {
  const { toast } = useToast();
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormField>({
    resolver: zodResolver(userSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (form: CreateUserFormField) => Api.post('/user/', form),
    onSuccess: (response: AxiosResponse) => {
      toast(response.status, ['account created successfully']);
      route.push('/');
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

  const onSubmit = async (form: CreateUserFormField): Promise<void> => {
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
