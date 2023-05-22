import { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaSignInAlt, FaDoorOpen } from 'react-icons/fa';
import { TextField, Alert, FormControl, MenuItem, Select, Button, InputLabel } from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Cloudinary } from 'cloudinary-core';
import { IoMdDoneAll } from "react-icons/io";


function AddAdminForm({ }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [gender, setGender] = useState('male');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [subscription, setSubscription] = useState('');
    const [coverImage, setCoverImage] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);


    const cloudinary = new Cloudinary({
        cloud_name: "dacn7ee03",
        api_key: "642655988859922",
        api_secret: "aPbCxTG4eqzCJd-hNyWnb9Q_wdQ"
    });


    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleMobileNumberChange = (e) => setMobileNumber(e.target.value);
    const handleSubscriptionChange = (e) => setSubscription(e.target.value);
    const handleGenderChange = (e) => setGender(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleShowPasswordChange = () => setShowPassword(!showPassword);


    useEffect(() => {
        async function uploadToCloudinary(file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'tjsdpw0w');

                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/image/upload`,
                    {
                        method: 'POST',
                        body: formData,
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setImageUrl(data.secure_url);
                }
            } catch (error) {
                console.error('Error uploading image to Cloudinary:', error);
            }
        }

        if (coverImage) {
            uploadToCloudinary(coverImage);
        }
    }, [coverImage]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submitting");
        console.log({
            "firstname":firstName,
            "lastname":lastName,
            "email":email,
            "username":username,
            "gender":gender,
            "subscription": parseInt(subscription), 
            "mobile":mobileNumber,
            "password":password,
            "logo":imageUrl,

        })

        try {
            const res = await axios.post('http://34.125.23.115:8000/api/owner/request', {
                "firstname":firstName,
                "lastname":lastName,
                "email":email,
                "username":username,
                "gender":gender,
                "subscription": parseInt(subscription), 
                "phonenumber":mobileNumber,
                "password":password,
                "logo":imageUrl,

            });
            if (res.error) {
                error(res.error);
                setError(res.error);
            } else {
                setSuccess(true);

            }
        }
        catch (error) {
            console.log(error);
            setError("UnHandeled Error");

        }
    }
    if (success) {
        return (
            <div>
            <div class="flex flex-col items-center justify-center m-10">
                <IoMdDoneAll className="text-9xl text-green" color='green' size={60}/>
                <h1 className='text-4xl font-bold text-center text-green'>
                Admin Added successfully</h1>
                </div>
            </div>
        );
    }


    return (
        <form onSubmit={handleSubmit} className="w-full p-8">
            <h1 className="text-2xl font-bold mb-6 text-[color:var(--darker-secondary-color)] w-full md:w-1/2 inline-block">Add Organizer</h1>
            <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 px-2 mb-4">
                    <TextField label="First Name" sx={TextFieldStyle} variant="outlined" type="text" id="firstName" name="firstName" className="w-full" value={firstName} onChange={handleFirstNameChange} placeholder="Your first name" required />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                    <TextField label="Last Name" sx={TextFieldStyle} variant="outlined" type="text" id="lastName" name="lastName" className="w-full" value={lastName} onChange={handleLastNameChange} placeholder="Your last name" required />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                    <TextField label="Email" sx={TextFieldStyle} variant="outlined" type="email" id="email" name="email" className="w-full" value={email} onChange={handleEmailChange} placeholder="Your email address" required />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                    <TextField label="Username" sx={TextFieldStyle} variant="outlined" type="text" id="username" name="username" className="w-full" value={username} onChange={handleUsernameChange} placeholder="Your username" required />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                    <TextField label="Mobile Number" sx={TextFieldStyle} variant="outlined" type="tel" id="mobileNumber" name="mobileNumber" className="w-full" value={mobileNumber} onChange={handleMobileNumberChange} placeholder="Your mobile number" required />
                </div>

                <div className="w-full md:w-1/2 px-2 mb-4">
                    <TextField label="Subscription" sx={TextFieldStyle} variant="outlined" type="number" id="subscription" name="subscription" className="w-full" value={subscription} onChange={handleSubscriptionChange} placeholder="Your subscription" required />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                    <div className="relative">
                        <TextField label="Password" sx={TextFieldStyle} variant="outlined" type={showPassword ? "text" : "password"} id="password" name="password" className="w-full pr-10 text-gray-600" value={password} onChange={handlePasswordChange} placeholder="Your password" required />
                        <button type="button" className="absolute top-0 right-0 h-full w-5 text-gray-600 focus:outline-none" onClick={handleShowPasswordChange}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                <div className="w-full md:w-1/2 px-2 mb-4">
                    {/**Upload cover photo  */}
                    <div>

                        <input
                            type="file"
                            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-[color:var(--secondary-color)] file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                            onChange={(e) => setCoverImage(e.target.files[0])}
                            accept="image/*"
                        />
                    </div>
                </div>


            </div>
            {error && <Alert severity="error">{error}</Alert>}
            <div className="mt-6">
                <button type="submit" className=" btn py-2 px-4 text-white rounded-lg bg-[color:var(--secondary-color)] hover:bg-[color:var(--darker-secondary-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--darker-secondary-color)]">Add</button>
            </div>
        </form>
    );
    ``


}
const TextFieldStyle =
{
    "& .MuiOutlinedInput-root": {

        "&.Mui-focused fieldset": { borderColor: "var(--darker-secondary-color)" },
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
        color: "var(--gray-color  )"
    }
}

export default AddAdminForm;
