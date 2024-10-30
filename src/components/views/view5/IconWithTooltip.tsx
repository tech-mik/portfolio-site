import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Project } from '@/types/Views'

interface IconWithTooltipProps {
  icon: Project['icons'][0]
}

const IconWithTooltip = ({
  icon: { title, icon: Icon },
}: IconWithTooltipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Icon className='text-xl' />
      </TooltipTrigger>
      <TooltipContent side='top'>
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  )
}
export default IconWithTooltip
