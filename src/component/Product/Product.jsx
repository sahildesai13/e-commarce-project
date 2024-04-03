import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Product() {
    const data = useSelector(state => state.store.data);
    const category = useSelector(state => state.store.category);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2000);
    const [focusedRange, setFocusedRange] = useState(null);
    const [selectedRange, setSelectedRange] = useState(null);

    const price = [
        { min: 0, max: 100 },
        { min: 100, max: 300 },
        { min: 300, max: 500 },
        { min: 500, max: 1000 },
        { min: 1000, max: 2000 },
    ];
    const filteredData = data.filter((item) => item.price > minPrice && item.price <= maxPrice);
    console.log(filteredData);

    const handleClick = (min, max) => {
        setMinPrice(min);
        setMaxPrice(max);
        setSelectedRange(`${min}-${max}`);
    };

    const handleFocus = (min, max) => {
        setFocusedRange(`${min}-${max}`);
    };

    const handleBlur = () => {
        setFocusedRange(null);
    };
    return (
        <div className="container">

            <div className='flex'>

                {/* Category Section */}
                <section className='text-gray-600 body-font w-2/12 cursor-pointer hidden lg:block  '>
                    <div className='fixed w-2/12 h-full top-0 overflow-y-scroll menuBar' >
                        <div className="px-5 pt-20 pb-4 mx-auto">
                            <h2 className='text-lg font-bold text-black '>Price Filter</h2>
                            <div className='px-1 mx-auto'>
                                <div onClick={() => handleClick(0, 2000)} onFocus={() => handleFocus(0, 2000)} onBlur={handleBlur} tabIndex="0" className={`flex my-[2px] rounded-sm justify-center items-center text-black group font-bold hover:shadow-xl px-2 py-1 duration-300 ${focusedRange === '0-2000' || selectedRange === '0-2000' ? 'bg-purple-200 text-purple-800' : '' }`} >
                                    <h3 className='duration-200 text-xs md:text-sm  lg:text-base group-hover:text-purple-800'>ALL Products</h3>
                                </div>
                                {price.map((ele, ind) => {
                                    const rangeKey = `${ele.min}-${ele.max}`;
                                    return (
                                        <div key={ind} onClick={() => handleClick(ele.min, ele.max)} onFocus={() => handleFocus(ele.min, ele.max)} onBlur={handleBlur} tabIndex="0" className={`flex items-center my-[2px] rounded-sm text-gray-500 hover:text-black group font-bold hover:shadow-xl px-2 py-1 group duration-300 ${focusedRange === rangeKey || selectedRange === rangeKey ? 'bg-purple-200 text-purple-800' : '' }`} >
                                            <h3 className='duration-200 text-xs md:text-sm lg:text-base w-1/3'>$ {ele.min}</h3>
                                            <h3 className='duration-200 text-xs md:text-sm lg:text-base w-1/3 group-hover:text-purple-800'>to</h3>
                                            <h3 className='duration-200 text-xs md:text-sm lg:text-base w-1/3'>{ele.max === 2000 ? 'Max' : '$ ' + ele.max}</h3>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="px-6 mx-auto">
                            <h2 className='text-lg font-bold text-black '>Category </h2>
                            <ul>
                                {category && category.map((ele, ind) => (
                                    <li key={ind} className=' text-gray-500 hover:text-black group font-bold hover:shadow-xl px-2 py-1 group duration-300'>
                                        <Link to={`/category/${ele}`}>{ele}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
                {/* Product Section */}
                <section className="text-gray-600 body-font w-full lg:w-10/12">
                    <div className="px-5 sticky top-[100px] py-10 mx-auto">
                        <div className="flex flex-wrap justify-center">
                            {filteredData.map((ele, ind) => (
                                <div className="w-full sm:w-1/2 lg:w-4/12 xl:w-1/4 2xl:w-3/12 my-5 p-4" key={ind}>
                                    <Link to={`/item/${ele.id}`} className="block bg-white rounded-md overflow-hidden shadow-xl">
                                        <div className="relative h-48 overflow-hidden">
                                            <img alt={ele.title} className="object-cover object-center w-full h-full hover:scale-105 duration-300" src={ele.thumbnail} />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase xl:text-md ">{ele.category}</h3>
                                            <h2 className="text-gray-900 title-font text-sm font-medium mb-2 line-clamp-2 w-full overflow-hidden whitespace-nowrap md:text-base xl:text-lg">{ele.title}</h2>
                                            <div className='flex justify-between items-center mt-4'>
                                                <p className="mt-1 text-gray-900 font-normal text-sm md:text-base">${ele.price}</p>
                                                <button className="overflow-hidden flex items-center text-white bg-gray-900 rounded group">
                                                    <span className="px-3 py-2 text-white bg-purple-600 transition-colors duration-300 group-hover:bg-green-700 flex items-center justify-center">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                        </svg>
                                                    </span>
                                                    <span className="pl-3 pr-4 py-1 text-xs md:text-sm 2xl:text-base">Add To Cart</span>
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>

    );
}

export default Product;