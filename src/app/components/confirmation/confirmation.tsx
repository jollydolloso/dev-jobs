import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CircleAlertIcon, CircleCheckIcon, Loader2Icon } from 'lucide-react'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type JSX,
  type PropsWithChildren,
  type ReactNode,
} from 'react'

type AlertIconProps = {
  variant: 'danger' | 'success'
}

const AlertIcon = ({ variant }: AlertIconProps) => {
  let icon: JSX.Element

  switch (variant) {
    case 'danger':
      icon = <CircleAlertIcon className="size-6 text-destructive" />
      break
    case 'success':
      icon = <CircleCheckIcon className="size-6 text-primary" />
      break
  }

  return (
    <div
      className={cn('p-1.5 rounded-full', {
        'bg-destructive/10': variant === 'danger',
        'bg-primary/10': variant === 'success',
      })}
    >
      <div
        className={cn('p-1.5 rounded-full', {
          'bg-destructive/20': variant === 'danger',
          'bg-primary/20': variant === 'success',
        })}
      >
        {icon}
      </div>
    </div>
  )
}

type BaseProps = {
  title: string
  description: ReactNode
  confirmButtonLabel?: string | false
  cancelButtonLabel?: string | false
  onConfirm: () => Promise<void>
}

type ConfirmationProps = BaseProps & AlertIconProps

type ContextProps = {
  confirm: (props: ConfirmationProps) => Promise<void>
}

const ConfirmationContext = createContext({} as ContextProps)

export const ConfirmationProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false)
  const [confirmProps, setConfirmProps] = useState<ConfirmationProps | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(false)

  const confirm = async ({
    confirmButtonLabel = 'Confirm',
    cancelButtonLabel = 'Cancel',
    ...props
  }: ConfirmationProps) => {
    setConfirmProps({ ...props, confirmButtonLabel, cancelButtonLabel })
    setIsOpen(true)
  }

  const handleConfirm = async () => {
    setIsLoading(true)
    await confirmProps?.onConfirm()
    setIsLoading(false)
    setIsOpen(false)
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(false)
      setTimeout(() => setConfirmProps(null), 100)
    }
  }, [isOpen])

  return (
    <ConfirmationContext.Provider value={{ confirm }}>
      {children}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="sm:max-w-md gap-8">
          <AlertDialogHeader className="text-center sm:text-center items-center justify-center">
            <AlertIcon variant={confirmProps?.variant ?? 'danger'} />
            <AlertDialogTitle className="text-base font-medium">
              {confirmProps?.title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              {confirmProps?.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            {confirmProps?.cancelButtonLabel && (
              <AlertDialogCancel
                onClick={handleCancel}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'flex-1'
                )}
              >
                {confirmProps?.cancelButtonLabel}
              </AlertDialogCancel>
            )}

            {confirmProps?.confirmButtonLabel && (
              <AlertDialogAction
                onClick={handleConfirm}
                className={cn(
                  buttonVariants({ variant: 'default', size: 'lg' }),
                  {
                    'bg-primary hover:bg-primary/90':
                      confirmProps?.variant === 'success',
                    'bg-destructive hover:bg-destructive/90':
                      confirmProps?.variant === 'danger',
                  },
                  'flex-1'
                )}
                disabled={isLoading}
              >
                {isLoading
                  ? (
                      <Loader2Icon className="size-4 animate-spin" />
                    )
                  : (
                      confirmProps?.confirmButtonLabel
                    )}
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmationContext.Provider>
  )
}

export const useConfirmation = () => {
  return useContext(ConfirmationContext)
}