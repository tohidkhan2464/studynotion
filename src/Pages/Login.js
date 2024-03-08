import Template from "../components/core/Auth/Template";
import loginImg from '../assets/login.png'

const Login = ({setIsLoggedIn}) => {
  return (
    <div className="h-screen">

    <Template
      title="Welcome Back"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={loginImg}
      formType="login"
      setIsLoggedIn={setIsLoggedIn}
      />
      </div>
  )
}
export default Login;
