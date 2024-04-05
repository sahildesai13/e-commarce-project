import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import CategoryMenu from '../CategoryMenu/CategoryMenu';
import PriceFilter from '../PriceFilter/PriceFilter';
import { RxCross2 } from 'react-icons/rx';

function Category() {
    let param = useParams();
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2000);
    const [focusedRange, setFocusedRange] = useState(null);
    const [selectedRange, setSelectedRange] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    let data = useSelector(state => state.store.data);
    
    let item = data.filter((ele) => {
        return ele.category === param.id;
    });
    if(param.id === 'all'){
        item = data;    
    }
    const filteredData = item.filter((ele) => ele.price > minPrice && ele.price <= maxPrice);
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

    const toggleMenu = () => {
        setIsAnimating(true);
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsAnimating(true);
        setIsOpen(false);
    };

    return (
        <div className="container lg:p-0">
            <div className="lg:flex gap-20 justify-between">
                {/* Category Section And Price Filter In Mobile Device */}
                {/* offCanvas Button */}
                <div className="flex justify-center  pt-5 pb-0 w-full lg:hidden">
                    <button onClick={toggleMenu} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-md text-sm md:text-base lg:text-md">
                        Category And Price-Filter
                    </button>
                </div>

                {/* Off-canvas Menu */}
                <div className={`${isOpen ? 'translate-x-0' : 'translate-x-full'} w-80  shadow-2xl z-20 fixed inset-y-0 right-0  bg-white lg:hidden transition-transform duration-300 ${isAnimating ? 'ease-out' : 'ease-in'}`} >
                    <div className="h-full overflow-y-auto">
                        <nav className="p-4">
                            <div className="flex justify-end mb-4">
                                <button onClick={closeMenu} className="text-black hover:text-gray-900 focus:outline-none">
                                    <RxCross2 className="h-6 w-6 fill-current" />
                                </button>
                            </div>
                            <PriceFilter handleClick={handleClick} handleFocus={handleFocus} handleBlur={handleBlur} focusedRange={focusedRange} selectedRange={selectedRange} />
                            <CategoryMenu closeMenu={closeMenu} />
                        </nav>
                    </div>
                </div>

                {/* Category & Price Filter Section */}
                <section className='text-gray-600 body-font w-3/12  xl:w-2/12 cursor-pointer hidden lg:block'>
                    <div className='fixed w-3/12 xl:w-2/12 h-full top-0 overflow-y-scroll menuBar'>
                        <PriceFilter handleClick={handleClick} handleFocus={handleFocus} handleBlur={handleBlur} focusedRange={focusedRange} selectedRange={selectedRange} />
                        <CategoryMenu param={param} handleClick={handleClick} setSelectedRange={setSelectedRange} closeMenu={closeMenu} />
                    </div>
                </section>
                {/* Product Section */}
                <section className="text-gray-600 body-font w-full lg:w-10/12">
                    <div className="px-5 sticky top-[100px] py-10 mx-auto">
                        <div className="flex flex-wrap justify-center">
                            {filteredData.map((ele, ind) => (
                                <div className="w-full sm:w-1/2  xl:w-4/12 2xl:w-3/12 my-5 p-4" key={ind}>
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
                                                    <span className="pl-3 pr-4 py-1 text-xs md:text-sm 2xl:text-base">Add to Wishlist</span>
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

export default Category;