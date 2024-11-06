import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPaste, updateToPaste } from '../features/pasteSlice';

function Home() {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchPaams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const allPaste = useSelector(state=>state.paste.pastes);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if(pasteId){
            const paste = allPaste.find((p)=>p._id===pasteId);
            setTitle(paste.title);
            setValue(paste.content);
        }
    },[pasteId])




    function createPaste(){
        const paste = {
            title:title,
            content:value,
            _id:pasteId || 
                Date.now().toString(36),
             createAt:new Date().toISOString(),
        }
        if(pasteId){
            //update 
            dispatch(updateToPaste(paste))
        }
        else{
            //create 
            dispatch(addToPaste(paste))
        }
        //after creation or updation
        setTitle('');
        setValue('');
        setSearchPaams({});
    }


    return (
        <div>
            <div className='mt-3  flex flex-row gap-7 place-content-between'>
                <input className='bg-black p-1 pl-4 text-white rounded-2xl w-[72%]'
                    type="text"
                    placeholder='enter the title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />

                <button onClick={createPaste}
                    className='rounded-2xl gap-1'>
                    {
                        pasteId ? "Update My Paste" : "Create My Paste"
                    }
                </button>
            </div>
            <div>
                <textarea
                    className='rounded-2xl mt-4 min-w-[700px] pl-4 pt-2  border-2  border-black border-solid'
                    value={value}
                    placeholder='Enter the content'
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}

                >

                </textarea>
            </div>

        </div>
    )
}

export default Home
