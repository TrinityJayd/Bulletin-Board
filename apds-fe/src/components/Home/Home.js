import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useEffect } from 'react';

function Home(){
  const cookies = new Cookies();
  const token = cookies.get("token");
  const isLoggedIn = token !== undefined;
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/posts");
    }
  }, [isLoggedIn, navigate]);

  return(
    <div>
      <h1 style={{fontWeight:"normal", margin:"2rem 0"}}>Bulletin Board</h1>
      <Button as={Link} to="/login" style={{marginRight: "2rem"}}>Login</Button>
      <Button as={Link} to="/signup">Sign Up</Button>
    </div>
  )
}

export default Home;