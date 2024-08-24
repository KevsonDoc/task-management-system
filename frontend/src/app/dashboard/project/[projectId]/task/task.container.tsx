'use client';

import useTaskHook from './task.hook';
import { TaskView } from './task.view';

export function TaskContainer() {
  return <TaskView {...useTaskHook()} />;
}
