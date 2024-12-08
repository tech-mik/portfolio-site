import { cn } from '@/lib/utils'
import { Project } from '@/types/Views'

interface ProjectTypeBadgeProps {
  projectType: Project['type']
}

const ProjectTypeBadge = ({ projectType }: ProjectTypeBadgeProps) => {
  return (
    <span
      className={cn(
        'p-0.5 px-2 rounded-full text-[10px]  text-xs whitespace-nowrap',
        {
          'bg-green-300 text-green-950': projectType === 'Hobby Project',
          'bg-blue-300 text-blue-950': projectType === 'Course Project',
        },
      )}>
      {projectType}
    </span>
  )
}
export default ProjectTypeBadge
