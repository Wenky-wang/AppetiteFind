import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./nav/navBar";
import Title from "./title/title";
import { useState } from "react";

const EditRes = ({data, editFunc=f=>f, deleteFunc=f=>f}) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const obj = data.filter(res => res.res_num === state.res_num)[0];

    const [name, setName] = useState(obj.name);
    const [nation, setNation] = useState(obj.nation);
    const [updated, setUpdated] = useState(null);
    // checkboxes
    const [checkBreak, setBreak] = useState(obj.time.includes("breakfast")?true:false);
    const [checkBrunch, setBrunch] = useState(obj.time.includes("brunch")?true:false);
    const [checkLunch, setLunch] = useState(obj.time.includes("lunch")?true:false);
    const [checkAfter, setAfter] = useState(obj.time.includes("afternoon tea")?true:false);
    const [checkDinner, setDinner] = useState(obj.time.includes("dinner")?true:false);
    const [checkMid, setMid] = useState(obj.time.includes("midnight snack")?true:false);

    const deleteRecord = () => {
        deleteFunc(state.res_num);
        navigate('/admin');
    }

    const editRecord = (event) => {
        event.preventDefault();

        let time=[];
        if (checkBreak) time.push("breakfast");
        if (checkBrunch) time.push("brunch");
        if (checkLunch) time.push("lunch");
        if (checkAfter) time.push("afternoon tea");
        if (checkDinner) time.push("dinner");
        if (checkMid) time.push("midnight snack");

        editFunc(obj.res_num, name, time, nation);

        setUpdated("Information updated");
    }

    return ( <>
        <Title type="admin" />
        <NavBar navtype='admin' />
        
        <img className="editRes_left" src={require(`../images/${obj.res_num}.jpeg`)} alt={obj.name} />
        
        <div className="editRes_right">
            <form className="editRes_form" onSubmit={editRecord}>
                <p>ID: {obj.res_num}</p>
                
                <label>Name</label>
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} /> <br />

                <label>Time</label>
                <span>
                    <input type="checkbox" onChange={()=>setBreak(checkBreak?false:true)} checked={checkBreak} /> Breakfast &nbsp;
                    <input type="checkbox" onChange={()=>setBrunch(checkBrunch?false:true)} checked={checkBrunch} /> Brunch &nbsp;
                    <input type="checkbox" onChange={()=>setLunch(checkLunch?false:true)} checked={checkLunch} /> Lunch  <br />
                    <input type="checkbox" onChange={()=>setAfter(checkAfter?false:true)} checked={checkAfter} /> Afternoon Tea &nbsp;
                    <input type="checkbox" onChange={()=>setDinner(checkDinner?false:true)} checked={checkDinner} /> Dinner &nbsp;
                    <input type="checkbox" onChange={()=>setMid(checkMid?false:true)} checked={checkMid} /> Midnight Snack
                </span> <br />

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
                </select> 
                <br />
                <button>Update Information</button>
                <div className="editRes_updated">{updated}</div>
            </form>
            
            <button onClick={deleteRecord} className='editButton'>Delete this restaurant</button>
        </div>
    </> );
}
 
export default EditRes;