import { ReactNode } from 'react'

export interface ChildProps {
  children: ReactNode
}

export type MeetingState = 'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined

export type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

export type CallListType = 'upcoming' | 'previous' | 'recordings'
