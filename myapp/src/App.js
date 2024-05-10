import { useState } from "react";

function App() {
  const [first, setFirst] = useState([1,2,3,4,5])
  const f =(i)=>{

  }
  const g = (v)=>{

  }
  return (
    <div className="App">
     
    {first}
    <button onClick={f}>3씩증가</button>
    <button onClick={g}>3씩감소</button>
    </div>
   
  );
}

export default App;
