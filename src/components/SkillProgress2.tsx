import React, { useEffect, useRef } from 'react'
const SkillProgress = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.imageSmoothingEnabled = false

    const centerX = canvas.width / 2 // Center of the circle
    const centerY = canvas.height / 2
    const radius = 50 // Circle radius
    const rectWidth = 2 // Rectangle width
    const rectHeight = 20 // Rectangle height
    const rectCount = 100 // Number of rectangles
    const startAngle = 0 // 40 Start of the arc in degrees
    const endAngle = 360 // 140 End of the arc in degrees
    const radian = (degrees: number) => degrees * (Math.PI / 180) // Convert degrees to radians

    ctx.clearRect(0, 0, canvas.width, canvas.height) // Clear the canvas

    ctx.beginPath()
    ctx.arc(
      centerX,
      centerY,
      radius,
      radian(startAngle),
      radian(endAngle),
      true,
    )
    ctx.fill()
    ctx.fillStyle = 'blue'
    for (let i = 0; i < rectCount; i++) {
      const angle =
        (startAngle + (i * (endAngle - startAngle)) / (rectCount - 1)) *
        (Math.PI / 180)

      const rotation = angle - (Math.PI / 180) * 90

      // Rectangle center position
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)

      const x = centerX + radius * cos
      const y = centerY - radius * sin
      // Save context to rotate around rectangle's center
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(-rotation)

      // Draw rectangle
      ctx.fillStyle = 'red'
      ctx.fillRect(-rectWidth / 2, -rectHeight, rectWidth, rectHeight)

      // Restore context
      ctx.restore()
    }
  }, [])

  return <canvas ref={canvasRef} width={300} height={300} />
}

export default SkillProgress
