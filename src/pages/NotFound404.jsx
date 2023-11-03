import { Link } from "react-router-dom";

const NotFound404 = () => {
    return (
        <div>
        <Link to={'/'}>
            
            <h1 className="text-5xl h-screen grid justify-center items-center">Page not found <br /> Let's go another route</h1>
  
        </Link>
    </div>
    );
};

export default NotFound404;