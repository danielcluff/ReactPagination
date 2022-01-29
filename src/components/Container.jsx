export default function Container(props) {
  return (
    <div className="w-screen h-screen bg-gray-100 sm:p-20">
      {props.children}
    </div>
  )
}
