import { CallLayoutType } from '@/types'
import { PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk'

interface Props {
  layout: CallLayoutType
}

export default function CallLayout({ layout }: Props) {
  switch (layout) {
    case 'grid':
      return <PaginatedGridLayout />
    case 'speaker-left':
      return <SpeakerLayout participantsBarPosition={'right'} />
    default:
      return <SpeakerLayout participantsBarPosition={'left'} />
  }
}
