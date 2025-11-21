import sponsored_img from '../../assets/images/sponsored_img.png'

const Sponsored = () => {
  return (
    <div className="flex flex-col gap-2 p-4 max-w-xs rounded-md bg-white text-xs shadow">
      <h1 className="text-slate-800 font-semibold">Sponsored</h1>
      <img src={sponsored_img} className="h-50 w-70 rounded-md"/>
      <p className='text-slate-600'>Email Marketing</p>
      <p className='text-slate-400'>Upercharge your marketing with a powerful, easy-to-use platform built for results.</p>
    </div>
  )
}

export default Sponsored
