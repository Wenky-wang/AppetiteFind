import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ResBlock = ({type='', obj: {res_num, name, time, nation, totalRating, ratingNumber}, wished=false, onClickFunc=f=>f}) => {
    // variables declaration
    let tagColor, bottomColor, tagContent;

    // onclick event handler
    const cancelWish = () => {
        onClickFunc();
    }

    // define difference css for different type of block use
    if (type === '') {
        bottomColor = 'MediumSeaGreen';
        tagContent = '';
        if (wished) {
            tagColor = 'LightCoral';
            tagContent = <FaHeart color='Pink' />
        }
        else {
            tagContent = '';
            tagColor = '';
        }       
    }
    else if (type === 'admin') {
        tagColor = 'PeachPuff';
        bottomColor = 'SteelBlue';
        tagContent = res_num;
    }
    else if (type === 'top') {
        tagColor = 'LightCoral';
        bottomColor = 'MediumSeaGreen';
        tagContent ='TOP';
    }
    else if (type === 'wish') {
        tagColor = 'LightCoral';
        bottomColor = '#7060b6';
        tagContent = <>&nbsp;<FaHeart color='Pink' size='19px' onClick={cancelWish}/>&nbsp;</>;
    }

    // result
    return ( 
        <div className='entire_block' style={{ backgroundImage: 'url('+require( `../../images/${res_num}.jpeg`)+')' }}>
            { tagContent === ''?<></>: 
                <span className="block_tag" style={{backgroundColor: tagColor}}>
                    &nbsp;{tagContent}&nbsp;
                    {(type==='top')&&(wished)?<>&nbsp;<FaHeart color='Pink' /></>:null}
                </span>
            }
            { type === 'admin'?
            <Link className='block_bottom' style={{backgroundColor: bottomColor}}
            to={"/editRes"} state={{ res_num }} >
                    {name} / {(totalRating / ratingNumber).toFixed(2)}
            </Link> 
            :
            <Link className='block_bottom' style={{backgroundColor: bottomColor}}
            to={"/resDetail"} state={{ res_num }} >
                    {name} / {(totalRating / ratingNumber).toFixed(2)}
            </Link> }
        </div>
     );
}
 
export default ResBlock;