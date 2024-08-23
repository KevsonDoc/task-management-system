'use client';

import { Button } from '@/components/Button';
import Pagination from '@/components/Pagination';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';

export function TaskView() {
  const router = useRouter();

  return (
    <main className="flex flex-1 flex-col px-4 py-4 gap-y-4 max-h-lvh">
      <div className="flex flex-row bg-white px-4 py-4 rounded-xl ring-1 ring-inset ring-gray-300 justify-end gap-x-4">
        <div className="flex flex-1 items-center">
          <div className="w-20">
            {/* <InputSelect
          label="Prioridade"
          name="priority"
          control={props.form.control}
          data={props.form.PriorityOption}
        />
        <InputSelect
          label="Status"
          name="status"
          control={props.form.control}
          data={props.form.StatusOption}
        /> */}
            <Button title="Voltar" onClick={() => router.back()} />
          </div>
        </div>
      </div>
      <div className="flex flx-1 border-t border-gray-200 rounded-xl bg-white overflow-x-auto ring-1 ring-inset ring-gray-300">
        <table className="min-w-full bg-white border border-collapse">
          <thead>
            <tr className="w-full bg-indigo-600 border-b">
              <th className="px-4 py-2 text-left text-white border border-white-600">
                Nome da tarefa
              </th>
              <th className="px-4 py-2 text-left text-white border border-white-600">
                Permissões
              </th>
              <th className="px-4 py-2 text-left text-white border border-white-600">
                Status
              </th>
              <th className="px-4 py-2 text-left text-white border border-white-600">
                Prioridade
              </th>
              <th className="px-4 py-2 text-right text-white border border-white-600">
                Ver tarefa
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 border border-indigo-600">Data 1</td>
              <td className="px-4 py-2 border border-indigo-600">Data 2</td>
              <td className="px-4 py-2 border border-indigo-600">Data 3</td>
              <td className="px-4 py-2 border border-indigo-600">Data 3</td>
              <td className="text-right px-4 py-2 justify-end border border-indigo-600">
                <button className="inline-flex items-center">
                  Ver tarefa &ensp;
                  <InformationCircleIcon
                    title="Ver tarefas"
                    aria-label="Ver tarefas"
                    className="size-6 text-indigo-600"
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <Pagination /> */}
    </main>
  );
}
