import type { PropsWithChildren } from "react";

export function Title({ children }: PropsWithChildren) {
  return <h1 className='text-lg font-bold'>{children}</h1>
}
