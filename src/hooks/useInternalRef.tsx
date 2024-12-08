import { ViewHTMLDivElement } from '@/types/Views'
import { ForwardedRef, useEffect, useRef } from 'react'

const useInternalRef = (externalRef: ForwardedRef<ViewHTMLDivElement>) => {
  const internalRef = useRef<ViewHTMLDivElement>(null)

  useEffect(() => {
    if (externalRef && typeof externalRef === 'object') {
      internalRef.current = externalRef.current
    }
  }, [externalRef, internalRef])

  return { internalRef }
}

export default useInternalRef
