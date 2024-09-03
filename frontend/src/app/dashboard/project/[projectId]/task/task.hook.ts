import Api from '@/api';
import { PERMISSION_TASK } from '@/const/permission.const';
import { PRIORITY } from '@/const/priority.const';
import { STATUS } from '@/const/status.const';
import useToast from '@/hooks/useToast.hook';
import { queryClient } from '@/providers/QueryClientProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { parseISO } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  CreateTaskFormField,
  FilterTaskField,
  ITaskContainerDI,
  PaginatedTaskResult,
  ShareTaskFormField,
  TaskModel,
  UpdateTaskFormField,
} from './task.contract';

const fetchTask = async (
  projectId: string,
  page: number,
  status: string,
  priority: string,
): Promise<PaginatedTaskResult> => {
  const response = await Api.get(`project/${projectId}/task`, {
    params: {
      status: STATUS.ALL.value === status ? undefined : status,
      priority: PRIORITY.ALL.value === priority ? undefined : priority,
      page: page,
      limit: 20,
    },
  });

  return response.data;
};

const StatusOption = [
  STATUS.ALL,
  STATUS.BACKLOG,
  STATUS.TODO,
  STATUS.IN_DEVELOPMENT,
  STATUS.IN_REVIEW,
  STATUS.TESTING,
  STATUS.DONE,
];

const PriorityOption = [
  PRIORITY.ALL,
  PRIORITY.LOW,
  PRIORITY.MEDIUM,
  PRIORITY.HIGH,
  PRIORITY.URGENT,
  PRIORITY.CRITICAL,
];

const shareTaskSchema = z.object({
  email: z.string({ required_error: 'E-mail is required' }),
  permission: z.object({
    value: z.string().array(),
    label: z.string(),
    color: z.string(),
  }),
});

const updateTaskSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(1, { message: 'Title is required' }),
  description: z
    .string({ required_error: 'Description is required' })
    .min(1, { message: 'Description is required' }),
  endDate: z.coerce.date().optional(),
  status: z.object({
    value: z.string(),
    label: z.string(),
    color: z.string(),
  }),
  priority: z.object({
    value: z.string(),
    label: z.string(),
    color: z.string(),
  }),
});

