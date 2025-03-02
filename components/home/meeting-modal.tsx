import { ReactNode } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

interface Props {
  isOpen: boolean
  onClose: () => void
  title: string
  className?: string
  children?: ReactNode
  buttonText?: string
  image?: string
  buttonIcon?: string
  handleClick?: () => void
}

export default function MeetingModal({
  isOpen,
  onClose,
  title,
  className,
  children,
  buttonIcon,
  buttonText,
  image,
  handleClick,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white'>
        <div className='flex flex-col gap-6'>
          {image && (
            <div className='mx-auto'>
              <Image src={image} alt='Image' width={72} height={72} />
            </div>
          )}
          <DialogTitle className={cn('text-3xl font-bold leading-[42px]', className)}>
            {title}
          </DialogTitle>
          <DialogDescription />
          {children}
          <Button
            className='bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0'
            onClick={handleClick}
          >
            {buttonIcon && <Image src={buttonIcon} alt='Button icon' width={13} height={13} />}
            &nbsp; {buttonText || 'Schedule Meeting'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
