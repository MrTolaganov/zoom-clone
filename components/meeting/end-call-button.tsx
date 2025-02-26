import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

export default function EndCallButton() {
  const call = useCall()
  const router = useRouter()

  const { useLocalParticipant } = useCallStateHooks()
  const localParticipant = useLocalParticipant()

  const isMeetingOwner =
    localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id

  const endCallHandler = async () => {
    await call?.endCall()
    router.push('/')
  }

  if (!isMeetingOwner) return null

  return (
    <Button className='bg-red-500 max-md:mb-8' onClick={endCallHandler}>
      End call for everyone
    </Button>
  )
}
