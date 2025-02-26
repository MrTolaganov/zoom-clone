import Meeting from '@/components/meeting/meeting'

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params

  return (
    <main className='h-screen w-full'>
      <Meeting id={id} />
    </main>
  )
}
