import React, { useState , useEffect , useRef} from 'react'
import { useDispatchCart , useCart } from './ContextReducer';

export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const handleAddToCart = async() => {

        let juice = [];
        for(const item of data){
          if(item.id === props.juiceItem._id){
            juice = item;
            break;
          }
        }
        if(juice !== []){
          if(juice.size === size){
            await dispatch({ type: "UPDATE" , id: props.juiceItem._id , price: finalPrice , qty: qty});
            return 
          }
          else if(juice.size !== size){
            await dispatch({type:"ADD", id:props.juiceItem._id , name:props.juiceItem.name, price:finalPrice, qty:qty, size:size});
            return
          }
          return
        }
        await dispatch({type:"ADD", id:props.juiceItem._id , name:props.juiceItem.name, price:finalPrice, qty:qty, size:size});
    } 

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
      setSize(priceRef.current.value)
    }, []);


  return (
    <div>
        <div>
        <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
          <img className="card-img-top" alt='...' src={props.juiceItem.img} style={{height:"150px" , objectFit:"fill"}} />
          <div className="card-body bg-dark text-white">
            <h5 className="card-title">{props.juiceItem.name}</h5>
            <div className="container w-100">
              <select className="m-2 h-100 rounded bg-warning "onChange={(e)=> setQty(e.target.value)}>
                {Array.from(Array(6),(e,i)=>{
                  return(
                    <option key={i+1} value={i+1}>{i+1}</option>
                  )
                })}
              </select>

              <select className="m-2 h-100 rounded bg-warning " ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
                {priceOptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>
              <div className="d-inline h-100 fs-5">
              ₹ {finalPrice}/-
              </div>
            </div>
            <hr/>
            <button className={"btn justify-center ms-2 bg-warning"} onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
