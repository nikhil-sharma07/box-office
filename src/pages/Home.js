import React, {useState} from 'react'
import MainPageLayout from '../components/MainPageLayout'
import { apiGet } from '../misc/config';

const Home = () => {
const [input, setInput] = useState('');
const [results, setResults] = useState(null);


const renderResults = () => {
  if(results && results.length === 0){
    return <div>No Results!</div>
  }else if(results && results.length > 0){
    return <div>{results.map((item) => <div key={item.show.id}> {item.show.name} </div>)} </div>
  }

  return null;
}

const onSearch= async () => {
  apiGet(`/search/shows?q=${input}`)
     .then(result => {
      setResults(result);
      //console.log(result);
     })
}

const onKeyDown = ev => {
  if(ev.keyCode===13){
    onSearch();
  }
  //console.log(ev.keyCode);
}

const onChange=(ev)=>{
  setInput(ev.target.value);
}

  return (
    <MainPageLayout>
      <input type="text" onChange={onChange}  onKeyDown={onKeyDown} value={input}></input>
      <button type="button" onClick={onSearch}>Search</button>
      {renderResults()}
    </MainPageLayout>
  )
}

export default Home