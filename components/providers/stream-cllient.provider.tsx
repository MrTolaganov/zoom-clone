'use client'

import { tokenProvider } from '@/actions/stream.action'
import { ChildProps } from '@/types'
import { useUser } from '@clerk/nextjs'
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk'
import { useEffect, useState } from 'react'
import Loader from '../shared/loader'

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY

export default function StreamClientProvider({ children }: ChildProps) {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>()
  const { isLoaded, user } = useUser()

  useEffect(() => {
    if (!isLoaded || !user) return
    if (!apiKey) throw new Error('Stream API key missing')

    const client = new StreamVideoClient({
      apiKey,
      user: { id: user?.id, name: user?.username || user?.id, image: user?.imageUrl },
      tokenProvider,
    })

    setVideoClient(client)
  }, [isLoaded, user])

  if (!videoClient) return <Loader />

  return <StreamVideo client={videoClient}>{children}</StreamVideo>
}
