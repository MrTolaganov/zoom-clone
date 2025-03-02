import { CallLayoutType } from '@/types'
import { useState } from 'react'
import CallLayout from './call-layout'
import { cn } from '@/lib/utils'
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  useCallStateHooks,
} from '@stream-io/video-react-sdk'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LayoutList, Users } from 'lucide-react'
import { layouts } from '@/constants'
import { useRouter, useSearchParams } from 'next/navigation'
import EndCallButton from './end-call-button'
import Loader from '../shared/loader'

export default function MeetingRoom() {
  const searchParams = useSearchParams()
  const isPersonalRoom = !!searchParams.get('personal')
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
  const [showParticipants, setShowParticipants] = useState(false)
  const { useCallCallingState } = useCallStateHooks()
  const callingState = useCallCallingState()
  const router = useRouter()

  if (callingState !== CallingState.JOINED) return <Loader />

  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className='relative flex size-full items-center justify-center'>
        <div className='flex size-full max-w-[1000px] items-center'>
          <CallLayout layout={layout} />
        </div>
        <div className={cn('h-[calc(100vh-86px)] hidden ml-2', showParticipants && 'show-block')}>
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
        <DropdownMenu>
          <div className='flex items-center'>
            <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
              <LayoutList size={20} className='text-white' />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className='bg-dark-1 text-white border-none'>
            {layouts.map(item => (
              <div key={item}>
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className='border-dark-1' />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setShowParticipants(prev => !prev)}>
          <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
            <Users size={20} className='text-white' />
          </div>
        </button>
        <CallControls onLeave={() => router.push('/')} />
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  )
}
