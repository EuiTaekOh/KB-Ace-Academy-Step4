import { render, screen } from '@testing-library/react'
import Headline from '@/components/Headline'

// 폰트 모킹
jest.mock('@/styles/fonts', () => ({
  oswald: {
    className: 'oswald-font'
  }
}))

describe('<Headline>', () => {
  // 기본 렌더링 확인
  test('Headline 컴포넌트가 정상적으로 렌더링된다', () => {
    render(<Headline />)

    const headline = screen.getByTestId('headline')
    expect(headline).toBeInTheDocument()
  })

  test('메인 제목이 정상적으로 렌더링된다', () => {
    render(<Headline />)

    const mainTitle = screen.getByRole('heading', { level: 1 })
    expect(mainTitle).toBeInTheDocument()

    const headingText = mainTitle.textContent
    expect(headingText).toContain('OMDb API')
    expect(headingText).toContain('THE OPEN')
    expect(headingText).toContain('MOVIE DATABASE')
  })
})
