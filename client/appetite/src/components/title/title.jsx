const Title = ({type=''}) => {
    return ( <nav className="title">
        Appetite Seek{ type==='admin'?<>&nbsp; -- admin</>:null }
    </nav> );
}
 
export default Title;