import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

interface Props {
  setIsSetupComplete: (isSetupComplete: boolean) => void
}

export default function MeetingSetup({ setIsSetupComplete }: Props) {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false)

  const call = useCall()

  if (!call) {
    throw new Error('UseCall must be used within StreamCall component')
  }

  const joinHandler = () => {
    call.join()
    setIsSetupComplete(true)
  }

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable()
      call?.microphone.disable()
    } else {
      call?.camera.enable()
      call?.microphone.enable()
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone])

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center gap-3 text-white py-8'>
      <h1 className='text-2xl font-bold'>Setup</h1>
      <VideoPreview />
      <div className='flex h-16 items-center justify-center gap-3'>
        <label
          htmlFor='mic-cam-toggle'
          className='flex items-center justify-center gap-2 font-medium'
        >
          <input
            type='checkbox'
            id='mic-cam-toggle'
            checked={isMicCamToggledOn}
            onChange={e => setIsMicCamToggledOn(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button className='rounded-md bg-green-500 px-4 py-2.5 ' onClick={joinHandler}>
        Join meeting
      </Button>
    </div>
  )
}
