import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, updateQuantity } from '../reduxApp/storeSlice'
import { MdDeleteOutline } from "react-icons/md";
function CartView() {
    const cart = useSelector(state => state.store.cart);
    console.log(cart);
    const dispatch = useDispatch()

    const handleRemoveFromCart = (item) => {
        dispatch(removeFromCart(item))
    }

    const handleQuantityChange = (item, newQuantity) => {
        dispatch(updateQuantity({ ...item, quantity: newQuantity }))
    }
    return (
        <div className='container mx-auto px-4 py-8'>
            <h2 className='text-2xl text-center font-bold mb-4'>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className='md:flex md:gap-10 xl:mx-5 lg:gap-20'>
                    {/* Cart ---------------------------------------------- */}
                    <div className="cart md:w-8/12">
                        {cart.map((item, index) => (
                            <div key={index} className='bg-white mb-10 rounded-lg shadow-md p-4'>
                                <div className='flex items-start justify-between '>
                                    <div>
                                        <h3 className='text-lg font-semibold mb-2'>{item.title}</h3>
                                        <div className="md:flex items-start gap-4">
                                            <img src={item.thumbnail} alt={item.title} className=' rounded-md max-h-16 w-20 object-contain mb-2' />
                                            <div className="">
                                                <p className='text-gray-600 text-xs font-semibold'>Items Left: {item.stock}</p>
                                                <div className='flex text-gray-600 items-center'>
                                                    <p className=' me-1'>Price: <span className='font-bold text-green-600'>${Math.trunc(item.dicountPrice)} </span></p>
                                                    <p className=' text-xs line-through '>${item.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-center h-full'>
                                        <div className='flex gap-5  items-center'>
                                            <div className='flex items-center justify-between '>
                                                <div className='flex items-center'>
                                                    <button onClick={() => handleQuantityChange(item, item.quantity - 1)} disabled={item.quantity === 1} className='bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-l px-2 py-1' > - </button>
                                                    <span className='mx-2'>{item.quantity}</span>
                                                    <button onClick={() => handleQuantityChange(item, item.quantity + 1)} className='bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-r px-2 py-1' > + </button>
                                                </div>
                                            </div>
                                            <button onClick={() => handleRemoveFromCart(item)} className="group  hover:w-24 flex items-center justify-start w-10 h-10 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg ">
                                                <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                                                    <MdDeleteOutline className='text-white text-lg font-bolder' />
                                                </div>
                                                <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-xs md:text-sm  font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                                    Delete
                                                </div>
                                            </button>
                                        </div>
                                        <p className='text-gray-600 mt-5 lg:mt-10'>Total: ${Math.trunc(item.dicountPrice) * item.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Summry--------------------------------------------- */}
                    <div className='md:w-3/12'>
                        <div className="md:fixed md:w-3/12">
                            <h3 className='text-lg font-semibold mb-2'>Order Summary</h3>
                            <div className='bg-white rounded-lg shadow-md p-4'>
                                <div className='flex justify-between mb-2'>
                                    <p className='text-gray-600'>Total MRP:</p>
                                    <p className='text-gray-800 font-semibold'>
                                        ${cart.reduce((total, item) => total + Math.trunc(item.price) * item.quantity, 0)}
                                    </p>
                                </div>
                                <div className='flex justify-between mb-2'>
                                    <p className='text-gray-600'>Subtotal:</p>
                                    <p className='text-gray-800 font-semibold'>
                                        ${cart.reduce((total, item) => total + Math.trunc(item.dicountPrice) * item.quantity, 0)}
                                    </p>
                                </div>
                                <div className='flex justify-between mb-2'>
                                    <p className='text-gray-600'>Tax:</p>
                                    <p className='text-gray-800 font-semibold'>
                                        ${cart.reduce((total, item) => total + Math.trunc(item.dicountPrice) * item.quantity * 0.08, 0).toFixed(2)}
                                    </p>
                                </div>
                                <div className='flex justify-between mt-4'>
                                    <p className='text-gray-600 font-semibold'>Total:</p>
                                    <p className='text-gray-800 font-bold'>
                                        ${(cart.reduce((total, item) => total + Math.trunc(item.dicountPrice) * item.quantity, 0) + cart.reduce((total, item) => total + Math.trunc(item.dicountPrice) * item.quantity * 0.08, 0)).toFixed(2)}
                                    </p>
                                </div>
                                <button className='bg-indigo-600 text-white py-2 px-4 rounded-md w-full mt-4'>
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartView