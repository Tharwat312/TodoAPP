import React, { useContext, useEffect, useState } from 'react'
import notFound from '../../assets/notfounddark.png'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { CiStickyNote } from "react-icons/ci";
import Modal from '../../Components/Modal/Modal';
import axios from 'axios';
import { UserToken } from '../../Context/UserTokenProvider';
const Home = () => {
  const [notes, setNotes] = useState([]);
  const { token } = useContext(UserToken);
  const [showModal, setShowModal] = useState(false);
  const [updateValues, setUpdateValues] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const sendUpdateValues = (id, title, content) => {
    setUpdateValues({ id, title, content });
    setShowModal(true);
    setIsUpdate(true);
  }
  const handleModal = () => {
    setShowModal(true);
  }
  const deleteNote = async (noteID) => {
    try {
      await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${noteID}`, {
        headers: {
          token: "3b8ny__" + token
        }
      })
      const filteredArray = notes.filter((note) => note._id !== noteID);
      setNotes(filteredArray);
    }
    catch (error) {
      console.log(error)
    }
  }
  const getUserNotes = async () => {
    try {
      const { data } = await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`, {
        headers: {
          token: "3b8ny__" + localStorage.getItem("UserToken")
        }
      })
      setNotes(data.notes);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  useEffect(() => {
    token && getUserNotes();
  }, [token]);
  return (
    <>
      <div className="hover:bg-sky-950 duration-300 cursor-pointer absolute top-5 right-5 text-gray-200 rounded px-5 py-3 bg-[#005dcb] flex items-center justify-center">
      </div>
      {/*No notes found*/}
      {notes.length === 0 ? <div className='text-center'>
        <img src={notFound} className='w-1/3 mx-auto' />
        <p className='text-gray-200 p-3 text-2xl'>No Notes Found</p>
      </div> :
        <div className='container mx-auto mt-20'>
          <div className="row w-4/5 mx-auto">
            {/*Notes map*/}
            {notes.map((note) => <div key={note._id} className='w-full md:w-1/2 lg:w-1/4 xl:w-1/4 text-white text-center p-4'>
              <div className="inner flex flex-col rounded-lg bg-[#202020] p-6">
                <div className="flex items-center font-bold justify-between border-b-2 text-3xl mb-5 flex-col">
                  <h2 className='capitalize mb-2'>{note.title}</h2>
                  <div className="flex w-full justify-between">
                    <MdDelete onClick={() => {
                      deleteNote(note._id)
                    }} className='cursor-pointer' />
                    <FaEdit onClick={() => {
                      sendUpdateValues(note._id, note.title, note.content)
                    }} className='cursor-pointer' />
                  </div>
                </div>
                <p className='text-xl'>{note.content}</p>
              </div>
            </div>)}
          </div>
        </div>}
      <button
        className="hover:bg-sky-950 duration-300 cursor-pointer absolute top-5 right-5 text-gray-200 rounded px-5 py-3 bg-[#005dcb] flex items-center justify-center"
        type="button"
        onClick={handleModal}
      >
        <CiStickyNote className='mr-3' />
        Add Note
      </button>
      {showModal && <Modal setShowModal={setShowModal} setNotes={setNotes} updateValues={updateValues} isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
      />}
    </>
  )
}

export default Home;