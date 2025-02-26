export const sidebarLinks = [
  {
    label: 'Home',
    route: '/',
    imgUrl: '/icons/home.svg',
  },

  {
    label: 'Upcoming',
    route: '/upcoming',
    imgUrl: '/icons/upcoming.svg',
  },
  {
    label: 'Previous',
    route: '/previous',
    imgUrl: '/icons/previous.svg',
  },
  {
    label: 'Recordings',
    route: '/recordings',
    imgUrl: '/icons/video.svg',
  },
  {
    label: 'Personal Room',
    route: '/personal-room',
    imgUrl: '/icons/add-personal.svg',
  },
]

export const homeCards = [
  {
    title: 'New Meeting',
    description: 'Start an instant meeting',
    img: '/icons/add-meeting.svg',
    meetingType: 'isInstantMeeting',
    className: 'bg-orange-1',
  },
  {
    title: 'Schedule Meeting',
    description: 'Plan your meeting',
    img: '/icons/schedule.svg',
    meetingType: 'isScheduleMeeting',
    className: 'bg-blue-1',
  },
  {
    title: 'View Recordings',
    description: 'Check out your recordings',
    img: '/icons/recordings.svg',
    meetingType: undefined,
    className: 'bg-purple-1',
  },
  {
    title: 'Join Meeting',
    description: 'Via invitation link',
    img: '/icons/join-meeting.svg',
    meetingType: 'isJoiningMeeting',
    className: 'bg-yellow-1',
  },
]

export const layouts = ['Grid', 'Speaker-Left', 'Speaker-Right']

export const avatarImages = [
  '/images/avatar-1.jpeg',
  '/images/avatar-2.jpeg',
  '/images/avatar-3.png',
  '/images/avatar-4.png',
  '/images/avatar-5.png',
]
