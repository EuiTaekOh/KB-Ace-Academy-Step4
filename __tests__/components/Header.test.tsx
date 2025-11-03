import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'

// Next.js 훅 모킹
jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}))

// 폰트 모킹
jest.mock('@/styles/fonts', () => ({
  oswald: {
    className: 'oswald-font'
  }
}))

const menuActiveClass = 'text-[var(--color-primary)]'

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>
const getSearchMenu = () => screen.getByRole('link', { name: '🔍 Search' })
const getSampleMovieMenu = () =>
  screen.getByRole('link', { name: '📽️ Sample Movie' })

describe('<Header>', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  // 헤더 기본 렌더링 확인
  test('헤더가 정상적으로 렌더링된다', () => {
    render(<Header />)

    const title = screen.getByRole('link', { name: 'OMDbAPI .COM' })
    expect(title).toBeInTheDocument()
    expect(title).toHaveAttribute('href', '/')
  })

  // 메뉴 항목들 올바른 렌더링 확인
  test('메뉴 항목들이 정상적으로 렌더링된다', () => {
    render(<Header />)

    const searchMenu = getSearchMenu()
    const sampleMovieMenu = getSampleMovieMenu()
    // Search
    expect(searchMenu).toBeInTheDocument()
    expect(searchMenu).toHaveAttribute('href', '/')
    // Sample Movie
    expect(sampleMovieMenu).toBeInTheDocument()
    expect(sampleMovieMenu).toHaveAttribute('href', '/movies/tt4520988')
  })

  // 현재 경로에 따른 활성 메뉴 스타일 적용 확인
  test('현재 경로가 "/"일 때 Search 메뉴가 활성화된다', () => {
    mockUsePathname.mockReturnValue('/')
    render(<Header />)

    const searchMenu = getSearchMenu()
    const sampleMovieMenu = getSampleMovieMenu()
    // Search 메뉴 활성화
    expect(searchMenu.parentElement).toHaveClass(menuActiveClass)
    // Sample Movie 메뉴 비활성화
    expect(sampleMovieMenu.parentElement).not.toHaveClass(menuActiveClass)
  })

  test('현재 경로가 "/movies/tt4520988"일 때 Sample Movie 메뉴가 활성화된다', () => {
    mockUsePathname.mockReturnValue('/movies/tt4520988')
    render(<Header />)

    const searchMenu = getSearchMenu()
    const sampleMovieMenu = getSampleMovieMenu()
    // Sample Movie 메뉴 활성화
    expect(sampleMovieMenu.parentElement).toHaveClass(menuActiveClass)
    // Search 메뉴 비활성화
    expect(searchMenu.parentElement).not.toHaveClass(menuActiveClass)
  })

  test('알 수 없는 경로일 때 모든 메뉴가 비활성화된다', () => {
    mockUsePathname.mockReturnValue('/this-is-unknown-path')
    render(<Header />)
    const searchMenu = getSearchMenu()
    const sampleMovieMenu = getSampleMovieMenu()

    // 모든 메뉴 비활성화
    expect(searchMenu).toHaveClass('text-[var(--color-white-50)]')
    expect(sampleMovieMenu).toHaveClass('text-[var(--color-white-50)]')
    expect(searchMenu.parentElement).not.toHaveClass(menuActiveClass)
    expect(sampleMovieMenu.parentElement).not.toHaveClass(menuActiveClass)
  })
})
