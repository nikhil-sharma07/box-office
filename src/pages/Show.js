import React,{useReducer,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { apiGet } from '../misc/config'
import ShowMainData from '../components/show/ShowMainData'
import Details from '../components/show/Details'
import Seasons from '../components/show/Seasons'
import Cast from '../components/show/Cast'
import { ShowPageWrapper, InfoBlock } from './Show.styled'

const Reducer = (prevState, action) => {
    const val=action.type;
    if(val === 'FETCH_SUCCESS'){
        return {isLoading: false, error:null, show:action.show};
    }else if(val === 'FETCH_FAILED'){
        return {isLoading: false, error:action.error, show:null};
    }else{
        return prevState;
    }
}


const initialState = {
    show:null,
    isLoading:true,
    error:null
}


const Show = () => {
  const {id} =  useParams(); 
  const [{show, isLoading, error}, dispatch]=useReducer(Reducer, initialState);

  useEffect(()=>{
    let isMounted=true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {
        setTimeout(()=>{
            if(isMounted){
                dispatch({type:'FETCH_SUCCESS', show: results})
            }
        },2000)
    }).catch(err => {
        if(isMounted){
            dispatch({type:'FETCH_FAILED', error: err.message})
        }
    })

    return () => {
        isMounted=false;
    }

  }, [id])


  //console.log(show);
  if(isLoading){
    return <div>Data is being Loaded!</div>
  }

  if(error){
    return <div>`Error: ${error}`</div>
  }

  return (
    <ShowPageWrapper>
        <ShowMainData
            image={show.image}
            name={show.name}
            rating={show.rating}
            summary={show.summary}
            tags={show.genres}
        />
        <InfoBlock>
            <h2>Details</h2>
            <Details
                status={show.status}
                network={show.network}
                premiered={show.premiered}
            />
        </InfoBlock>

        <InfoBlock>
            <h2>Seasons</h2>
            <Seasons
                seasons={show._embedded.seasons}
            />
        </InfoBlock>

        <InfoBlock>
            <h2>Cast</h2>
            <Cast
                cast={show._embedded.cast}
            />
        </InfoBlock>
    </ShowPageWrapper>
  )
}

export default Show