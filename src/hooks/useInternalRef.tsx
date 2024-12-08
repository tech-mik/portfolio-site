import { ViewHTMLDivElement } from '@/types/Views'
import { ForwardedRef, useEffect, useRef } from 'react'

/**
 * This hook creates an internal reference to the external reference passed to the component, so it can be used inside the component.
 * @param externalRef - The external reference passed to the component.
 * @returns an object with the internal reference.
 */
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
