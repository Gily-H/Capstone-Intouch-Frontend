import React from 'react'
import Navbar from './Navbar'
import {useState, useEffect} from 'react'
import './profile.css'



export default function ProfilePage(props){
    
    const userInitials="JN"

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phoneNum, setPhoneNum] = useState();

	const [redirect, setRedirect] = useState(false)

	console.log(firstName + "" + lastName + "" + phoneNum);

    async function handleSubmit(e){
        e.preventDefault()
    //  await axios.post(`INSERT LINK HERE`, {firstName, lastName, phoneNum})
        setRedirect(true)
    }

    const [friendData, setFriendData] = useState();


    useEffect(() => {
        setFriendData([
            {
                firstName: "Andrew",
                lastName: "Roberts"
            },
            {
                firstName: "Samantha",
                lastName: "Green"
            },
            {
                firstName: "Brandon",
                lastName: "Gates"
            },
            {
                firstName: "Andrew",
                lastName: "Roberts"
            },
            {
                firstName: "Samantha",
                lastName: "Green"
            },
            {
                firstName: "Brandon",
                lastName: "Gates"
            },
            {
                firstName: "Brandon",
                lastName: "Gates"
            },
            {
                firstName: "Andrew",
                lastName: "Roberts"
            },
            {
                firstName: "Samantha",
                lastName: "Green"
            },
            {
                firstName: "Brandon",
                lastName: "Gates"
            }
        ]);

    }, [])


    return (
        <div>
            <Navbar/>
            
            {/* <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="6" r="4"/>
            </svg> */}
            <div className="profile-panels">
                <div className="profile-left-panel">
                    <div className="profile-pic-container">
                        <img className="profile-pic" src="https://stringfixer.com/files/18113637.jpg"/>
                        <p className="profile-initials">{userInitials.charAt(0)} {userInitials.charAt(1)}</p>
                    </div>
                    <div className="profile-user-info">
                        <h1 className="profile-username">John Nelson</h1>
                        <p className="profile-phone"> 209 - 563 - 7170</p>
                    </div>
                </div>
                <div className="profile-middle-panel">
                    <form onSubmit={handleSubmit} className="login-form add-contact-form">
                        <h1 className="add-contact-form-title">Get in touch</h1>
                        <label className="login-username">
                            <input className="login-input"
                            placeholder="First Name"
                            type="text" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            />
                        </label>
                        <label className="login-password">
                            <input className="login-input"
                            placeholder="Last Name"
                            type="text" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            />
                        </label>
                        <label className="phone-input">
                            <input className="login-input"
                            placeholder="Phone#: XXX-XXX-XXXX"
                            type="tel" 
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            value={phoneNum}
                            onChange={(e) => setPhoneNum(e.target.value)}
                            />
                        </label>
                        <input type="submit" value="Add Contact" className="login-btns login-submit-btn add-contact-btn"/>
                    </form>

                    <div className="contacts-panel-bottom">
                        {
                            friendData?.map((item, index) =>{
                                return(
                                    <div className="contact-card" key={index}>
                                        <img src="https://w7.pngwing.com/pngs/529/816/png-transparent-computer-icons-user-profile-avatar-heroes-monochrome-black-thumbnail.png"/>
                                        <p className="contact-name">{item.firstName} {item.lastName}</p>
                                    </div>
                                )
                            })
                        }
                    </div>

                <div>
                    
            </div>
        </div>
    </div>
        </div>
    )
}