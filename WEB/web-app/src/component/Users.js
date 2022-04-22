import React, {useState, useEffect} from "react";

const API = process.env.REACT_APP_API;

export const Users = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(e)
        console.log(name,email,password);
        const res = await fetch(`${API}/users`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });
    };

    const getUsers = async () =>{
        const res = await fetch(`${API}/users`)
        const data = await res.json();
        console.log(data);
    }
    
    useEffect(()=>{
        getUsers();
    },[])



    return(
        <div className='row'>
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
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
                            type="password" 
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            className="form-control"
                            placeholder="Password"
                            >
                        </input>
                    </div>
                    <button className="btn btn-primary btn-block mt-4">
                        Create
                    </button>
                    
                </form>
            </div>
            <div className="col md-8">

            </div>
        </div>
    );


}

