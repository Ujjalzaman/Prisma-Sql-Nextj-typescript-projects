import Navbar from '../UI/Navbar';
import Footer from '../UI/Footer';
// import { SessionProvider, useSession } from "next-auth/react";

const HomePageLayOut = ({ children, session }) => {
    // const { data } = useSession();
    console.log("layout --",session)
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
};
export default HomePageLayOut