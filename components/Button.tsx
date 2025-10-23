import { twMerge } from 'tailwind-merge'
import Loader from '@/components/Loader'

export default function Button({
  children,
  color,
  loading,
  loadingColor,
  ...restProps
}: Readonly<
  {
    children: React.ReactNode
    color?: 'primary'
    loading?: boolean
    loadingColor?: string
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>) {
  const colorClasses = {
    primary:
      'bg-[var(--color-primary)] text-black hover:bg-[var(--color-hover)] hover:text-white'
  }

  return (
    <button
      {...restProps}
      className={twMerge(
        'flex h-[50px] min-w-[100px] cursor-pointer items-center justify-center rounded border-none bg-[var(--color-area)] px-5 text-sm font-bold text-white transition-[background] duration-300 outline-none hover:bg-[var(--color-hover)]',
        color && colorClasses[color as keyof typeof colorClasses],
        restProps.className
      )}>
      {loading ? (
        <Loader
          color={loadingColor}
          size={24}
        />
      ) : (
        children
      )}
    </button>
  )
}
