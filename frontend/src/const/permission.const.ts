export const PERMISSION_PROJECT = {
  READ: {
    value: 'READ',
    label: 'ler tarefas compartilhadas',
    color: '#1E90FF',
  },
  READ_ALL: {
    value: 'READ_ALL',
    label: 'ler todas as tarefas do projeto',
    color: '#00BFFF',
  },
  CREATE: {
    value: 'CREATE',
    label: 'criar',
    color: '#32CD32',
  },
  UPDATE: {
    value: 'UPDATE',
    label: 'atualizar',
    color: '#FFA500',
  },
  DELETE: {
    value: 'DELETE',
    label: 'deletar',
    color: '#FF4500',
  },
};

export const PERMISSION_TASK = {
  READ: {
    value: ['READ'],
    label: 'Ler tarefas compartilhadas',
    color: '#1E90FF',
  },
  UPDATE: {
    value: ['READ', 'UPDATE'],
    label: 'Ler e atualizar tarefas compartilhadas',
    color: '#FFA500',
  },
  DELETE: {
    value: ['READ', 'UPDATE', 'DELETE'],
    label: 'Ler, ataulizar e deletar tarefas compartilhadas',
    color: '#FF4500',
  },
};
