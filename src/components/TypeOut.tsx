'use client'
import React, { useEffect, useRef } from 'react'
import ReactDOMServer from 'react-dom/server'

type TypeOutProps = {
  children: React.ReactNode
  typingSpeed?: number
  startTyping: boolean
  caret?: () => React.ReactNode
  next?: () => void
}

const TypeOut = ({
  children,
  typingSpeed = 100,
  startTyping = false,
  caret: Caret,
  next,
}: TypeOutProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const typeTimer = useRef<NodeJS.Timeout | null>(null)
  const isTyping = useRef(false)

  // First let's initialize the content, so it's easy to type out
  // We need to make sure that all text is seperately wrapped in a HTMLelement
  // So if not, we wrap it in a span
  useEffect(() => {
    if (!containerRef.current) return

    function initializeElements(element: HTMLElement) {
      const childNodes = Array.from(element.childNodes)

      for (const child of element.childNodes) {
        if (childNodes.length > 1) {
          if (child.nodeType === Node.TEXT_NODE) {
            const newSpan = document.createElement('span')
            newSpan.textContent = child.textContent
            newSpan.style.opacity = '0' // Initially hide the text
            element.replaceChild(newSpan, child)
          } else {
            initializeElements(child as HTMLElement)
          }
        } else {
          if (child.nodeType === Node.TEXT_NODE) {
            element.style.opacity = '0'
          } else {
            initializeElements(child as HTMLElement)
          }
        }
      }
    }

    initializeElements(containerRef.current)
  }, [])

  // Secondly, let's type out the content
  useEffect(() => {
    if (!containerRef.current) return

    const appendableCaret = document.createElement('span')
    if (Caret) {
      appendableCaret.insertAdjacentHTML(
        'beforeend',
        ReactDOMServer.renderToStaticMarkup(<Caret />),
      )
    }

    async function typeOutElement(element: HTMLElement) {
      const originalTextContent = element.textContent || ''
      element.style.opacity = '1'

      for (let i = 0; i < originalTextContent?.length; i++) {
        element.textContent = originalTextContent.slice(0, i + 1)
        if (Caret && i + 1 < originalTextContent.length) {
          element.appendChild(appendableCaret)
        }

        if (typeTimer.current) {
          clearTimeout(typeTimer.current)
        }
        typeTimer.current = setTimeout(() => {
          if (next) next()
        }, typingSpeed + 10)

        await new Promise((resolve) => setTimeout(resolve, typingSpeed))
      }
    }

    async function typeOutRecursive(element: HTMLElement) {
      const childNodes = Array.from(element.childNodes)

      for (const child of childNodes) {
        if (child.nodeType === Node.TEXT_NODE) {
          await typeOutElement(element)
        } else {
          await typeOutRecursive(child as HTMLElement)
        }
      }
    }

    if (startTyping && !isTyping.current) {
      typeOutRecursive(containerRef.current)
      isTyping.current = true
    }
  }, [startTyping, typingSpeed])

  return (
    <div ref={containerRef}>
      {children}
      {/* <div></div> */}
    </div>
  )
}

export default TypeOut
