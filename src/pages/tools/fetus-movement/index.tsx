import React,{useState} from 'react';
// import DatePicker from '../components/DatePicker';
import FetusMovementInput from './Input'; 
import FetusMovementRecord from './Record'; 

export default function FetusMovement(props: any) {
  const { query } = props.history.location;
  const k = query.key || "input"
  // if(!query.key){
  //   props.history.replace(`/fetusmovement?key=input`);
  // }
  const [key, setKey] = useState(k);

  return (
    <div>
      {key === "input" ? (<FetusMovementInput />) : null}
      {key === "record" ? (<FetusMovementRecord />) : null}
    </div>
  )
}
