'use client'

import { useState } from 'react'
import HomeCard from './home-card'
import { homeCards } from '@/constants'
import { useRouter } from 'next/navigation'
import MeetingModal from './meeting-modal'
import { MeetingState } from '@/types'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { toast } from 'sonner'
import { Textarea } from '../ui/textarea'
import ReactDatePicker from 'react-datepicker'
import { Input } from '../ui/input'

export default function MeetingTypeList() {
  const [meetingState, setMeetingState] = useState<MeetingState>()
  const router = useRouter()
  const { user } = useUser()
  const client = useStreamVideoClient()
  const [values, setValues] = useState({ dataTime: new Date(), description: '', link: '' })
  const [callDetails, setCallDetails] = useState<Call>()

  const createMeeting = async () => {
    if (!user || !client) return

    try {
      if (!values.dataTime) {
        toast('Please select a date and time')
        return
      }

      const id = crypto.randomUUID()
      const call = client.call('default', id)

      if (!call) throw new Error('Failed to create call')

      const startsAt = values.dataTime.toISOString() || new Date(Date.now()).toISOString()
      const description = values.description || 'Instant meeting'

      await call.getOrCreate({ data: { starts_at: startsAt, custom: { description } } })

      setCallDetails(call)

      if (!values.description) {
        router.push(`/meeting/${call.id}`)
      }

      toast('Meeting created')
    } catch (error) {
      console.log(error)
      toast('Failed to create meeting')
    }
  }

  const copyLinkHandler = () => {
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
    navigator.clipboard.writeText(meetingLink)
    toast('Link copied')
  }

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5'>
      {homeCards.map(({ title, description, img, meetingType, className }) => (
        <HomeCard
          key={title}
          title={title}
          description={description}
          img={img}
          className={className}
          handleClick={() =>
            meetingType ? setMeetingState(meetingType as MeetingState) : router.push('/recordings')
          }
        />
      ))}
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title='Start an instant meeting'
        className='text-center'
        buttonText='Start Meeting'
        handleClick={createMeeting}
      />
      {callDetails ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title='Meeting Created'
          className='text-center'
          image='/icons/checked.svg'
          buttonIcon='/icons/copy.svg'
          buttonText='Copy Meeting Link'
          handleClick={copyLinkHandler}
        />
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title='Create Meeting'
          handleClick={createMeeting}
        >
          <div className='flex flex-col gap-2.5'>
            <label className='text-base text-normal leading-[22px] text-sky-2'>
              Add a description
            </label>
            <Textarea
              className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
              onChange={e => setValues({ ...values, description: e.target.value })}
            />
          </div>
          <div className='flex flex-col gap-2.5 w-full'>
            <label className='text-base text-normal leading-[22px] text-sky-2'>
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dataTime}
              onChange={date => setValues({ ...values, dataTime: date! })}
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15}
              timeCaption='time'
              dateFormat={'MMMM d, yyyy h:mm aa'}
              className='w-full rounded bg-dark-3 p-2 focus:outline-none'
            />
          </div>
        </MeetingModal>
      )}
      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title='Type the link here'
        className='text-center'
        buttonText='Join Meeting'
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder='Meeting link'
          className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
          onChange={e => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModal>
    </section>
  )
}
