import NavBar from "./nav/navBar";
import Title from "./title/title";
import ResBlock from './block/resBlock';

const WishList = ({wishdata, onClickFunc=f=>f}) => {
    
    if (wishdata.length === 0) return (<>
        <Title />
        <NavBar />
        <p className='noResult'>No restaurant on the wish list</p>
    </>);

    return ( <>
        <Title />
        <NavBar />
        <div className='wishListTable'>
            {wishdata.map(x=> <ResBlock key={x.res_num} type='wish' obj={x} onClickFunc={() => onClickFunc(x.res_num)} />)}
        </div>
    </> );
}

export default WishList;