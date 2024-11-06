import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeToPaste } from '../features/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Paste() {
  const pastes = useSelector((state)=> state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');


  const filterData = pastes.filter(
    (paste)=>paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeToPaste(pasteId))
  }

  return (
    <div>
      <input
        className='mt-5  rounded-2xl p-1  pl-4 bg-black text-white w-[600px]'
        type="serach"
        value={searchTerm}
        placeholder='search here'
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='flex flex-col gap-5 mt-3'>
        {
          filterData.length > 0 &&
          filterData.map(
            (paste) => {
              return (
                <div className='border-2 border-black border-solid ' key={paste?._id}>
                  <div >
                    {paste.title}
                  </div>
                  <div>
                    {paste.content}
                  </div>
                  <div className='flex flex-row gap-2 place-content-evenly p-2 '>
                    <button>
                      <Link to={`/?pasteId=${paste?._id}`}>
                      Edit
                      </Link>
                      </button>
                    <button>
                      <Link to={`/pastes/${paste?._id}`}>View</Link>
                    </button>
                    <button onClick={() => handleDelete(paste?._id)}>Delete</button>
                    <button onClick={() => {
                      navigator.clipboard.writeText(paste?.content)
                      toast.success("Copied to clipboard");
                    }}>Copy</button>
                    <button onClick={() => {
                      const fullUrl = `${window.location.origin}/pastes/${paste._id}`;
                      navigator.clipboard.writeText(fullUrl);
                      toast.success("Link is copied");
                    }}>
                      Share
                    </button>
                  </div>
                  <div>
                    {paste.createAt}
                  </div>
                </div>
              )
            }
          )
        }

      </div>
    </div>
  )
}

export default Paste
