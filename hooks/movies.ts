import axios from 'axios'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { useQuery } from '@tanstack/react-query'

export type Movies = SimpleMovie[]
export interface SimpleMovie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}
export interface DetailedMovie {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: {
    Source: string
    Value: string
  }[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

const defaultMessage = 'Search for the movie title!'

export const useMoviesStore = create(
  combine(
    {
      inputText: '',
      searchText: '',
      message: defaultMessage
    },
    set => ({
      setInputText: (text: string) => set({ inputText: text }),
      setSearchText: (text: string) => set({ searchText: text }),
      setMessage: (message: string) => set({ message }),
      resetMovies: () =>
        set({
          inputText: '',
          searchText: '',
          message: defaultMessage
        })
    })
  )
)

export function useMovies() {
  const searchText = useMoviesStore(state => state.searchText)
  const setMessage = useMoviesStore(state => state.setMessage)
  // TODO: 데이터 패칭 및 캐싱 관리
  return useQuery<SimpleMovie[]>({
    queryKey: ['movies', searchText],
    queryFn: async function () {
      //검색어가 없는 경우 빈 데이터([])를 반환합니다.
      if (!searchText) return []

      ///api/movies?title=${searchText} 주소로 요청하면 영화 목록을 반환합니다.
      //데이터 패칭을 위해 fetch 함수 대신 axios 라이브러리를 사용합니다.
      const { data } = await axios.get(
        `/api/movies?title=${encodeURIComponent(searchText)}`
      )

      //패칭 데이터의 Response 속성이 False인 경우, 함께 포함된 Error 속성의 값을 에러 메시지로 표시합니다.
      const movies = data.Search || []
      if (data && data.Response === 'False') {
        const errMsg = data.Error || 'No Results'
        setMessage(errMsg)
        throw new Error(errMsg)
      } else {
        if (movies.length === 0) {
          setMessage('검색된 영화가 없습니다.')
        } else {
          setMessage('')
        }
      }

      return movies
    },

    //데이터 캐싱 시간을 1시간으로 설정합니다.
    staleTime: 60 * 60 * 1000,
    //쿼리 실패 시 재시도(retry) 횟수를 1번으로 설정합니다.
    retry: 1,
    enabled: !!searchText,
    initialData: []
  })
}
