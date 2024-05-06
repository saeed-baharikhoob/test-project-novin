import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getUser} from "../utils/api/users/getUser.ts";
import {useState} from "react";
import EditModal from "../components/EditModal.tsx";
import {deleteUser} from "../utils/api/users/deleteUser.ts";
import {enqueueSnackbar} from "notistack";

const ShowUser = ()=>{
    const { id } = useParams();
    const navigate = useNavigate()
    const userId = id ?? ""
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {data, isLoading, error, isFetching} = useQuery({queryKey: ["get-user-list",id], queryFn: () => getUser(userId)})
    const mutation = useMutation({mutationFn: deleteUser,
        onSuccess:()=>{
            enqueueSnackbar('delete successfully')
            navigate('/list')
        }
    })
    const handelDelete = ()=>{
        mutation.mutate(userId)
    }
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (<div className={'min-h-screen  flex items-center justify-center'}>
        {(isLoading || isFetching) && <div>Loading...</div>}

        {(error) && <div>Error loading data</div>}
        {data?.data && <>
            <div className="bg-gray-100 ">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="px-4 py-5 ">
                        <h1 className="text-lg font-bold text-gray-800">{`${data.data?.data?.first_name} ${data.data?.data?.last_name}`}</h1>
                        <p className="mt-1 text-sm text-gray-600">{data.data?.data?.email}</p>
                    </div>
                    <div className="px-4 py-5 ">
                        <img src={data?.data?.data?.avatar} alt="Avatar"
                             className="w-32 h-32 mx-auto rounded-full"/>
                    </div>
                    <div className="px-4 py-5">
                        <p className="text-gray-700">{data.data?.support.text}</p>
                        <a href={data.data?.support.url} target="_blank"
                           className="text-blue-500">
                            Support
                        </a>
                    </div>
                    <div className='flex w-full justify-between'>
                        <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                                onClick={() => window.history.back()}>Back
                        </button>
                        <button className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded "
                                onClick={handelDelete}>{mutation.isPending? "..." : "delete"}
                        </button>
                        <button className=" bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded "
                                onClick={openModal}>edit
                        </button>
                    </div>
                    {isModalOpen && <EditModal id={userId} closeModal={closeModal}
                                               name={data.data?.data?.first_name}/>}
                </div>
            </div>
        </>}
    </div>)
}
export default ShowUser