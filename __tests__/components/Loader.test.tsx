import { render, screen } from '@testing-library/react'
import Loader from '@/components/Loader'

describe('<Loader>', () => {
  test('기본 컴포넌트가 정상적으로 렌더링된다', () => {
    render(<Loader />)
  })

  test('size props를 사용하지 않으면 기본 크기가 적용된다', () => {
    const size = 20
    render(<Loader />)
  })

  test('size props를 사용하면 해당 크기가 적용된다', () => {
    const size = 41
    render(<Loader size={size} />)
  })

  test('color props를 사용하지 않으면 기본 색상이 적용된다', () => {
    render(<Loader />)
  })

  test('color props를 사용하면 해당 색상이 적용된다', () => {
    render(<Loader color="#FF5733" />)
  })

  test('loading props가 false일 때 렌더링되지 않는다', () => {
    render(<Loader loading={false} />)
  })

  test('loading props가 true일 때 렌더링된다', () => {
    render(<Loader loading={true} />)
  })
})
