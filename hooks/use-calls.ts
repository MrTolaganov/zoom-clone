import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useEffect, useState } from 'react'

export default function useCalls() {
  const [calls, setCalls] = useState<Call[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()
  const client = useStreamVideoClient()

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.id) return

      try {
        setIsLoading(true)

        const { calls } = await client.queryCalls({
          sort: [{ field: 'starts_at', direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [{ created_by_user_id: user.id }, { members: { $in: [user.id] } }],
          },
        })

        setCalls(calls)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCalls()
  }, [client, user?.id])

  const now = new Date()

  const previousCalls = calls.filter(
    ({ state: { startsAt, endedAt } }) => (startsAt && new Date(startsAt) < now) || !!endedAt
  )

  const upcomingCalls = calls.filter(
    ({ state: { startsAt } }) => startsAt && new Date(startsAt) > now
  )

  return { isLoading, previousCalls, upcomingCalls, callRecordings: calls }
}
