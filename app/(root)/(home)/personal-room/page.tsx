import RoomActions from '@/components/shared/room-actions'
import Table from '@/components/shared/table'
import { currentUser } from '@clerk/nextjs/server'

export default async function Page() {
  const user = await currentUser()
  const meetingId = user?.id
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold'>Personal Room</h1>
      <div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
        <Table title='Topic' description={`${user?.username}'s Meeting room`} />
        <Table title='Meeting ID' description={meetingId!} />
        <Table title='Invite Link' description={meetingLink} />
      </div>
      <RoomActions />
    </section>
  )
}
