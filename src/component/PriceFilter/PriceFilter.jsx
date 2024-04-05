import React from 'react';

const PriceFilter = ({ handleClick, handleFocus, handleBlur, focusedRange, selectedRange }) => {
    const price = [
        { min: 0, max: 100 },
        { min: 100, max: 300 },
        { min: 300, max: 500 },
        { min: 500, max: 1000 },
        { min: 1000, max: 2000 },
    ];

    const handleTouchClick = (min, max) => {
        handleClick(min, max);
    };

    return (
        <div className="px-5 pd-10 md:pt-20 pb-4 mx-auto">
            <h2 className='text-lg font-bold text-black'>Price Filter</h2>
            <div className='px-1 mx-auto'>
                <div onTouchStart={() => handleTouchClick(0, 2000)} onClick={() => handleClick(0, 2000)} onFocus={() => handleFocus(0, 2000)} onBlur={handleBlur} tabIndex="0" className={`flex my-[2px] rounded-sm justify-center items-center text-black group font-bold hover:shadow-xl px-2 py-1 duration-300 ${focusedRange === '0-2000' || selectedRange === '0-2000' ? 'bg-purple-200 text-purple-800' : ''}`}  >
                    <h3 className='duration-200 text-xs md:text-sm lg:text-base group-hover:text-purple-800'>ALL Products</h3>
                </div>
                {price.map((ele, ind) => {
                    const rangeKey = `${ele.min}-${ele.max}`;
                    return (
                        <div key={ind} onTouchStart={() => handleTouchClick(ele.min, ele.max)} onClick={() => handleClick(ele.min, ele.max)}     onFocus={() => handleFocus(ele.min, ele.max)} onBlur={handleBlur} tabIndex="0" className={`flex items-center my-[2px] rounded-sm text-gray-500 hover:text-black group font-bold hover:shadow-xl px-2 py-1 group duration-300 ${focusedRange === rangeKey || selectedRange === rangeKey ? 'bg-purple-200 text-purple-800' : ''}`} >
                            <h3 className='duration-200 text-xs md:text-sm lg:text-base w-1/3'>$ {ele.min}</h3>
                            <h3 className='duration-200 text-xs md:text-sm lg:text-base w-1/3 group-hover:text-purple-800'>to</h3>
                            <h3 className='duration-200 text-xs md:text-sm lg:text-base w-1/3'>{ele.max === 2000 ? 'Max' : '$ ' + ele.max}</h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PriceFilter;