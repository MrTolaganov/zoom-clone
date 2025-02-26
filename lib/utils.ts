import { CallListType } from '@/types'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCalls(
  type: CallListType,
  upcomingCalls: Call[],
  previousCalls: Call[],
  recordings: CallRecording[]
) {
  switch (type) {
    case 'upcoming':
      return upcomingCalls
    case 'previous':
      return previousCalls
    case 'recordings':
      return recordings
    default:
      return []
  }
}

export function getNoCallsMessage(type: CallListType) {
  switch (type) {
    case 'upcoming':
      return 'No Upcoming Calls'
    case 'previous':
      return 'No Previous Calls'
    case 'recordings':
      return 'No Recordings'
    default:
      return ''
  }
}
