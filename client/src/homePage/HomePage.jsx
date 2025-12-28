import NavBar from "./navBar";
import "./homePage.css";
import Header from "./header";
import ScrollBox from "./scrollBox";
import JobCategoryBox from "./jobCategoryBox";
import StepWorking from "./stepWorking";
import Comment from "./comment";
import SubscribeBox from "./subscribeBox";

function HomePage(){
    return(
        <>
        <NavBar />
        <Header />
        <ScrollBox />
        <JobCategoryBox />
        <StepWorking />
        <Comment />
        <SubscribeBox />
        </>
    );
}

export default HomePage;