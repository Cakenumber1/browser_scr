import type { NextPage } from 'next';
import { useState } from 'react';
import { handleScr } from '../helpers';
import { resType } from '../data';

const Home: NextPage = () => {
  const [data, setData] = useState<resType>();
  return (
    <div>
      <button type="button" onClick={() => handleScr(setData)}>Send Screenshot</button>
      {data && <div>
        <h3>Operation id: {data.id}</h3>
        <img src={data.img} style={{maxHeight: "50%", maxWidth: "60%", objectFit: 'contain'}}/>
        {data.words && <div>
          <h3>Words</h3>
          {data.words.map((w, k) =>
            (<div key={k}>{w}</div>))
          }
        </div>}
      </div>}
    </div>
  )
};

export default Home
