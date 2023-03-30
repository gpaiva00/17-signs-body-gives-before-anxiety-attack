import classNames from "classnames"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  poppinsClassName?: string
}

export default function Button(props: ButtonProps) {
  const { onClick, text, poppinsClassName, type = "button", disabled } = props

  return (
    <button
      className={classNames(
        'p-4 text-white bg-primary rounded-md hover:bg-zinc-900 hover:text-primary transition-colors shadow-md shadow-pink'
        , poppinsClassName
        , { 'opacity-80': disabled }
      )}
      onClick={onClick}
      type={type}
      {...props}
    >
      {text}
    </button>
  )
}