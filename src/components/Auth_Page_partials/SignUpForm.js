import { useState,useEffect } from 'react';
import { FaEye, FaEyeSlash, FaKey } from 'react-icons/fa';
import { TextField, Alert, FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import axios from '../../utils/axios';
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';
import LoadingComponent from '../LoadingComponent';



function SignUpForm({ }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    const handleFullNameChange = (e) => setFullName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleMobileNumberChange = (e) => setMobileNumber(e.target.value);
    const handleGenderChange = (e) => setGender(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleShowPasswordChange = () => setShowPassword(!showPassword);
    const router = useRouter();
    const { data, status } = useSession();

    useEffect(() => {
        if (status === "authenticated" && data.user.role === "user") router.push('/users/home');
        else if (status === "authenticated" && data.user.role === "admin") router.push('/admins');
    }, [status]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submitting");
        console.log({
            fullName,
            email,
            username,
            mobileNumber,
            gender,
            password
        })
        try {
            let names = fullName.split(" ");
        
            const firstName = names[0];
            const lastName = names.length > 1 ? names[1] : "";
        
            const res = await axios.post('/api/user/signup', {
                "firstname": firstName,
                "lastname": lastName,
                email,
                username,
                "phonenumber": mobileNumber,
                gender,
                password
            });
        
            if (res.error) {
                error(res.error);
                setError(res.error);
            } else {
                router.push('/auth/signin');
            }
        }
        catch (error) {
            console.log(error);
            setError("UnHandeled Error");
        }
    }


    if (status === "authenticated" || status === "Loading") {

        return (
            <LoadingComponent />

        );

    }


    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-6 text-[color:var(--darker-secondary-color)] ">Sign Up <FaKey className="inline-block " /></h1>
            <div className="mb-4">
                <TextField label="Full Name" sx={TextFieldStyle} variant="outlined" type="text" id="fullName" name="fullName" className="w-full" value={fullName} onChange={handleFullNameChange} placeholder="Your full name" required />
            </div>
            <div className="mb-4">
                <TextField label="Email" sx={TextFieldStyle} variant="outlined" type="email" id="email" name="email" className="w-full" value={email} onChange={handleEmailChange} placeholder="Your email address" required />
            </div>
            <div className="mb-4">
                <TextField label="Username" sx={TextFieldStyle} variant="outlined" type="text" id="username" name="username" className="w-full" value={username} onChange={handleUsernameChange} placeholder="Your username" required />
            </div>
            <div className="mb-4">
                <TextField label="Mobile Number" sx={TextFieldStyle} variant="outlined" type="tel" id="mobileNumber" name="mobileNumber" className="w-full" value={mobileNumber} onChange={handleMobileNumberChange} placeholder="Your mobile number" required />
            </div>
            <div className="mb-4">
                <div className="relative">
                    <TextField label="Password" sx={TextFieldStyle} variant="outlined" type={showPassword ? "text" : "password"} id="password" name="password" className="w-full pr-10 text-gray-600" value={password} onChange={handlePasswordChange} placeholder="Your password" required />
                    <button type="button" className="absolute top-0 right-0 h-full w-5 text-gray-600 focus:outline-none" onClick={handleShowPasswordChange}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>
            <div className="w-full md:w-1/2  mb-4">
                <FormControl variant="outlined" sx={TextFieldStyle} className="w-full">
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select labelId="gender-label" id="gender" name="gender" value={gender} onChange={handleGenderChange} label="Gender" >
                        <MenuItem value="male" >Male </MenuItem >
                        <MenuItem value="female">Female </MenuItem >
                        <MenuItem value="other">Other </MenuItem >
                    </Select>
                </FormControl>
            </div>
            {error && <Alert severity="error" className='mb-5'>{error}</Alert>} {/* show error alert if error exists */}
            <button type="submit" className="btn text-white bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] w-full mb-4 sm:w-auto sm:mb-0">
                Sign Up <FaKey className="inline-block " />
            </button>
            <br />
            <br />
            <div className="flex justify-center">
                <p className="text-gray-color">Already have an account?</p>
                <a href="/auth/signin" className="text-[color:var(--darker-secondary-color)] hover:none block mb-4">Sign In</a>
            </div>
        </form>

    );
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

export default SignUpForm;
