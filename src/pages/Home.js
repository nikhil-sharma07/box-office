import React, {useState} from 'react'
import MainPageLayout from '../components/MainPageLayout'
import { apiGet } from '../misc/config';

const Home = () => {
const [input, setInput] = useState('');
const [results, setResults] = useState(null);
const [searchOption, setSearchOption] = useState('shows');


const isShowSearch = searchOption === 'shows';

const renderResults = () => {
  if(results && results.length === 0){
    return <div>No Results!</div>
  }else if(results && results.length > 0){
    //const val=isShowSearch? 'shows' : 'person';
    if(results[0].show)
      return <div>{results.map((item) => <div key={item.show.id}> {item.show.name} </div>)} </div>
    else
      return <div>{results.map((item) => <div key={item.person.id}> {item.person.name} </div>)} </div>
  }

  return null;
}

const onSearch= async () => {
  apiGet(`/search/${isShowSearch ? 'shows' : 'people'}?q=${input}`)
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


const onRadioChange = (ev) => {
    setSearchOption(ev.target.value);
}

const onChange=(ev)=>{
  setInput(ev.target.value);
}

  return (
    <MainPageLayout>
      <input type="text" placeholder='Search for something..' onChange={onChange}  onKeyDown={onKeyDown} value={input}></input>
      <div>
        <label id="show-search">
          Shows
          <input id="show-search" checked={isShowSearch} type="radio" value="shows" onChange={onRadioChange}/>
        </label>

        <label id="actor-search">
          Actors
          <input id="actor-search" checked={!isShowSearch} type="radio" value="actors" onChange={onRadioChange}/>
        </label>
      </div>



      <button type="button" onClick={onSearch}>Search</button>
      {renderResults()}
    </MainPageLayout>
  )
}

export default Home