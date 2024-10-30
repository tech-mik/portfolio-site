import { ForwardedRef, useEffect, useRef } from 'react'

const useInternalRef = (externalRef: ForwardedRef<HTMLDivElement>) => {
  const internalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (externalRef && typeof externalRef === 'object') {
      internalRef.current = externalRef.current
    }
  }, [externalRef, internalRef])

  return { internalRef }
}

export default useInternalRef
