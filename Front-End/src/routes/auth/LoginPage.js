import LogIn from "../../components/auth/LogIn";
import Copyright from "../../components/home/Copyright";
import NavbarLog from "../../components/home/NavbarLog";

function LoginPage(){
    return(
    <>
        <NavbarLog/>  
        <LogIn/>  
        <Copyright/>
    </>
    )
}

export default LoginPage;