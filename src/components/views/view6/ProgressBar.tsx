interface ProgressBarProps {
  label: string
  percentage: number
  character?: string
  characterCount?: number
}

/**
 * This component creates a character based progress bar.
 * You can give the character you want to use as a prop
 * and the percentage of how many characters should be shown
 *
 * @example
 * <ProgressBar character='#' characterCount={20} percentage={80} />
 * @returns
 * [################    ] [80%]
 */

const ProgressBar = ({
  label,
  percentage,
  character = '#',
  characterCount = 20,
}: ProgressBarProps) => {
  return (
    <div>
      <span className='inline-block w-20 lg:w-32'>{label}:</span>
      <span>
        <span>[</span>
        <span className='text-green-300'>
          {character.repeat((characterCount * percentage) / 100)}
        </span>
        <span className='text-gray-200'>
          {character.repeat(
            characterCount - (characterCount * percentage) / 100,
          )}
        </span>
        ] [{percentage}%]
      </span>
    </div>
  )
}
export default ProgressBar
