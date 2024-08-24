'use client';

import Pagination from '@/components/Pagination';
import { EyeIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { IProjectContainerDI } from './project.contract';
import { format } from 'date-fns';
import { Button } from '@/components/Button';
import Modal from '@/components/Modal';
import Input from '@/components/Input';

export default function ProjectView(props: IProjectContainerDI) {
  return (
    <main className="flex flex-1 flex-col px-4 py-4 gap-y-4 max-h-lvh">
      <Modal isOpen={props.modal.isOpen} onClose={props.modal.onClose}>
        <h1>Create project</h1>
        <form
          onSubmit={props.createProject.handleSubmit(
            props.createProject.onSubmit,
          )}
          className="flex gap-1 flex-col"
        >
          <Input
            label="Title"
            error={props.createProject.errors.title?.message}
            {...props.createProject.register('title', {
              setValueAs: (value) => value || undefined,
            })}
          />
          <Input
            label="Description"
            error={props.createProject.errors.description?.message}
            {...props.createProject.register('description', {
              setValueAs: (value) => value || undefined,
            })}
          />
          <div className="mt-4">
            <Button title="Submit" isLoading={props.createProject.isLoading} />
          </div>
        </form>
      </Modal>
      <div className="flex flex-row bg-white px-4 py-4 rounded-xl ring-1 ring-inset ring-gray-300 justify-end gap-x-4">
        <div>
          <Button
            title="Create new project"
            type="button"
            onClick={props.modal.onOpenModal}
          />
        </div>
      </div>
      {props.project.data && (
        <>
          <div className="flex flx-1 border-t border-gray-200 rounded-xl bg-white overflow-x-auto ring-1 ring-inset ring-gray-300">
            <table className="min-w-full bg-white border border-collapse">
              <thead>
                <tr className="w-full bg-indigo-600 border-b">
                  <th className="px-4 py-2 text-left text-white border border-white-600">
                    Nome do projeto
                  </th>
                  <th className="px-4 py-2 text-left text-white border border-white-600">
                    Descrição
                  </th>
                  <th className="px-4 py-2 text-left text-white border border-white-600">
                    Data de criação
                  </th>
                  <th className="px-4 py-2 text-left text-white border border-white-600">
                    Previsão de término
                  </th>
                  <th className="px-4 py-2 text-right text-white border border-white-600">
                    Ver tarefas
                  </th>
                </tr>
              </thead>
              <>
                <tbody>
                  {props.project.data?.data.map((projectItem) => (
                    <tr className="border-b" key={projectItem.id}>
                      <td className="px-4 py-2 border border-indigo-600">
                        {projectItem.title}
                      </td>
                      <td className="px-4 py-2 border border-indigo-600">
                        {projectItem.description}
                      </td>
                      <td className="px-4 py-2 border border-indigo-600">
                        {projectItem.createdAt
                          ? format(projectItem.createdAt, 'MM/dd/yyyy')
                          : 'Sem data'}
                      </td>
                      <td className="px-4 py-2 border border-indigo-600">
                        {projectItem.endDate
                          ? format(projectItem.endDate, 'MM/dd/yyyy')
                          : 'Sem data'}
                      </td>
                      <td className="text-right px-4 py-2 justify-end border border-indigo-600">
                        <Link
                          className="inline-flex items-center"
                          href={`/dashboard/project/${projectItem.id}/task`}
                        >
                          Ver tarefas &ensp;
                          <EyeIcon
                            title="Ver tarefas"
                            aria-label="Ver tarefas"
                            className="size-6 text-indigo-600"
                          />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            </table>
          </div>
          <Pagination
            handleNextPage={props.project.handleNextPage}
            handlePreviousPage={props.project.handlePreviousPage}
            handleSetPage={props.project.handleSetPage}
            nextPage={props.project.data.page + 1}
            previousPage={props.project.data.page - 1}
            lastPage={
              Number.isNaN(
                Math.ceil(
                  props.project.data.total / props.project.data.totalPerPage,
                ),
              )
                ? 1
                : props.project.data.page * 20 <= props.project.data.total
                ? Math.ceil(
                    props.project.data.total / props.project.data.totalPerPage,
                  )
                : props.project.data.page
            }
            page={props.project.data.page}
            toalPerPage={props.project.data.data.length}
            total={props.project.data.total}
          />
        </>
      )}
    </main>
  );
}
