import { useState } from "react";
import NavBar from "./nav/navBar";
import Title from "./title/title";

const AddRes = ({addFunc=f=>f}) => {
    const [name, setName] = useState('');
    const [nation, setNation] = useState('american');
    const [ratingNum, setRatingNum] = useState(0);
    const [ttRate, setTtRate] = useState(0);
    const [added_condition, setAddedCon] = useState('');

    // checkboxes
    const [checkBreak, setBreak] = useState(false);
    const [checkBrunch, setBrunch] = useState(false);
    const [checkLunch, setLunch] = useState(false);
    const [checkAfter, setAfter] = useState(false);
    const [checkDinner, setDinner] = useState(false);
    const [checkMid, setMid] = useState(false);

    const addRestaurant = (event) => {
        event.preventDefault();

        let time=[];
        if (checkBreak) time.push("breakfast");
        if (checkBrunch) time.push("brunch");
        if (checkLunch) time.push("lunch");
        if (checkAfter) time.push("afternoon tea");
        if (checkDinner) time.push("dinner");
        if (checkMid) time.push("midnight snack");

        if (addFunc(name, time, nation, parseInt(ttRate), parseInt(ratingNum))) {
            setAddedCon("New Restaurant Added.");
            setName('');
            setNation('american');
            setRatingNum(0);
            setTtRate(0);
            // clear all checkboxes
            setBreak(false);
            setBrunch(false);
            setLunch(false);
            setAfter(false);
            setDinner(false);
            setMid(false);
        }
        else setAddedCon("Adding Failed for Inproper Inputs");
    }

    return ( <>
        <Title type="admin" />
        <NavBar navtype="admin" />

        <form onSubmit={addRestaurant} className="addRes_form">

            <label>Name</label>
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} /> <br />

            <label>Time</label>
            <span>
                <input type="checkbox" onChange={()=>setBreak(checkBreak?false:true)} checked={checkBreak} /> Breakfast &nbsp;
                <input type="checkbox" onChange={()=>setBrunch(checkBrunch?false:true)} checked={checkBrunch} /> Brunch &nbsp;
                <input type="checkbox" onChange={()=>setLunch(checkLunch?false:true)} checked={checkLunch} /> Lunch &nbsp;
                <input type="checkbox" onChange={()=>setAfter(checkAfter?false:true)} checked={checkAfter} /> Afternoon Tea &nbsp;
                <input type="checkbox" onChange={()=>setDinner(checkDinner?false:true)} checked={checkDinner} /> Dinner &nbsp;
                <input type="checkbox" onChange={()=>setMid(checkMid?false:true)} checked={checkMid} /> Midnight Snack <br />
            </span>

            <label>Nation</label>
            <select onChange={(event) => setNation(event.target.value)} value={nation}>
                <option value='american'>American</option>
                <option value='cantonese'>Cantonese</option>
                <option value='chinese'>Chinese</option>
                <option value='european'>European</option>             
                <option value='indian'>Indian</option>
                <option value='japanese'>Japanese</option>
                <option value='korean'>Korean</option>
                <option value='malaysian'>Malaysian</option>
                <option value='taiwanese'>Taiwanese</option>
                <option value='vietnamese'>Vietnamese</option>
            </select> <br />

            <label>Rating Number</label>
            <input type="number" value={ratingNum} min="0" onChange={(event) => setRatingNum(event.target.value)} /> <br />

            <label>Total Rating</label>
            <input type="number" value={ttRate} min="0" onChange={(event) => setTtRate(event.target.value)} /> <br />

            <label>Average rating:</label>
            <span>{ratingNum===0?'':(ttRate/ratingNum).toFixed(2)}</span>
            <br /> <br />
            <button>Add New Restaurant</button>
        </form>
        <div className="addRes_result">{added_condition}</div>
    </> );
}
 
export default AddRes;