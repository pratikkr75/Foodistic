import React, { useEffect, useState, useRef } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
// import { useSearchParams } from 'react-router-dom';

export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("")

    const handleAddToCart = async () => {
        let food = [];
        for (const item of data) {
            if (props.foodItem && item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        if (food.length !== 0) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return;
            }
            else if (food.size !== size) {

                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
                return;
            }
            return;
        }

        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
    }

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div className="card mt-3" style={{ "width": "18rem" }}>
            <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "170px", objectFit: "fill" }} />
            <div className="card-body d-flex flex-column">
                <h5 className='card-title'>{props.foodItem.name}</h5>
                <div className='container w-100'>
                    <select className='m-2 h-100  bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                        {Array.from(Array(6), (e, i) => (
                            <option key={i + 1} value={i + 1}> {i + 1} </option>
                        ))}
                    </select>
                    <select className='m-2 h-100  bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                        {priceOptions.map((data) => (
                            <option key={data} value={data}>{data}</option>
                        ))}
                    </select>
                    <div className='d-inline h-100'>
                        ₹{finalPrice}/-
                    </div>
                </div>
                <hr>
                </hr>
                <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>
                    <i className="bi bi-cart text-white"></i> Add to Cart
                </button>

            </div>
        </div>
    );
}
