import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const ViewPaste = () => {


  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p) => p._id === id)[0];



  return (
    <div>
      <div className='flex flex-row'>

        <input type="text"
          className='bg-black text-white p-2 mt-1 rounded-2xl w-[600px]'
          placeholder='enter the title'
          value={paste.title}
          disabled
        />

      </div>
      <div>
        <div>


          <button onClick={() => {
            navigator.clipboard.writeText(paste.content)
            toast.success("copied to clipboard")
          }}>
            Copy
          </button>
        </div>

        <textarea
          className='bg-black text-white p-2 m-3 w-[600px] rounded-xl'
          placeholder='enter the text'
          value={paste.content}
          disabled
          rows={20}
        />

      </div>
    </div>
  )
}

export default ViewPaste