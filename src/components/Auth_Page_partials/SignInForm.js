import { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaSignInAlt, FaDoorOpen } from 'react-icons/fa';
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { TextField, Alert } from '@mui/material';
import { useSession } from 'next-auth/react';
import { FadeLoader } from 'react-spinners';
import { setSessionToken } from "../../utils/sessionStorage";

function SignInForm({ }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    const handleusernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleShowPasswordChange = () => setShowPassword(!showPassword);
    const router = useRouter();
    const { data, status } = useSession();

    useEffect(() => {
        if (status === "authenticated" && data.user.role.toLowerCase() === "user"){ 
            setSessionToken(data.user.token);
            router.push('/users/home')
        }
        else if (status === "authenticated" && data.user.role.toLowerCase() === "admin"){
            setSessionToken(data.user.token);
            router.push('/admins')
        };
    }, [status]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signIn('credentials', {
                username,
                password,
                redirect: false,
            });
            if (res.error) {
                console.log(res);
                setError(res.error); 
            } 
                
        } catch (error) {
            console.log(error);
            setError("UnHandeled Error"); 
        }
    };


    if (status === "authenticated" || status === "Loading") return (
        <div className="flex justify-center w-full">
            <FadeLoader color="var(--darker-secondary-color)" loading={true} size={150} />
        </div>
    )
    if (status === "unauthenticated"){
    return (
        <form onSubmit={handleSubmit}>

            <h1 className="text-2xl font-bold mb-6 text-[color:var(--darker-secondary-color)] ">Sign In <FaSignInAlt className="inline-block " /></h1>
            <div className="mb-4">
                <TextField label="Email Or Username" sx={TextFieldStyle} variant="outlined" type="text" id="username" name="username" className="w-full " value={username} onChange={handleusernameChange} placeholder="Your email or username" required />
            </div>
            <div className="mb-4">
                <div className="relative">
                    <TextField label="Password" sx={TextFieldStyle} variant="outlined" type={showPassword ? "text" : "password"} id="password" name="password" className="w-full pr-10 text-gray-600" value={password} onChange={handlePasswordChange} placeholder="Your password" required />
                    <button type="button" className="absolute top-0 right-0 h-full w-5 text-gray-600 focus:outline-none" onClick={handleShowPasswordChange}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>
            {error && <Alert severity="error" className='mb-5'>{error}</Alert>} 
            <button type="submit" className="btn text-white bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] w-full mb-4 sm:w-auto sm:mb-0">
                Sign In  <FaDoorOpen className="inline-block ml-2" />
            </button>
            <br />
            <br />
            <div className="flex justify-center">
                <a href="/users/forgot-password" className="text-[color:var(--darker-secondary-color)] hover:none block mb-4">Forgot Password</a>
            </div>
            <div className="flex justify-center">
                <p className="text-gray-color">Don't have an account yet?</p>
                <a href="/auth/signup" className="text-[color:var(--darker-secondary-color)] hover:none block mb-4">Sign Up</a>
            </div>
        </form>
    );
}
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

export default SignInForm;
