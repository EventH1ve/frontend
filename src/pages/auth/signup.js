import ContainerAndLogo from '../../components/ContainerAndLogo';
import SignUpForm from '../../components/Auth_Page_partials/SignUpForm';

export default function SignUp() {


    return (
        <div className="flex justify-center bg-[color:var(--primary-color)] w-[100%] ">
            <div className="flex justify-center  md:w-[60%] md:p-5 ">
                <ContainerAndLogo>
                    <SignUpForm />
                </ContainerAndLogo>
            </div>
        </div>
    );
}

