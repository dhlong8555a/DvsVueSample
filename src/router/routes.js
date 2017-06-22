import Main from '@/components/Main'
import Project from '@/components/project/Project'

const prjRoutes = {
  path: 'project',
  name: 'project',
  component: Project
}

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: { name: 'project' },
    children: [
      prjRoutes
    ]
  }
]

export default routes
