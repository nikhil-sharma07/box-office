import React, {useState} from 'react'
import MainPageLayout from '../components/MainPageLayout'

const Home = () => {
const [input, setInput] = useState('');

const onClick= async () => {
  const data=await fetch(`https://api.tvmaze.com/search/shows?q=${input}`);
  console.log(data.json());
  //fetch(`https://api.tvmaze.com/search/shows?q=girls`).then(res => res.json()).then(result => {console.log(result);});
}

const onKeyDown = ev => {
  if(ev.keyCode===13){
    onClick();
  }
  console.log(ev.keyCode);
}

const onChange=(ev)=>{
  setInput(ev.target.value);
}

  return (
    <MainPageLayout>
      <input type="text" onChange={onChange}  onKeyDown={onKeyDown} value={input}></input>
      <button type="button" onClick={onClick}>Search</button>
    </MainPageLayout>
  )
}

export default Home