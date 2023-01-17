import { useLocation } from "react-router-dom";
import { FaHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { capitalize } from "../services/capitalize";
import NavBar from "./nav/navBar";
import Title from "./title/title";

const ResDetail = ({data, onClickFunc=f=>f, onSubmitFunc=f=>f, wishlist=[]}) => {
    
    const { state } = useLocation();
    const obj = data.filter(res => res.res_num === state.res_num)[0];
    const [heartColor, setHeartColor] = useState(wishlist.includes(state.res_num)?'red':'grey');
    const [newrating, setNewRating] = useState(0);
    const [menu, setMenu] = useState([]);

    // read menu pictures from free api
    useEffect(() => {
        const key = '31354237-a8faecffe6828ca3f24877f91';
        const url = `https://pixabay.com/api/?key=${key}&q=${obj.nation}+meal&image_type=photo`;
        fetch(url)
           .then((resp) => resp.json())
           .then((data) => {
              setMenu(data.hits.slice(1,4));
           })
           .catch((err) => {
              console.log(err.message);
           });
     }, [obj]);

    const changeWish = () => {
        if (wishlist.includes(state.res_num)) setHeartColor('grey');
        else setHeartColor('red');
        
        onClickFunc(obj.res_num);
    }

    const submitRating = (event) => {
        event.preventDefault();
        onSubmitFunc(obj.res_num, newrating);
        setNewRating(0);
    }

    return ( <>
        <Title />
        <NavBar />
        <div className="resDetail_up">
            <img className="resDetail_left" src={require(`../images/${obj.res_num}.jpeg`)} alt={obj.name} />
            <div className="resDetail_right">
                <FaHeart className="resDetail_heart" color={heartColor} size="1.6vw" onClick={changeWish} />
                <p className="resDetail_name">{obj.name}</p>
                <p className="resDetail_nation">
                    {capitalize(obj.nation)} <br /> 
                    {obj.time.reduce((prev, cur) => `${capitalize(prev)}, ${capitalize(cur)}`)} <br/>
                </p>
                <p className="resDetail_rating">
                    <span>total {obj.ratingNumber} ratings</span> &nbsp;{(obj.totalRating/obj.ratingNumber).toFixed(2)}
                </p> 

                <form className="resDetail_addRating" onSubmit={submitRating}>
                    <label>Add your rating from 1-5</label> &nbsp;&nbsp;
                    <input type="number" step="0.5" min="0" max="5" value={newrating} onChange={(event) => setNewRating(event.target.value)} /> &nbsp;&nbsp; 
                    <button>Submit Rating</button>
                </form>
            </div>
        </div>
        
        <div className="resDetail_menuTitle">Popular Dishes</div>
        <div className="resDetail_menu">
            { menu.length === 0?'No Dishes':
            menu.map(dish => <img src={dish.largeImageURL} alt={dish.user} />) }
        </div>
        
    </> );
}
 
export default ResDetail;