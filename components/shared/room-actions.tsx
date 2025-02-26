'use client'

import { toast } from 'sonner'
import { Button } from '../ui/button'
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import useCallId from '@/hooks/use-call-id'
import { useRouter } from 'next/navigation'

export default function RoomActions() {
  const { user } = useUser()
  const client = useStreamVideoClient()
  const { call } = useCallId(user?.id as string)
  const router = useRouter()
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${user?.id}?personal=true`

  const startRoom = async () => {
    if (!client || !user) return

    if (!call) {
      const newCall = client.call('default', user.id)
      await newCall.getOrCreate({ data: { starts_at: new Date().toISOString() } })
    }

    router.push(`/meeting/${user.id}?personal=true`)
  }

  const copyLinkHandler = () => {
    navigator.clipboard.writeText(meetingLink)
    toast('Link copied')
  }

  return (
    <div className='flex gap-5'>
      <Button className='bg-blue-1' onClick={startRoom}>
        Start Meeting
      </Button>
      <Button className='bg-dark-3' onClick={copyLinkHandler}>
        Copy Invitation
      </Button>
    </div>
  )
}
