'use client'

import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import { useState } from 'react'
import MeetingRoom from './meeting-room'
import MeetingSetup from './meeting-setup'
import useCallId from '@/hooks/use-call-id'
import Loader from '../shared/loader'

interface Props {
  id: string
}

export default function Meeting({ id }: Props) {
  const { isLoaded } = useUser()
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const { call, isCallLoading } = useCallId(id)

  if (!isLoaded || isCallLoading) return <Loader />

  return (
    <StreamCall call={call}>
      <StreamTheme>
        {isSetupComplete ? (
          <MeetingRoom />
        ) : (
          <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
        )}
      </StreamTheme>
    </StreamCall>
  )
}
