import classNames from "classnames"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  fontFamilyClass?: string
}

export default function Button(props: ButtonProps) {
  const { onClick, text, fontFamilyClass, type = "button", disabled } = props

  return (
    <button
      className={classNames(
        'p-4 text-white bg-primary rounded-md hover:bg-zinc-900 hover:text-primary transition-colors shadow-md shadow-pink'
        , fontFamilyClass
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