import { ReactNode } from 'react'

export interface AnchorProps {
  href: string
}

export interface ButtonAnchorProps extends AnchorProps {
  children: ReactNode
}

export const ButtonAnchor = ({ children, href }: ButtonAnchorProps) => {
  return (
    <>
      <a
        href={href}
        className="rounded bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {children}
      </a>
    </>
  )
}
