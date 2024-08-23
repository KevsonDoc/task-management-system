'use client';

import useProjectHook from './project.hook';
import ProjectView from './project.view';

export default function ProjectContainer() {
  return <ProjectView {...useProjectHook()} />;
}
