
const ConnectionsStats = ({stats}) => {
  return (
        <div className='mb-8 flex flex-wrap gap-6'>
          {
            stats.map((item, i)=>
              <div key={i} className='flex flex-col items-center justify-center gap-1 h-20 w-40 border border-gray-200 rounded-lg bg-indigo-500 transition hover:bg-indigo-600 text-white shadow'>
                <p>{item.value.length}</p>
                <p className='text-white'>{item.label}</p>
              </div>
            )
          }
        </div>
  )
}

export default ConnectionsStats
