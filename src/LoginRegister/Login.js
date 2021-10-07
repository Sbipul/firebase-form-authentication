import React, { useState } from 'react';
import initAuth from "../Firebase/initialize";
import { sendPasswordResetEmail,sendEmailVerification,updateProfile,getAuth, signInWithPopup, GoogleAuthProvider,GithubAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut  } from "firebase/auth";
initAuth()
const auth = getAuth();
const gitProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();




const Login = () => {
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [isRegisterd , setIsRegisterd] = useState(false)
    const [user,setUser] = useState({})
    const [error,setError] = useState('')



    // toggle checked button start 
    const toggleChecked = e => {
        console.log(e.target.checked)
        setIsRegisterd(e.target.checked)
    }
    // toggle checked button end 


    // handle email function start 
    const handleEmail = e => {
        setEmail(e.target.value)
    }
    // handle email function end 



    // handle password function start 
    const handlePassword = e => {
        setPassword(e.target.value)
    }
    // handle password function end 




    // githib suthentication button start
    const handleGitAuth = () => {
        signInWithPopup(auth,gitProvider)
        .then(res => {
            const {displayName,photoURL,email} = res.user
            const newUser = {
                name : displayName,
                img : photoURL,
                mail : email
            }
            setUser(newUser)
        }).catch(err => {
            setError(err.message)
        })
    }
    // githib suthentication button end




    // google suthentication button start
    const handleGoogleAuth = () => {
        signInWithPopup(auth,googleProvider)
        .then(res => {
            const {displayName,photoURL,email} = res.user
            const newUser = {
                name : displayName,
                img : photoURL,
                mail : email
            }
            setUser(newUser)
        }).catch(err => {
            setError(err.message)
        })
    }
    // google suthentication button end




    // submit handler button start 
    const handleSubmit = e => {
        e.preventDefault()
        isRegisterd ? loginUser(email,password) : createUser(email,password)
    }
    // submit handler button end 




    // creating new user by register start 
    const createUser = (email,password) => {
        createUserWithEmailAndPassword(auth,email,password)
        .then(res => {
            console.log(res.user)
            setError('')
            varification()
            setUserName()
        }).catch(err => {
            setError(err.message)
        })
    }
    // creating new user by register end 


    //email varification start
    const varification = () => {
        sendEmailVerification(auth.currentUser)
        .then(() => {})
        .catch(err => {
        setError(err.message)
        });
    }
    //email varification end



    // handle user name start
    const handleName = e => {
        setName(e.target.value)
    }
    // handle user name end



    // set user name start
    const setUserName = () => {
        updateProfile(auth.currentUser, {
            displayName: name
          }).then(() => {})
          .catch((err) => {
            setError(err.message)
          });
    }
    // set user name end



    // all ready registerd start 
    const loginUser = (email,password) => {
        signInWithEmailAndPassword(auth,email,password)
        .then(res => {
            console.log(res.user)
            setError('')
        }).catch(err => {
            setError(err.message)
        })
    }
    // all ready registerd end 


    // reset password start
    const handleResetPass = () => {
        sendPasswordResetEmail(auth, email)
        .then(() => {})
        .catch((err) => {
            setError(err.message)
        });
    }
    // reset password start



    // Sign-out start
    const signOutBtn = () => {
        signOut(auth)
        .then(() => {})
        .catch((err) => {
          setError(err.meggage)
      });
    }
    // Sign-out end


    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="row g-3 align-items-center">
                {
                    console.log(user)
                }
                <div className="col-md-6">
                    {
                        !isRegisterd && <div>
                        <label htmlFor="inputName" className="form-label">Name</label>
                        <input onBlur={handleName} type="text" className="form-control" id="inputName"/>
                    </div>
                    }
                    <div>
                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                        <input type="email" onBlur={handleEmail} className="form-control" id="inputEmail4"/>
                    </div>
                    <div>
                        <label htmlFor="inputPassword4" className="form-label">Password</label>
                        <input onBlur={handlePassword} type="password" className="form-control" id="inputPassword4"/>
                    </div>
                    <div className="form-check">
                        <input onChange={toggleChecked} className="form-check-input" type="checkbox" id="gridCheck"/>
                        <label className="form-check-label" htmlFor="gridCheck">
                            Already registered
                        </label>
                    </div>
                    {/* <p>{error}</p> */}
                    {
                        error ? <p className="text-danger">{error}</p> : <p className="text-success">everything is fair n lovely ok</p>
                    }

                    <div className="d-flex">
                        <div className="mt-3">
                            <button type="submit" className="btn btn-primary">{!isRegisterd ? 'Register' : 'Log in'}</button>
                        </div>
                        <div className="mt-3 mx-3">
                            <button type="submit" onClick={signOutBtn} className="btn btn-primary">Sign out</button>
                        </div>
                        <div className="mt-3 mx-3">
                            <button type="submit" onClick={handleResetPass} className="btn btn-primary">Reset Password</button>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="mt-3">
                            <button onClick={handleGitAuth} type="submit" className="btn btn-primary">GitHub sign in</button>
                        </div>
                        <div className="mt-3 mx-3">
                            <button onClick={handleGoogleAuth} type="submit" className="btn btn-primary">Google Sign in</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    {
                        user.name ? <div>
                            <h3>Your email information</h3>
                            <div style={{ width : '70px',height : '70px'}} className="border border-rounded ">
                                <img className="w-100 h-100" src={user.img} alt="" />
                            </div>
                            <p>Your name is : {user.name}</p>
                            <p>Your email is : {user.mail}</p>
                        </div> : <img className="w-100" src="https://image.shutterstock.com/image-vector/people-fill-out-checklist-on-260nw-1341757028.jpg" alt="" />
                    }
                </div>
            
                
        </form>
        </div>
    );
};

export default Login;