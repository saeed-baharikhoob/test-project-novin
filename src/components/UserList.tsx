import {useNavigate} from "react-router-dom";

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

interface UserListProps {
    users: User[];

}

const UserList = ({users} : UserListProps) => {
    const navigate = useNavigate()
    const handelClick = (id:number)=>{
        navigate(`/show-user/${id}`)
    }
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                    <div key={user.id} className="bg-gray-200 p-4 rounded-lg cursor-pointer" onClick={()=>handelClick(user.id)}>
                        <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="rounded-full w-24 h-24 mx-auto mb-4" />
                        <div className="text-center">
                            <p className="font-bold">{`${user.first_name} ${user.last_name}`}</p>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default UserList