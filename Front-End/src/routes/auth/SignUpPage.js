import SignUp from '../../components/auth/SignUp';
import Copyright from "../../components/home/Copyright";
import NavbarLog from '../../components/home/NavbarLog';

function SignUpPage(){
    return(
    <>
        <NavbarLog/>
        <SignUp/>  
        <Copyright/>
    </>
    )
}

export default SignUpPage;