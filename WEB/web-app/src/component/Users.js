import React, {useState, useEffect} from "react";

const API = process.env.REACT_APP_API;

export const Users = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [editing,setEditing] = useState(false);
    const [id, setId] = useState();

    const [users,setUsers] = useState([]);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(name,email,phone);


        if(!editing){
            const res = await fetch(`${API}/users`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone
                })
            });
            const data = await res.json();
            console.log(data)
        }
        else{
            const res = await fetch(`${API}/users/${id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone
                })
            });
            const data = await res.json();
            console.log(data)
            setEditing(false)
            setId()
            
        }
        

        await getUsers();
        setName('')
        setEmail('')
        setPhone('')
    };

    const getUsers = async () =>{
        const res = await fetch(`${API}/users`)
        const data = await res.json();
        console.log(data)
        setUsers(data);
    }

    const editUser = async (id) =>{
        const res = await fetch(`${API}/user/${id}`);
        const data = await res.json();

        setEditing(true);
        setId(data._id)
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
    };

    const deleteUser = async (id) => {
        const userResponse = window.confirm('Are you sure you want to delete this user?');
        if(userResponse){
            const res = await fetch(`${API}/users/${id}`,{
                method:'DELETE',
            });
            const data = await res.json();
            await getUsers();
            console.log(data);
        }
        else{
            alert('user was not deleted');
        }

    };
    
    useEffect(()=>{
        getUsers();
    },[])



    return(
        <div className='row'>
            <div className="col-6">
                <form onSubmit={handleSubmit} className="card card-body mt-4">
                    <div className="form-group mt-2">
                        <input 
                            type="text" 
                            onChange={e => setName(e.target.value)}
                            value={name}
                            className="form-control"
                            placeholder="Name"
                            autoFocus
                            >
                        </input>
                    </div>
                    <div className="form-group mt-4">
                        <input 
                            type="email" 
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            className="form-control"
                            placeholder="Email"                            
                            >
                        </input>
                    </div>
                    <div className="form-group mt-4">
                        <input 
                            type="phone" 
                            onChange={e => setPhone(e.target.value)}
                            value={phone}
                            className="form-control"
                            placeholder="Phone"
                            >
                        </input>
                    </div>
                    <button className="btn btn-primary btn-block mt-4">
                        {editing ? 'Update' : 'Create'}
                    </button>
                    
                </form>
            </div>
            <div className="col-6">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user =>(
                            <tr key = {user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <div className="btn-group">
                                        <button 
                                            className="btn btn-primary btn-sm btn-block"
                                            onClick={() =>{
                                                editUser(user._id)
                                            }}
                                        >Edit</button>
                                        <button 
                                        className="btn btn-danger btn-sm btn-block"
                                        onClick={() =>{
                                                deleteUser(user._id)
                                            }}
                                        >Delete</button>
                                    </div>

                                </td>
                               
                                    
                                
                            </tr>
                            ))}
                    </tbody>

                </table>
            </div>
        </div>
    );


}

