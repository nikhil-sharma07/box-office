import React,{useReducer,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { apiGet } from '../misc/config'

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


  console.log(show);
  if(isLoading){
    return <div>Data is being Loaded!</div>
  }

  if(error){
    return <div>`Error: ${error}`</div>
  }

  return (
    <div>
        HELLO
    </div>
  )
}

export default Show