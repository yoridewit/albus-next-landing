type CtaButtonProps = {
  label?: string
  variant?: 'primary' | 'inverse'
}

export const ALBUS_NEXT_URL = 'https://www.albusnext.nl'

export default function CtaButton({ label = 'Start met testen', variant = 'primary' }: CtaButtonProps) {
  const styles =
    variant === 'inverse'
      ? 'bg-inverse-on-surface text-on-surface hover:opacity-90'
      : 'bg-primary-container text-on-primary hover:opacity-90'
  return (
    <a
      href={ALBUS_NEXT_URL}
      className={`inline-block px-6 py-3 font-semibold rounded-lg transition-opacity ${styles}`}
    >
      {label}
    </a>
  )
}
