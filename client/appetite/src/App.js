import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './components/home';
import Search from './components/search';
import WishList from './components/wishList';
import NotFound from './components/notFound';
import ResDetail from './components/resDetail';
import Login from './components/login';
import Admin from './components/admin';
import AddRes from './components/addRes';
import EditRes from './components/editRes';



function App() {

  const [resdata, setResData] = useState([]);
  const [accdata, setAccData] = useState([]);
  const [curAcc, setCurAcc] = useState('');  // record current account
  const [accWish, setAccWish] = useState([]);  // record wishlist for current account
  const [accType, setAccType] = useState('');
  const navigate = useNavigate();


  //////// Database ////////
  // get restaurant database
  useEffect(()=>{
    const url="http://localhost:5000/res";
    axios.get(url).then(resp => {
      setResData(resp.data);
    })
  }, [])
  // get account database
  useEffect(()=>{
    const url="http://localhost:5000/acc";
    axios.get(url).then(resp => {
      setAccData(resp.data);
    })
  }, [])


  //////// Event Handlers ////////
  // login function
  const loginAccount = (email, pwd) => {
    const match = accdata.filter(acc => acc.email === email.toLowerCase());  // if account exist
    if (match.length > 0) {
        if (match[0].password === pwd) {
            if (match[0].type === 'student') {
              navigate('/home');
              setAccType('student');
              setCurAcc(match[0].email);  // only student account need to record these two status
              setAccWish(match[0].wished);
            } else navigate('/admin');   // navigate to different page when user type different
        } else alert("Password Incorrect");
    } else alert("Account Doesn't Exist");  // account doesnt exist when match.length === 0
  }

  // user-side functions
  // cancel or add the wish, depends on the original value of wish
  const wishListChange = (selectid) => {  // restaurant id is input
    let newAccWish = accWish;
    if (accWish.includes(selectid)) newAccWish = accWish.filter(a => a!== selectid);
    else newAccWish.push(selectid);
    setAccWish(newAccWish);  // update the local variable

    const newAcc = accdata.filter(a => a.email === curAcc)[0];
    newAcc.wished = newAccWish;
    const newAccData = accdata.map(acc => acc.email !== curAcc? acc: newAcc);
    setAccData(newAccData);  // update the local variable

    const url = `http://localhost:5000/acc/${curAcc}`;
    axios.put(url, { wished: newAccWish });  // update database
  }
  // submitting a new rating to a restaurant at restaurant detail page
  const ratingChange = (selectid, newrating) => {
    const newobj = resdata.filter(res => res.res_num === selectid)[0];
    const newratingNumber = newobj.ratingNumber + 1;
    const newtotalRating = newobj.totalRating + Number(newrating);

    newobj.ratingNumber = newratingNumber;
    newobj.totalRating = newtotalRating;

    const newResData = resdata.map(res => res.res_num !== selectid? res: newobj);
    setResData(newResData);
    const url = `http://localhost:5000/res/${selectid}`;
    axios.put(url, newobj);
  }

  // admin-side functions
  // add a new restaurant
  const addNew = (name, time, nation, totalRating, ratingNumber) => {
    // validation 1: if any value null
    if (name === '') {
      alert("Please enter a name");
      return false;
    }
    if (time.length === 0) {
      alert("Please select a time zone");
      return false;
    }
    if (totalRating === 0 || totalRating < 0) {
      alert("Please enter the total rating");
      return false;
    }
    if (ratingNumber === 0 || ratingNumber < 0) {
      alert("Please enter at rating number");
      return false;
    }
    // validation 2: if restaurant name duplicate (in reality it's unacceptable)
    if (resdata.filter(r => r.name === name).length !== 0) {
      alert("Restaurant Name Already Exists!");
      return false;
    }
    // validation 3: if average rating between 0 and 5
    if (totalRating/ratingNumber > 5 || totalRating/ratingNumber < 0) {
      alert("Average Rating must be between 0 and 5.\nCheck your input of 'Rating Number' and 'Total Rating'!");
      return false;
    }

    // if passing all validation above, insert new restaurant
    const id_num = resdata.length+1;
    const res_num = ("000" + id_num).slice(-4);
    const new_res = { res_num, name, time, nation, totalRating, ratingNumber };
    // update local dataset
    const newResData = [...resdata, new_res];
    setResData(newResData);
    // update database
    const url = "http://localhost:5000/res";
    axios.post(url, new_res);
    return true;
  }
  // edit restuarant information
  const editInfo = (selectid, newname, newtime, newnation) => {
    // validation
    if (newname === '') {
      alert("Name cannot be set to null");
      return;
    }
    if (newtime.length === 0) {
      alert("Time zone cannot be set to null");
      return;
    }

    const newobj = resdata.filter(res => res.res_num === selectid)[0];
    newobj.name = newname;
    newobj.time = newtime;
    newobj.nation = newnation;

    const newResData = resdata.map(res => res.res_num !== selectid? res: newobj);
    setResData(newResData);
    const url = `http://localhost:5000/res/${selectid}`;
    axios.put(url, newobj);
  }
  // delete restaurant
  const deleteRecord = (removeid) => {
    const newResData = resdata.filter(res => res.res_num!==removeid);
    setResData(newResData);
    const url = `http://localhost:5000/res/${removeid}`;
    axios.delete(url);
  }

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Login 
          onLoginFunc={loginAccount}
        />} />
        <Route path="/home" element={<Home 
          topData={resdata.sort((a,b) => b.totalRating/b.ratingNumber - a.totalRating/a.ratingNumber).slice(0,10)} 
        />} />
        <Route path="/search" element={<Search 
          data={resdata.sort((a, b) => a.res_num > b.res_num ? 1 : -1)}  // data order by res_num as default
          topData={resdata.sort((a,b) => b.totalRating/b.ratingNumber - a.totalRating/a.ratingNumber).slice(0,10)} 
          wishlist={accWish} 
        />} />  
        <Route path="/wishList" element={<WishList 
          wishdata={resdata.filter(x => accWish.includes(x.res_num))} 
          onClickFunc={wishListChange} 
        />} />
        <Route path="/resDetail" element={<ResDetail 
          data={resdata.sort((a, b) => a.res_num > b.res_num ? 1 : -1)} 
          onClickFunc={wishListChange} 
          onSubmitFunc={ratingChange}
          wishlist={accWish} 
        />} />
        <Route path='/admin' element={<Admin 
          data={resdata.sort((a, b) => a.res_num> b.res_num ? 1 : -1)}  // data order by res_num as default
        />} />
        <Route path='/addRes' element={<AddRes 
          addFunc={addNew}
        />} /> 
        <Route path='/editRes' element={<EditRes 
          data={resdata.sort((a, b) => a.res_num > b.res_num ? 1 : -1)} 
          editFunc={editInfo}
          deleteFunc={deleteRecord}
        />} />
        <Route path="*" element={<NotFound
          type={accType}
        />} />
      </Routes>
    </div>
  );
}

export default App;
