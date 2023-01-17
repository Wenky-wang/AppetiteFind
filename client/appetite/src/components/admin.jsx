import { useState } from 'react';
import NavBar from "./nav/navBar";
import Title from "./title/title";
import ResBlock from './block/resBlock';

const Admin = ({data}) => {

    const [showList, setShowList] = useState(data);

    const [resname, setResname] = useState('');
    const [restime, setRestime] = useState('all');
    const [resnation, setResnation] = useState('all');
    const [resrating, setResrating] = useState(0);

    const [button, setButton] = useState('search');

    // event listeners
    const onSubmitSearch = (event) => {
        event.preventDefault();

        switch (button) {
            case 'search':
                let resData = data;
                if (resname !== '')
                    resData = resData.filter(res => res.name.toLowerCase().includes(resname.trim().toLowerCase()));    
                if (restime !== 'all')  // need change here
                    resData = resData.filter(res => res.time.includes(restime));
                if (resnation !== 'all')
                    resData = resData.filter(res => res.nation === resnation);
                resData = resData.filter(res => (res.totalRating/res.ratingNumber).toFixed(2) >= resrating);
        
                setShowList(resData);
                break;
            default:
                setShowList(data);
                setResname('');
                setRestime('all');
                setResnation('all');
                setResrating(0);
        }
    }

    return ( <>
        <Title type='admin' />
        <NavBar navtype='admin' />
        <form className="searchBlock" onSubmit={onSubmitSearch}>
            <div className="searchLeft">
                <label className="searchLabel" htmlFor="searchName">Name</label>
                <input className="searchInput" type='text' name="searchName" value={resname}
                onChange={(event) => setResname(event.target.value)} />
                <br />

                <label className="searchLabel" htmlFor="searchTime">Time</label>
                <select className="searchInput" name="searchTime" value={restime}
                onChange={(event) => setRestime(event.target.value)}>
                    <option value={"all"}>All</option>
                    <option value={"breakfast"}>Breakfast</option>
                    <option value={"brunch"}>Brunch</option>
                    <option value={"lunch"}>Lunch</option>
                    <option value={"afternoon tea"}>Afternoon Tea</option>
                    <option value={"dinner"}>Dinner</option>
                    <option value={"midnight snack"}>Midnight Snack</option>
                </select>
                <br />

                <label className="searchLabel" htmlFor="searchNation">Nation</label>
                <select className="searchInput" name="searchNation" value={resnation}
                onChange={(event) => setResnation(event.target.value)}>
                    <option value={"all"}>All</option>
                    <option value={"american"}>American</option>
                    <option value={"cantonese"}>Cantonese</option>
                    <option value={"chinese"}>Chinese</option>
                    <option value={"european"}>European</option>             
                    <option value={"indian"}>Indian</option>
                    <option value={"japanese"}>Japanese</option>
                    <option value={"korean"}>Korean</option>
                    <option value={"malaysian"}>Malaysian</option>
                    <option value={"taiwanese"}>Taiwanese</option>
                    <option value={"vietnamese"}>Vietnamese</option>
                </select>
                <br />

                <label className="searchLabel" htmlFor="searchRating">Rating</label>
                <select className="searchInput" name="searchRating" value={resrating}
                onChange={(event) => setResrating(event.target.value)}>
                    <option value={0}>All</option>
                    <option value={4}>4 or above</option>
                    <option value={4.5}>4.5 or above</option>
                </select>
            </div>

            <div className="searchRight">
                <button className="searchButton" onClick={() => setButton('search')} >Search</button>
                <button className="searchButton" onClick={() => setButton('reset')} >Reset</button>
            </div>
        </form>

        <div className='searchResult'>
            {showList.length===0?<p className='noResult'>No Result Found</p>:
            showList.map(x => <ResBlock className="searchResultBlock" key={x.res_num} type={'admin'} obj={x} />)}
        </div>
    </> );
}

export default Admin;


