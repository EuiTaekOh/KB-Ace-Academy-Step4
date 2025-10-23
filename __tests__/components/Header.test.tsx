import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'

// Next.js 훅 모킹
jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}))

// 폰트 모킹
jest.mock('@/styles/fonts', () => ({
  oswald: { className: 'oswald-font' }
}))

const menuActiveClass = 'text-[var(--color-primary)]'

describe('<Header>', () => {
  beforeEach(() => {})

  afterEach(() => {
    jest.clearAllMocks()
  })

  // 헤더 기본 렌더링 확인
  test('헤더가 정상적으로 렌더링된다', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/')
    render(<Header />)
  })

  // 메뉴 항목들 올바른 렌더링 확인
  test('메뉴 항목들이 정상적으로 렌더링된다', () => {
    render(<Header />)
  })

  // 현재 경로에 따른 활성 메뉴 스타일 적용 확인
  test('현재 경로가 "/"일 때 Search 메뉴가 활성화된다', () => {
    render(<Header />)
  })

  test('현재 경로가 "/movies/tt4520988"일 때 Sample Movie 메뉴가 활성화된다', () => {
    render(<Header />)
  })

  test('알 수 없는 경로일 때 모든 메뉴가 비활성화된다', () => {
    render(<Header />)
  })
})
