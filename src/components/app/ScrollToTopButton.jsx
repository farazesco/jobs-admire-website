import { ImArrowUp } from 'react-icons/im'

const ScrollToTopButton = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex justify-center items-center w-12 h-12 bg-secondary rounded-full shadow-md"
    >
      <ImArrowUp className="w-6 h-6 text-primary" />
    </button>
  )
}

export default ScrollToTopButton
