import CallList from '@/components/shared/call-list'

export default function Page() {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold'>Previous</h1>
      <CallList type='previous' />
    </section>
  )
}
