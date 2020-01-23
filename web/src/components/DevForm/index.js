import React, {useState, useEffect} from 'react';

function DevForm({onSubmit}){

    const [username, setUsername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition( 
          (position) => {
            const {latitude, longitude}  = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
    
          },
          (err) => {
            console.log(err);
          },
          {
            timeout: 30000, 
          }
        )
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            username,
            techs,
            latitude,
            longitude,
        });

        setUsername('');
        setTechs('');
    }

    return (
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="username">Usuáro do Github</label>
            <input 
                name="username" 
                id="username" 
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
                name="techs" 
                id="techs" 
                required
                value={techs}
                onChange={e => setTechs(e.target.value)}
            />
          </div>

          
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                type="numbers" 
                name="Latitude" 
                id="Latitude" 
                required value={latitude}
                onChange={e => setLatitude(e.target.value)}
                /> 
            </div>  
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                    type="numbers" 
                    name="Longitude" 
                    id="Longitude" 
                    required value={longitude}
                    onChange={e => setLongitude(e.target.value)}
                />
            </div>
          </div>
        
         <button type="submit">Salvar</button>
        </form>
    );
}

export default DevForm;