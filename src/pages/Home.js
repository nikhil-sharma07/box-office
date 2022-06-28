import React, {useState} from 'react'
import MainPageLayout from '../components/MainPageLayout'
import { apiGet } from '../misc/config'
import ShowGrid from '../components/show/ShowGrid'
import ActorGrid from '../components/actor/ActorGrid'


const Home = () => {
const [input, setInput] = useState('');
const [results, setResults] = useState(null);
const [searchOption, setSearchOption] = useState('shows');


const isShowSearch = searchOption === 'shows';

const renderResults = () => {
  if(results && results.length === 0){
    return <div>No Results!</div>
  }else if(results && results.length > 0){
    if(results[0].show)
      return <ShowGrid data={results}/>
    else
      return <ActorGrid data={results}/>
  }

  return null;
}

const onSearch= async () => {
  apiGet(`/search/${isShowSearch ? 'shows' : 'people'}?q=${input}`)
     .then(result => {
      setResults(result);
     })
}

const onKeyDown = ev => {
  if(ev.keyCode===13){
    onSearch();
  }
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