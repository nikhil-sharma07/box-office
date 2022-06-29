import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { apiGet } from '../misc/config'


const Show = () => {
  const {id} =  useParams(); 
  const [show,setShow] = useState('null');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    let isMounted=true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {
        setTimeout(()=>{
            if(isMounted){
                setShow(results);
                setIsLoading(false);
            }
        },2000)
    }).catch(err => {
        if(isMounted){
            setIsLoading(false);
            setError(err);
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