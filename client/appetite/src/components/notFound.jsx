import { Link } from 'react-router-dom';
import { VscArrowLeft } from "react-icons/vsc";
import NavBar from "./nav/navBar";
import Title from "./title/title";

const NotFound = ({type=''}) => {
    if (type === 'student') 
        return ( <>
            <Title />
            <NavBar />
            <h1>Sorry Page Not Found</h1>
            <Link to="/home"><VscArrowLeft />&nbsp; Back Home</Link>
        </> );
    else
        return ( <>
            <Title type='admin' />
            <NavBar navtype='admin' />
            <h1>Sorry Page Not Found</h1>
            <Link to="/admin"><VscArrowLeft />&nbsp; Back Home</Link>
        </> );
}
 
export default NotFound;