import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import AnalogClock from './AnalogClock'

describe('AnalogClock', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('コンポーネントがレンダリングされること', () => {
    render(<AnalogClock />)
    const clockElement = screen.getByTestId('analog-clock')
    expect(clockElement).toBeInTheDocument()
  })

  it('SVG要素が存在すること', () => {
    render(<AnalogClock />)
    const svgElement = screen.getByTestId('clock-svg')
    expect(svgElement).toBeInTheDocument()
    expect(svgElement.tagName).toBe('svg')
  })

  it('時計の外枠が描画されること', () => {
    render(<AnalogClock />)
    const clockFace = screen.getByTestId('clock-face')
    expect(clockFace).toBeInTheDocument()
  })

  it('時針が存在すること', () => {
    render(<AnalogClock />)
    const hourHand = screen.getByTestId('hour-hand')
    expect(hourHand).toBeInTheDocument()
  })

  it('分針が存在すること', () => {
    render(<AnalogClock />)
    const minuteHand = screen.getByTestId('minute-hand')
    expect(minuteHand).toBeInTheDocument()
  })

  it('秒針が存在すること', () => {
    render(<AnalogClock />)
    const secondHand = screen.getByTestId('second-hand')
    expect(secondHand).toBeInTheDocument()
  })

  it('中央の点が存在すること', () => {
    render(<AnalogClock />)
    const centerDot = screen.getByTestId('center-dot')
    expect(centerDot).toBeInTheDocument()
  })

  it('特定の時刻で正しい角度になること', () => {
    const mockDate = new Date('2024-01-01T15:30:45')
    vi.setSystemTime(mockDate)

    render(<AnalogClock />)

    const hourHand = screen.getByTestId('hour-hand')
    const minuteHand = screen.getByTestId('minute-hand')
    const secondHand = screen.getByTestId('second-hand')

    // 15:30:45
    // 時針: (15 % 12) * 30 + 30 * 0.5 = 3 * 30 + 15 = 105度
    // 分針: 30 * 6 + 45 * 0.1 = 180 + 4.5 = 184.5度
    // 秒針: 45 * 6 = 270度

    expect(hourHand.getAttribute('transform')).toContain('rotate(105')
    expect(minuteHand.getAttribute('transform')).toContain('rotate(184.5')
    expect(secondHand.getAttribute('transform')).toContain('rotate(270')
  })

  it('時間が経過すると針が更新されること', () => {
    const mockDate = new Date('2024-01-01T12:00:00')
    vi.setSystemTime(mockDate)

    render(<AnalogClock />)

    const secondHand = screen.getByTestId('second-hand')

    // 初期状態（0秒）
    expect(secondHand.getAttribute('transform')).toContain('rotate(0')

    // 1秒進める
    act(() => {
      vi.advanceTimersByTime(1000)
    })

    // 秒針が6度（1秒分）動いているはず
    expect(secondHand.getAttribute('transform')).toContain('rotate(6')
  })

  it('12個の時間マーカーが存在すること', () => {
    render(<AnalogClock />)
    const markers = screen.getAllByTestId(/hour-marker-/)
    expect(markers).toHaveLength(12)
  })
})
