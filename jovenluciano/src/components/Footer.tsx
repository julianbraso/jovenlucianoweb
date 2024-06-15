export const Footer = () => {
    return <div className="w-full flex items-center justify-center bg-[#7700ff]">
    <div className="w-[90%] h-14 flex items-center justify-between">
      {/* <img className="h-8" src={footer}></img> */}
      <a className="text-[#00ff00] hover:text-green-300 w-fit underline" href="mailto:contact@jovenluciano.com">contact@jovenluciano.com</a>
      <div className="w-fit text-[#00ff00] hover:text-green-300 pr-1">
        <a className="underline" href="https://instagram.com/jovenluciano">Instagram</a>
      </div>
    </div>
  </div>
}