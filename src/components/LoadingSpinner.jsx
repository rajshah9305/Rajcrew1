import { Loader } from "lucide-react"

const LoadingSpinner = ({ size = "default", text = "Loading..." }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-8 h-8",
    large: "w-12 h-12",
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader className={`${sizeClasses[size]} animate-spin text-blue-600 mb-2`} />
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  )
}

export default LoadingSpinner
