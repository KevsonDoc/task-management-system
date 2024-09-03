'use client';

import { Button } from '@/components/Button';
import Input from '@/components/Input';
import InputSelect from '@/components/InputSelect';
import Modal from '@/components/Modal';
import Pagination from '@/components/Pagination';
import { PERMISSION_TASK } from '@/const/permission.const';
import { PRIORITY } from '@/const/priority.const';
import { STATUS } from '@/const/status.const';
import {
  ExclamationCircleIcon,
  EyeIcon,
  PencilSquareIcon,
  ShareIcon,
} from '@heroicons/react/20/solid';
import { ITaskContainerDI } from './task.contract';

export function TaskView(props: ITaskContainerDI) {
  return (
    <main className="flex flex-1 flex-col px-4 py-4 gap-y-4 max-h-lvh">
      <Modal
        isOpen={props.task.view.modalCreateTask.isOpen}
        onClose={() => props.task.view.modalCreateTask.onCloseModal()}
      >
        <h1>Create new task</h1>
        <form
          onSubmit={props.task.create.form.handleSubmit(
            props.task.create.onSubmit,
          )}
          className="flex gap-1 flex-col"
        >
          <Input
            label="Title"
            error={props.task.create.form.formState.errors.title?.message}
            {...props.task.create.form.register('title', {
              setValueAs: (value) => value || undefined,
            })}
          />
          <Input
            label="Description"
            error={props.task.create.form.formState.errors.description?.message}
            {...props.task.create.form.register('description', {
              setValueAs: (value) => value || undefined,
            })}
          />
          <Input
            label="End date"
            type="datetime-local"
            error={props.task.create.form.formState.errors.endDate?.message}
            {...props.task.create.form.register('endDate', {
              setValueAs: (value: string) => new Date(value) || undefined,
            })}
          />
          <InputSelect
            label="Priority"
            name="priority"
            control={props.task.create.form.control}
            data={[
              PRIORITY.LOW,
              PRIORITY.MEDIUM,
              PRIORITY.HIGH,
              PRIORITY.URGENT,
              PRIORITY.CRITICAL,
            ]}
          />
          <InputSelect
            label="Status"
            name="status"
            data={[
              STATUS.BACKLOG,
              STATUS.TODO,
              STATUS.IN_DEVELOPMENT,
              STATUS.IN_REVIEW,
              STATUS.TESTING,
              STATUS.DONE,
            ]}
            control={props.task.create.form.control}
          />
          <div className="mt-4">
            <Button
              title="Submit"
              type="submit"
              isLoading={props.task.create.mutation.isPending}
            />
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={props.task.view.modalUpdateTask.isOpen}
        onClose={() =>
          props.task.view.modalUpdateTask.setModalUpdateTask({
            isOpen: false,
            data: undefined,
          })
        }
      >
        <h1>Edit task</h1>
        <form
          onSubmit={props.task.update.form.handleSubmit(
            props.task.update.onSubmit,
          )}
          className="flex gap-1 flex-col"
        >
          <Input
            label="Title"
            error={props.task.update.form.formState.errors.title?.message}
            {...props.task.update.form.register('title', {
              setValueAs: (value) => value || undefined,
            })}
          />
          <Input
            label="Description"
            error={props.task.update.form.formState.errors.description?.message}
            {...props.task.update.form.register('description', {
              setValueAs: (value) => value || undefined,
            })}
          />
          <Input
            label="End date"
            type="datetime-local"
            error={props.task.update.form.formState.errors.endDate?.message}
            {...props.task.update.form.register('endDate', {
              setValueAs: (value) => value || undefined,
            })}
          />
          <InputSelect
            label="Priority"
            name="priority"
            control={props.task.update.form.control}
            data={[
              PRIORITY.LOW,
              PRIORITY.MEDIUM,
              PRIORITY.HIGH,
              PRIORITY.URGENT,
              PRIORITY.CRITICAL,
            ]}
          />
          <InputSelect
            label="Status"
            name="status"
            data={[
              STATUS.BACKLOG,
              STATUS.TODO,
              STATUS.IN_DEVELOPMENT,
              STATUS.IN_REVIEW,
              STATUS.TESTING,
              STATUS.DONE,
            ]}
            control={props.task.update.form.control}
          />
          <div className="mt-4">
            <Button
              title="Submit"
              isLoading={props.task.share.mutation.isPending}
            />
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={props.task.view.modalShareTask.isOpen}
        onClose={() =>
          props.task.view.modalShareTask.setShareModalTask({
            isOpen: false,
            id: undefined,
          })
        }
      >
        <h1 className="text-2xl">Share task</h1>
        <p>title: {props.task.view.modalShareTask.title}</p>
        <form
          onSubmit={props.task.share.form.handleSubmit(
            props.task.share.onSubmit,
          )}
          className="flex gap-1 flex-col"
        >
          <Input
            label="E-mail"
            error={props.task.share.form.formState.errors.email?.message}
            {...props.task.share.form.register('email', {
              setValueAs: (value) => value || undefined,
            })}
          />
          <InputSelect
            label="Permission"
            name="permission"
            control={props.task.share.form.control}
            data={[
              PERMISSION_TASK.READ,
              PERMISSION_TASK.UPDATE,
              PERMISSION_TASK.DELETE,
            ]}
          />
          <div className="mt-4">
            <Button
              title="Submit"
              type="submit"
              isLoading={props.task.share.mutation.isPending}
            />
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={props.task.view.modalShowTask.isOpen}
        onClose={() =>
          props.task.view.modalShowTask.setModalShowTask({
            isOpen: false,
            data: undefined,
          })
        }
      >
        <div>
          <h1 className="text-2xl">
            {props.task.view.modalShowTask.data?.title}
          </h1>
          <h2 className="text-1xl">Description</h2>
          <p className="mt-5">
            {props.task.view.modalShowTask.data?.description}
          </p>
        </div>
      </Modal>
      <div className="flex flex-row bg-white px-4 py-4 rounded-xl ring-1 ring-inset ring-gray-300 justify-end gap-x-4">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex gap-4">
            <div>
              <Button
                title="back"
                type="button"
                onClick={() => props.task.view.back()}
              />
            </div>
            <div>
              <Button
                title="Create new task"
                type="button"
                onClick={() => props.task.view.modalCreateTask.onOpenModal()}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <InputSelect
              label="Prioridade"
              name="priority"
              control={props.task.find.control}
              data={props.task.find.PriorityOption}
            />
            <InputSelect
              label="Status"
              name="status"
              control={props.task.find.control}
              data={props.task.find.StatusOption}
            />
          </div>
        </div>
      </div>
      {props.task.find.data && (
        <>
          <div className="flex flx-1 border-t border-gray-200 rounded-xl bg-white overflow-x-auto ring-1 ring-inset ring-gray-300">
            <table className="min-w-full bg-white border border-collapse">
              <thead>
                <tr className="w-full bg-indigo-600 border-b">
                  <th className="px-4 py-2 text-left text-white border border-white-600">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-white border border-white-600">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-white border border-white-600">
                    Priority
                  </th>
                  <th className="px-4 py-2 text-right text-white border border-white-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.task.find.data.data.map((taskItem) => (
                  <tr className="border-b" key={taskItem.id}>
                    <td className="px-4 py-2 border border-indigo-600">
                      {taskItem.title}
                    </td>
                    <td className="px-4 py-2 border border-indigo-600">
                      <span className="flex flex-row gap-x-1">
                        {STATUS[taskItem.status].label}
                        <ExclamationCircleIcon
                          className="size-5"
                          color={STATUS[taskItem.status].color}
                        />
                      </span>
                    </td>
                    <td className="px-4 py-2 border border-indigo-600">
                      <span className="flex flex-row gap-x-1">
                        {PRIORITY[taskItem.priority].label}
                        <ExclamationCircleIcon
                          className="size-5"
                          color={PRIORITY[taskItem.priority].color}
                        />
                      </span>
                    </td>
                    <td className="text-right px-4 py-2 border border-indigo-600">
                      <div className="flex gap-2 justify-end">
                        <button
                          className="inline-flex items-center"
                          onClick={() =>
                            props.task.view.modalUpdateTask.setModalUpdateTask({
                              isOpen: true,
                              data: taskItem,
                            })
                          }
                        >
                          <PencilSquareIcon
                            title="edit task"
                            aria-label="show details"
                            className="size-5 text-green-600"
                          />
                        </button>
                        <button
                          className="inline-flex items-center"
                          onClick={() =>
                            props.task.view.modalShareTask.setShareModalTask({
                              isOpen: true,
                              id: taskItem.id,
                              title: taskItem.title,
                            })
                          }
                        >
                          <ShareIcon
                            title="Share task"
                            aria-label="Share details"
                            className="size-5 text-blue-600"
                          />
                        </button>
                        <button
                          className="inline-flex items-center"
                          onClick={() =>
                            props.task.view.modalShowTask.setModalShowTask({
                              isOpen: true,
                              data: taskItem,
                            })
                          }
                        >
                          <EyeIcon
                            title="Show details"
                            aria-label="Show details"
                            className="size-5 text-indigo-600"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            handleNextPage={props.task.find.handleNextPage}
            handlePreviousPage={props.task.find.handlePreviousPage}
            handleSetPage={props.task.find.handleSetPage}
            nextPage={props.task.find.data.page + 1}
            previousPage={props.task.find.data.page - 1}
            lastPage={
              Number.isNaN(
                Math.ceil(
                  props.task.find.data.total /
                    props.task.find.data.totalPerPage,
                ),
              )
                ? 1
                : props.task.find.data.page * 20 <= props.task.find.data.total
                ? Math.ceil(
                    props.task.find.data.total /
                      props.task.find.data.totalPerPage,
                  )
                : props.task.find.data.page
            }
            page={props.task.find.data.page}
            toalPerPage={props.task.find.data.data.length}
            total={props.task.find.data.total}
          />
        </>
      )}
    </main>
  );
}
