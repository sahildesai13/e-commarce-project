import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaStar, FaRegHeart } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { AddToCart, AddToList } from '../reduxApp/storeSlice';
function ProductView() {
    let wishList = useSelector(state => state.store.wishList);
    let data = useSelector(state => state.store.data);
    let cart = useSelector(state => state.store.cart);
    let [image, setImage] = useState();
    let [addedItems, setAddedItems] = useState(null);
    let [AddedWishList, SetAddedWishList] = useState(null);
    let dispatch = useDispatch();
    let params = useParams();
    let navigate = useNavigate();
    let handleCart = (ele, price) => {
        if (addedItems) {
            navigate('/cart');
        } else {
            dispatch(AddToCart({ ...ele, dicountPrice: price }));
        }
    }
    useEffect(() => {
        const matchedItem = cart.find((ele) => {
            return ele.id === parseInt(params.id);
        });
        setAddedItems(matchedItem || null);
    }, [cart, params.id]);

    useEffect(() => {
        const MatchedList = wishList.find((ele) => {
            return ele.id === parseInt(params.id);
        });
        SetAddedWishList(MatchedList || null);
    }, [wishList, params.id]);

    const handleClick = (ele) => {
        if (AddedWishList) {
            navigate('/wishList');
        } else {
            dispatch(AddToList(ele, ((ele.price) - (ele.price * ele.discountPercentage / 100))));
        }
    }
    return (
        <div>
            {data && data.map((ele, ind) => {
                if (ele.id == params.id) {
                    return (
                        <div key={ind}>
                            <section className="text-gray-600 body-font overflow-hidden">
                                <div className="container px-5 py-10 mx-auto">
                                    <div className=" mx-auto flex flex-wrap items-center justify-between">
                                        <div className='lg:w-5/12 w-full lg:h-auto  mb-5 md:mb-0 cursor-pointer '>
                                            <img alt="ecommerce" className="object-contian h-[300px] mx-auto max-h-[230px] md:max-h-[400px]  mb-10  rounded shadow-xl" src={image ? image : ele.thumbnail} />
                                            <div className="flex gap-2 flex-wrap justify-center">
                                                {ele.images && ele.images.map((item, index) => {
                                                    return (
                                                        <img alt="ecommerce" onClick={() => { setImage(item) }} className="w-1/6 max-h-[60px]  object-cover duration-300 border-indigo-500 border-2 hover:border-red-400  object-center rounded shadow-xl " src={item} key={index} />
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className="lg:w-6/12 w-full  lg:pr-10 lg:py-6 mb-6 lg:mb-0 mt-5 md:mt-10 lg:mt-0">
                                            <div className="">
                                                <h2 className="text-xs sm:text-sm  title-font text-gray-500 tracking-widest">{ele.brand}</h2>
                                                <div className="sm:flex justify-between items-center">
                                                    <h1 className="text-gray-900 text-xl  sm:text-3xl title-font font-medium sm:mb-3">{ele.title}</h1>
                                                    <p className='uppercase font-semibold text-xs md:text-base mt-2'>{ele.category}</p>
                                                </div>
                                            </div>
                                            <div className="flex mb-4">
                                                <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">Description</a>
                                            </div>
                                            <p className="leading-relaxed mb-4">{ele.description}</p>
                                            <div className="flex border-t border-gray-200 py-2">
                                                <span className="text-gray-500">Consumer Rating</span>
                                                <span className="ml-auto text-gray-900 items-center flex">{ele.rating}<FaStar className='text-gray-600' /></span>
                                            </div>
                                            <div className="flex border-t mb-4 border-gray-200 py-2">
                                                <span className="text-gray-500">Available Quantity</span>
                                                <span className="ml-auto text-gray-900">{ele.stock}</span>
                                            </div>
                                            <div className="flex border-t mb-4 border-gray-200 py-2">
                                                <span className="text-gray-500">Discount Applicable </span>
                                                <span className="ml-auto text-green-600 font-bold">{ele.discountPercentage}% OFF</span>
                                            </div>
                                            <div className=" md:flex justify-between items-center">
                                                <div className="flex md:block items-center justify-between">
                                                    <span className='text-gray-500 md:hidden'>Price </span>
                                                    <span className="title-font font-medium text-lg md:text-2xl text-gray-900 pe-3">${Math.trunc((ele.price) - (ele.price * ele.discountPercentage / 100))}</span>
                                                    <span className="title-font font-medium text-lg md:text-sm text-gray-400 line-through">${ele.price}</span>
                                                </div>
                                                <div className='flex justify-center gap-5 mt-5 md:mt-5'>
                                                    <button onClick={() => { handleCart(ele, ((ele.price) - (ele.price * ele.discountPercentage / 100))) }} className=" relative w-36 hover:w-28 md:hover:w-40  duration-300 xl:w-48  md:w-46 h-10 cursor-pointer flex text-center rounded-3xl items-center border overflow-hidden border-purple-500 bg-purple-500 group hover:bg-purple-700 active:bg-purple-700 active:border-purple-700">
                                                        <span className="text-gray-200 text-xs xl:text-sm font-semibold mx-auto ml-8 transform group-hover:translate-x-20 transition-all duration-300">{addedItems ? "Go to Cart" : 'Add To Cart'}</span>
                                                        <span className="absolute right-0 h-full w-10 rounded-3xl bg-purple-500 hover:bg-purple-700 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
                                                            <svg className="svg w-8 font-bolder text-white" fill="none" height={24} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg">
                                                                <line x1={12} x2={12} y1={5} y2={19} />
                                                                <line x1={5} x2={19} y1={12} y2={12} />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    {/* --------------------------------------- */}

                                                    <button onClick={() => { handleClick(ele) }} className="group flex items-center justify-start w-10 h-10 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-36 md:hover:w-42 xl:hover:w-48 ">
                                                        <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                                                            <FaRegHeart className='text-white font-bolder' />
                                                        </div>
                                                        <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-xs md:text-md xl:text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                                            {AddedWishList ? "Go To WishList" : "Add To Wishlist"}
                                                        </div>
                                                    </button>

                                                    {/* --------------------------------------- */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default ProductView