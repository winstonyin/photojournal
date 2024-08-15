export default function ControlItem({children}: {children: React.ReactNode}) {
  // This is just a placeholder for controls like dark/light mode and language switcher
  return (
    <li className="float-left">
      <div className="grid w-16 h-16 place-items-center hover:bg-gray-800">
        {children}
      </div>
    </li>
  )
}