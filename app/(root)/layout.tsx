import StreamClientProvider from '@/components/providers/stream-cllient.provider'
import { ChildProps } from '@/types'

export default function Layout({ children }: ChildProps) {
  return (
    <main>
      <StreamClientProvider>{children}</StreamClientProvider>
    </main>
  )
}
