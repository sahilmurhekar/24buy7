import './backedby.css';
function Backedby(){
    return(
        <div>
            <div className='backed'>
                <div  className='ourServicePage'><h1 id='bh'>BACKED BY</h1></div>
                <div className='backedimages'>
                    <img height={'100vh'} src='riidl.png'/>
                    <img height={'100vh'} src='startup.png'/>
                    <img height={'100vh'} src='msis.png'/>
                    <img height={'100vh'} src='dpiit.png'/>
                </div>
            </div>
        </div>
    );
}
export default Backedby;