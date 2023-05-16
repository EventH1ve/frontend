import ContainerAndLogo from '../../components/ContainerAndLogo';
import SignInForm from '../../components/Auth_Page_partials/SignInForm';
import Footer from "../../components/FooterComponent";


export default function SignIn() {

  return (
    <>
    <div className="flex justify-center bg-[color:var(--primary-color)] w-[100%] ">
      <div className="flex justify-center  md:w-[60%] p-5 ">
        <ContainerAndLogo>
          <SignInForm />
        </ContainerAndLogo>
      </div>
    </div>
    <Footer/>
    </>
  );
}


