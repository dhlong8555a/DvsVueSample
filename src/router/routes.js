import Main from '@/components/Main'
import Project from '@/components/project/Project'

const prjRoutes = {
  path: 'project',
  name: 'project',
  component: Project
}

const pipelineRoutes = {
  path: 'pipeline',
  name: 'pipeline',
  component: {
    template: '<div>pipeline</div>'
  }
}

const reportRoutes = {
  path: 'report',
  name: 'report',
  component: {
    template: '<div>report</div>'
  }
}

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: { name: 'project' },
    children: [
      prjRoutes,
      pipelineRoutes,
      reportRoutes
    ]
  }
]

export default routes
