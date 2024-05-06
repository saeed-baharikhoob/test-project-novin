import {useState} from "react";
import UserList from "../components/UserList.tsx";
import Pagination from "../components/Pagination.tsx";
import {useQuery} from "@tanstack/react-query";
import {getUsers} from "../utils/api/users/getUsers.ts";
import {enqueueSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";

const List = ()=>{
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate()
    const {data, isLoading, error, isFetching} = useQuery({queryKey: ["get-user-list",currentPage], queryFn: () => getUsers(currentPage)})

    const handlePageChange = (page: number) => {
         setCurrentPage(page);
    };
 const handleLogout = () =>{
     enqueueSnackbar('logout successfully')
     navigate('/login')
     localStorage.removeItem('token')
 }
    return (

        <div className={'flex flex-col justify-center items-center min-h-screen px-4 '}>
            <div className={'flex absolute top-2 right-2'}>
                <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                        onClick={handleLogout}>Logout
                </button>
            </div>
            {(isLoading || isFetching) && <div>Loading...</div>}

            {(error) && <div>Error loading data</div>}

            {data?.data && <>
                <UserList users={data?.data?.data}/>
                <Pagination  currentPage={currentPage}
                             totalPages={data?.data?.total_pages}
                             onPageChange={handlePageChange} />
            </>}

        </div>
    );

}
export default List