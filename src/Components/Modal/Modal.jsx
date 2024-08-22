import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { UserToken } from '../../Context/UserTokenProvider';
function Modal({ setShowModal, setNotes, updateValues, isUpdate, setIsUpdate }) {
    const { token } = useContext(UserToken);
    const validateInputs = Yup.object({
        title: Yup.string().required("Title is required!"),
        content: Yup.string().required("Content is required!"),
    })
    const closeModal = () => {
        setShowModal(false);
        setIsUpdate(false);
    }
    const callAPI = async (userValues) => {
        if (isUpdate === false) {
            try {
                const { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`, userValues, {
                    headers: {
                        token: "3b8ny__" + token
                    }
                })
                console.log(data.note);
                setNotes((prevState) => [...prevState, data.note]);
                setShowModal(false);
            } catch (error) {
                console.log(error);
            }
        }
        else {
            try {
                const { data } = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${updateValues.id}`, userValues, {
                    headers: {
                        token: "3b8ny__" + token
                    }
                })
                console.log(data);
                setShowModal(false)
                setIsUpdate(false);
                setNotes((prevState) => prevState.map((note) => note._id === data.note._id ? data.note : note))
            } catch (error) {
                console.log(error);
                setIsUpdate(false);
            }
        }
    }
    const formModal = useFormik({
        initialValues: {
            title: isUpdate ? updateValues.title : "",
            content: isUpdate ? updateValues.content : "",
        },
        validationSchema: validateInputs,
        onSubmit: callAPI,
    })
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <form
                        onSubmit={formModal.handleSubmit}
                        className="border-0 shadow-lg relative flex flex-col w-full dark:bg-[#171717] rounded outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold text-white capitalize">
                                {isUpdate ? "Update your current note" : "Add a new note"}
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="p-3 flex items-center justify-center">
                            <label htmlFor="title" className='mr-3 text-white'>Title</label>
                            <input name="title" id="title"
                                onChange={formModal.handleChange}
                                onBlur={formModal.handleBlur}
                                value={formModal.values.title}
                                className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6'
                            ></input>

                        </div>
                        {formModal.errors.title && formModal.touched.title && <p className='text-red-500 my-4 text-center'>
                            {formModal.errors.title}
                        </p>}
                        <div className="p-6 flex items-center justify-center">
                            <label htmlFor="content" className='mr-3 text-white'>Content</label>
                            <textarea name="content" id="content"
                                rows={5}
                                onChange={formModal.handleChange}
                                onBlur={formModal.handleBlur}
                                value={formModal.values.content}
                                className='block resize-y w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6'
                            ></textarea>
                        </div>
                        {formModal.errors.content && formModal.touched.content && <p className='text-red-500 my-4 text-center'>
                            {formModal.errors.content}
                        </p>}
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 disabled:opacity-80 disabled:cursor-not-allowed text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="submit"
                                disabled={!(formModal.isValid && formModal.dirty)}
                            >
                                {isUpdate ? "update note" : "add note"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default Modal