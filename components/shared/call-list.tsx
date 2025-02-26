'use client'

import useCalls from '@/hooks/use-calls'
import { getCalls, getNoCallsMessage } from '@/lib/utils'
import { CallListType } from '@/types'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import MeetingCard from './meeting-card'
import Loader from './loader'
import { toast } from 'sonner'

interface Props {
  type: CallListType
}

export default function CallList({ type }: Props) {
  const { isLoading, previousCalls, upcomingCalls, callRecordings } = useCalls()
  const [recordings, setRecordings] = useState<CallRecording[]>([])
  const router = useRouter()

  const calls = getCalls(type, upcomingCalls, previousCalls, recordings)
  const noCallsMessage = getNoCallsMessage(type)

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings.map(callRecording => callRecording.queryRecordings())
        )

        const recordings = callData
          .filter(call => call.recordings.length > 0)
          .flatMap(call => call.recordings)

        setRecordings(recordings)
      } catch (error) {
        console.log(error)
        toast('Try again later')
      }
    }

    if (type === 'recordings') fetchRecordings()
  }, [type, callRecordings])

  if (isLoading) return <Loader />

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 gap-5'>
      {calls && calls.length > 0 ? (
        calls.map((call: Call | CallRecording, idx) => (
          <MeetingCard
            key={idx}
            icon={
              type === 'previous'
                ? '/icons/previous.svg'
                : type === 'upcoming'
                ? '/icons/upcoming.svg'
                : '/icons/recordings.svg'
            }
            title={
              (call as Call).state?.custom?.description ||
              (call as CallRecording).filename?.substring(0, 20) ||
              'No Description'
            }
            date={
              (call as Call).state?.startsAt?.toLocaleString() ||
              (call as CallRecording).start_time?.toLocaleString()
            }
            isPreviousMeeting={type === 'previous'}
            link={
              type === 'recordings'
                ? (call as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(call as Call).id}`
            }
            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
            buttonText={type === 'recordings' ? 'Play' : 'Start'}
            handleClick={
              type === 'recordings'
                ? () => router.push(`${(call as CallRecording).url}`)
                : () => router.push(`/meeting/${(call as Call).id}`)
            }
          />
        ))
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  )
}