export default function useTaskHook(): ITaskContainerDI {
  const route = useRouter();
  const { toast } = useToast();
  const params = useParams<{ projectId: string }>();
  const [page, setPage] = useState<number>(1);
  const [modalShowTask, setModalShowTask] = useState<{
    isOpen: boolean;
    data?: TaskModel;
  }>({
    isOpen: false,
    data: undefined,
  });
  const [shareModalTask, setShareModalTask] = useState<{
    isOpen: boolean;
    id?: string;
    title?: string;
  }>({
    isOpen: false,
    id: undefined,
    title: undefined,
  });
  const [modalUpdateTask, setModalUpdateTask] = useState<{
    isOpen: boolean;
    data?: TaskModel;
  }>({
    isOpen: false,
    data: undefined,
  });

  const filterTask = useForm<FilterTaskField>({
    defaultValues: {
      priority: PRIORITY.ALL,
      status: STATUS.ALL,
    },
  });
  const [modalCreateTask, setModalCreateTask] = useState<boolean>(false);

  const shareTaskForm = useForm<ShareTaskFormField>({
    resolver: zodResolver(shareTaskSchema),
    defaultValues: {
      permission: PERMISSION_TASK.READ,
    },
  });
  const updateTaskForm = useForm<UpdateTaskFormField>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: modalUpdateTask.data?.title,
      description: modalUpdateTask.data?.description,
      endDate: modalUpdateTask.data?.endDate
        ? parseISO(modalUpdateTask.data.endDate)
        : undefined,
      status: STATUS.BACKLOG,
      priority: PRIORITY.LOW,
    },
    values: {
      title: modalUpdateTask.data?.title ?? '',
      description: modalUpdateTask.data?.description ?? '',
      endDate: modalUpdateTask.data?.endDate
        ? parseISO(modalUpdateTask.data.endDate)
        : undefined,
      status: STATUS.BACKLOG,
      priority: PRIORITY.LOW,
    },
  });
  const createTaskForm = useForm<CreateTaskFormField>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      status: STATUS.BACKLOG,
      priority: PRIORITY.LOW,
    },
  });

  const priority = filterTask.watch('priority');
  const status = filterTask.watch('status');

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['task', page, priority, status],
    queryFn: () =>
      fetchTask(params.projectId, page, status.value, status.value),
  });

  const mutationShareTask = useMutation({
    mutationFn: (form: ShareTaskFormField) =>
      Api.post(`project/${params.projectId}/task/${shareModalTask.id}/share`, {
        email: form.email,
        permission: form.permission.value,
      }),
    onSuccess: (response: AxiosResponse) => {
      toast(response.status, ['Done']);
      queryClient.invalidateQueries({ queryKey: ['task'] });
      shareTaskForm.reset();
      setShareModalTask({ isOpen: false, id: undefined, title: undefined });
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
  const mutationUpdateTask = useMutation({
    mutationFn: (form: UpdateTaskFormField) =>
      Api.put(
        `project/${params.projectId}/task/${modalUpdateTask.data?.id ?? ''}`,
        {
          title: form.title,
          description: form.description,
          endDate: form.endDate ?? undefined,
          priority: form.priority.value,
          status: form.status.value,
        },
      ),
    onSuccess: (response: AxiosResponse) => {
      toast(response.status, ['Done']);
      queryClient.invalidateQueries({ queryKey: ['task'] });
      setModalUpdateTask({ isOpen: false, data: undefined });
      updateTaskForm.reset();
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
  const mutationCreateTask = useMutation({
    mutationFn: (form: UpdateTaskFormField) =>
      Api.post(`project/${params.projectId}/task`, {
        title: form.title,
        description: form.description,
        endDate: form.endDate ?? undefined,
        priority: form.priority.value,
        status: form.status.value,
      }),
    onSuccess: (response: AxiosResponse) => {
      toast(response.status, ['Task created']);
      queryClient.invalidateQueries({ queryKey: ['task'] });
      onCloseModal();
      createTaskForm.reset();
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

  const onCloseModal = (): void => setModalCreateTask(false);
  const onOpenModal = (): void => setModalCreateTask(true);
  const back = (): void => route.back();
  const handleNextPage = (): void => {
    if (
      data &&
      data.page <= Math.ceil(data.total / data.totalPerPage) &&
      data.page * 20 <= data.total
    ) {
      setPage((oldPage) => oldPage + 1);
    }
  };
  const handlePreviousPage = (): void => {
    if (data && data.page > 1) {
      setPage((oldPage) => oldPage - 1);
    }
  };
  const handleSetPage = (page: number): void => setPage(() => page);

  const onSubmitShare = async (form: ShareTaskFormField): Promise<void> => {
    await mutationShareTask.mutateAsync(form);
  };
  const onSubmitUpdateTask = async (
    form: UpdateTaskFormField,
  ): Promise<void> => {
    await mutationUpdateTask.mutateAsync(form);
  };
  const onSubmitCreateTask = async (
    form: UpdateTaskFormField,
  ): Promise<void> => {
    await mutationCreateTask.mutateAsync(form);
  };

  return {
    task: {
      create: {
        form: createTaskForm,
        mutation: mutationCreateTask,
        onSubmit: onSubmitCreateTask,
      },
      update: {
        form: updateTaskForm,
        onSubmit: onSubmitUpdateTask,
        mutation: mutationUpdateTask,
      },
      find: {
        control: filterTask.control,
        data,
        isLoading,
        isError,
        isFetching,
        StatusOption,
        PriorityOption,
        handleNextPage,
        handlePreviousPage,
        handleSetPage,
      },
      share: {
        form: shareTaskForm,
        mutation: mutationShareTask,
        onSubmit: onSubmitShare,
      },
      view: {
        back,
        modalCreateTask: {
          isOpen: modalCreateTask,
          onOpenModal,
          onCloseModal,
        },
        modalUpdateTask: {
          ...modalUpdateTask,
          setModalUpdateTask,
        },
        modalShareTask: {
          ...shareModalTask,
          setShareModalTask,
        },
        modalShowTask: {
          ...modalShowTask,
          setModalShowTask,
        },
      },
    },
  };
}
