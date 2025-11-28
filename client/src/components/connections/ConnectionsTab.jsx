const ConnectionsTab = ({tabs, activeTab, setActiveTab}) => {
  return (
    <div className='flex flex-wrap items-center border border-gray-200 rounded-md p-2 bg-white shadow-sm'>
          {
            tabs.map((tab, i)=>
              <button key={i} onClick={()=>setActiveTab(tab.label)} className={`flex items-center px-3 py-1 rounded-md text-sm transition-colors cursor-pointer ${activeTab == tab.label ? "bg-white text-black font-medium" : "text-gray-500 hover:text-black"}`}>
                <tab.Icon className='size-5'/>
                <span className='ml-1'>{tab.label}</span>
              </button>
            )
          }
        </div>
  )
}

export default ConnectionsTab
