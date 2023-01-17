import { useState } from "react";
import { useEffect } from "react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { capitalize } from "../services/capitalize";
import NavBar from "./nav/navBar";
import Title from "./title/title";

const Home = ({topData}) => {

    const topList = topData.map(res => 
        <div className="eachTopRow" key={res.res_num} onClick={() => jumpSlide(res.res_num)}>{res.name}</div> );
    const imgList = topData.map(res => res.res_num);
    const [position, setPosition] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (position === 9) setPosition(0);
            else setPosition(position => position+1);
        }, 3000);
        return ()=> clearInterval(interval);
    }, [imgList, position]);

    const leftSlide = () => {
        if (position === 0) setPosition(9);
        else setPosition(position => position-1);
    }

    const rightSlide = () => {
        if (position === 9) setPosition(0);
        else setPosition(position => position+1);
    }

    const jumpSlide = (selectid) => {
        setPosition(imgList.indexOf(selectid));
    }

    return ( <>
        <Title />
        <NavBar />
        <div className='homeLeft'>
            <h2>Top 10 Recommendation</h2>
            <div className="homeWholeBar">
                <div className="homeActiveBar" style={{top:`${position*4.3+1.25}vh`}} ></div>
                <div className="top10list">
                    {topList}
                </div>
            </div>
            <Link className="homeSearch" to={"/search"} >Search For More</Link>
        </div>
        <div className='homeRight'>
            <div className='homeRight-slides'>
                <VscChevronLeft className="homeLeftArrow" onClick={leftSlide} size={70} />
                <Link className='home-slides' to={"/resDetail"} state={topData[position]} 
                style={{ backgroundImage: 'url(' + require(`../images/${imgList[position]}.jpeg`) + ')', backgroundSize:'cover', backgroundPosition:'center' }} >
                </Link>
                <VscChevronRight className="homeRightArrow" onClick={rightSlide} size={70} />
            </div>
            <Link className="slideText" to={"/resDetail"} state={topData[position]}>
                <span>
                    {`${capitalize(topData[position].name)} / ${(topData[position].totalRating/topData[position].ratingNumber).toFixed(2)}`} <br />
                    {`${capitalize(topData[position].nation)} - suits for:  ${topData[position].time.reduce((p,c) => `${capitalize(p)}, ${capitalize(c)}`)}`}
                </span>
            </Link>
        </div>
        
    </> );
}
 
export default Home;