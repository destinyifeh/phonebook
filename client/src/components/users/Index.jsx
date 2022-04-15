import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchUser} from '../Redux/userSlice';

export default function UserIndex(){
     
    const dispatch = useDispatch();

    const users = useSelector(state=>state.users.users)
    
    useEffect(()=>{
         dispatch(fetchUser());
    }, [dispatch]);

    return(
        <>
        <h5 className="text-center my-4">Users  [{users?.length}]</h5>
        {users.map(user=>{
            return(
                <div className="border-bottom my-4 d-flex justify-content-center" key={user._id}>
                    <h5 className="">{user.username}</h5>
                    <h5 className="">{user.email}</h5>
                    <p className="">{user.createdAt}</p>

                </div>
            )
        })}

        </>
    )
}