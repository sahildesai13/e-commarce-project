import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaStar } from "react-icons/fa";
import { useParams } from 'react-router-dom';
function ProductView() {
    let params = useParams();
    console.log(params.id);
    let data = useSelector(state => state.store.data);
    let [image, setImage] = useState();

    return (
        <div>
            {data && data.map((ele, ind) => {
                if (ele.id == params.id) {
                    return (
                        <div key={ind}>
                            <section className="text-gray-600 body-font overflow-hidden">
                                <div className="container px-5 py-10 mx-auto">
                                    <div className="lg:w-4/5 mx-auto flex flex-wrap items-center justify-between">
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
                                        <div className="lg:w-6/12 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 md:mt-5">
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
                                            <div className=" md:flex justify-between items-center">
                                                <div className="flex md:block items-center justify-between">
                                                    <span className='text-gray-500 md:hidden'>Price </span>
                                                    <span className="title-font font-medium text-lg md:text-2xl text-gray-900">${ele.price}</span>
                                                </div>
                                                <div className='flex mt-5 md:mt-5'>
                                                    <button className="rounded-lg relative w-52 md:w-72 h-10 cursor-pointer flex text-center items-center border overflow-hidden border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500">
                                                        <span className="text-gray-200 font-semibold mx-auto ml-8 transform group-hover:translate-x-20 transition-all duration-300">ADD TO CART</span>
                                                        <span className="absolute right-0 h-full w-10 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
                                                            <svg className="svg w-8 text-white" fill="none" height={24} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg">
                                                                <line x1={12} x2={12} y1={5} y2={19} />
                                                                <line x1={5} x2={19} y1={12} y2={12} />
                                                            </svg>
                                                        </span>
                                                    </button>


                                                    <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                                        </svg>
                                                    </button>
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