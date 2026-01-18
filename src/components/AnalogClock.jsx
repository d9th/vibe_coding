import React, { useState, useEffect } from 'react'

const AnalogClock = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getHandAngles = () => {
    const hours = time.getHours()
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()

    const secondAngle = seconds * 6
    const minuteAngle = minutes * 6 + seconds * 0.1
    const hourAngle = (hours % 12) * 30 + minutes * 0.5

    return { hourAngle, minuteAngle, secondAngle }
  }

  const { hourAngle, minuteAngle, secondAngle } = getHandAngles()

  const renderHourMarkers = () => {
    const markers = []
    for (let i = 0; i < 12; i++) {
      const angle = i * 30
      const isMainHour = i % 3 === 0
      const length = isMainHour ? 15 : 10
      const width = isMainHour ? 3 : 2

      markers.push(
        <line
          key={i}
          data-testid={`hour-marker-${i}`}
          x1="0"
          y1="-90"
          x2="0"
          y2={-90 + length}
          stroke="#333"
          strokeWidth={width}
          transform={`rotate(${angle})`}
        />
      )
    }
    return markers
  }

  const renderHourNumbers = () => {
    const numbers = []
    for (let i = 1; i <= 12; i++) {
      const angle = (i * 30 - 90) * (Math.PI / 180)
      const radius = 70
      const x = radius * Math.cos(angle)
      const y = radius * Math.sin(angle)

      numbers.push(
        <text
          key={i}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="16"
          fontWeight="bold"
          fill="#2c3e50"
        >
          {i}
        </text>
      )
    }
    return numbers
  }

  return (
    <div className="flex justify-center items-center p-5" data-testid="analog-clock">
      <svg
        width="300"
        height="300"
        viewBox="-150 -150 300 300"
        data-testid="clock-svg"
        className="rounded-full transition-transform duration-300 hover:scale-105"
        style={{
          filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15))',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}
      >
        {/* 時計の外枠 */}
        <circle
          data-testid="clock-face"
          cx="0"
          cy="0"
          r="100"
          fill="white"
          stroke="#2c3e50"
          strokeWidth="4"
        />

        {/* 内側の装飾円 */}
        <circle
          cx="0"
          cy="0"
          r="95"
          fill="none"
          stroke="#ecf0f1"
          strokeWidth="1"
        />

        {/* 時間マーカー */}
        {renderHourMarkers()}

        {/* 時間数字 */}
        {renderHourNumbers()}

        {/* 時針 */}
        <line
          data-testid="hour-hand"
          x1="0"
          y1="0"
          x2="0"
          y2="-50"
          stroke="#333"
          strokeWidth="6"
          strokeLinecap="round"
          transform={`rotate(${hourAngle})`}
        />

        {/* 分針 */}
        <line
          data-testid="minute-hand"
          x1="0"
          y1="0"
          x2="0"
          y2="-70"
          stroke="#666"
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle})`}
        />

        {/* 秒針 */}
        <line
          data-testid="second-hand"
          x1="0"
          y1="10"
          x2="0"
          y2="-80"
          stroke="#e74c3c"
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${secondAngle})`}
        />

        {/* 中央の点 */}
        <circle
          data-testid="center-dot"
          cx="0"
          cy="0"
          r="5"
          fill="#333"
        />
      </svg>
    </div>
  )
}

export default AnalogClock
