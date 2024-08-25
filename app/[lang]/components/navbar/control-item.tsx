export default function ControlItem({children}: {children: React.ReactNode}) {
  // This is just a placeholder for controls like dark/light mode and language switcher
  return (
    <li className="float-left">
      <div className="grid w-12 h-12 place-items-center hover:bg-gray-800 md:w-16 md:h-16">
        {children}
      </div>
    </li>
  )
}