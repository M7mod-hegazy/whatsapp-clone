import { Circle } from 'better-react-spinkit';

function Loading() {

    return (
        <center style={{ display:'grid', placeItems: 'center', height: '100vh' }}>
          <div>
              <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/640px-WhatsApp.svg.png" 
              alt="" 
              height={200} 
              style={{ marginBottom: 10}} />
              
              <Circle color="#3CBC28" size={60} />
          </div>
          
        </center>
    ) 
}

export default Loading