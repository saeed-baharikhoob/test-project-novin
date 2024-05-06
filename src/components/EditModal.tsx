import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {editUser, UserData} from "../utils/api/users/editUser.ts";
import {enqueueSnackbar} from "notistack";

interface EditModalProps{
    closeModal : ()=>void
    name:string,
    id:string
}

const EditModal = ({id,name,closeModal}:EditModalProps)=>{
    const [firstName, setFirstName] = useState<string>(name);
    const [job, setJob] = useState<string>("");
    const mutation = useMutation({
        mutationFn: editUser,
        onSuccess:()=>{
            enqueueSnackbar('update successfully')
            closeModal();
        }
    })
    const handleSaveChanges = () => {

        const data : UserData = {
            name:firstName,
            job:job

        }
        mutation.mutate({id:id,data:data})

    };
    return (
        <>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>;


                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">

                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                            Edit Name and Job
                                        </h3>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="border border-gray-300 rounded-md p-2 w-full"
                                                placeholder="First Name"
                                            />
                                            <input
                                                type="text"
                                                value={job}
                                                onChange={(e) => setJob(e.target.value)}
                                                className="mt-2 border border-gray-300 rounded-md p-2 w-full"
                                                placeholder="Last Name"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    onClick={handleSaveChanges}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    {mutation.isPending ? "...": "Save"}
                                </button>
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
    )
}
export default EditModal