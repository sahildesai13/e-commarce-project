import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Product() {
    const data = useSelector(state => state.store.data);
    const category = useSelector(state => state.store.category);

    return (
        <div className='container mx-auto flex'>
            {/* Category Section */}
            <section className='text-gray-600 body-font w-2/12 sticky top-[100px] hidden lg:flex h-lvh'>
                <div className="px-5 py-10 mx-auto">
                    <ul>
                        {category && category.map((ele, ind) => (
                            <li key={ind}><Link to={`/category/${ele}`}>{ele}</Link></li>
                        ))}
                    </ul>
                </div>
            </section>
            {/* Product Section */}
            <section className="text-gray-600 body-font  w-full lg:w-10/12">
                <div className="px-5 py-10 mx-auto">
                    <div className="flex flex-wrap justify-center">
                        {data.map((ele, ind) => (
                            <div className="w-full sm:w-1/2 lg:w-4/12 xl:w-1/4 2xl:w-3/12 my-5 p-4" key={ind}>
                                <Link to={`/item/${ele.id}`} className="block bg-white rounded-md overflow-hidden shadow-xl">
                                    <div className="relative h-48 overflow-hidden">
                                        <img alt={ele.title} className="object-cover object-center w-full h-full hover:scale-105 duration-300" src={ele.thumbnail} />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase md:text-sm lg:text-base">{ele.category}</h3>
                                        <h2 className="text-gray-900 title-font text-sm font-medium mb-2 line-clamp-2 w-full overflow-hidden whitespace-nowrap md:text-base lg:text-lg">{ele.title}</h2>
                                        <div className='flex justify-between items-center mt-4'>
                                            <p className="mt-1 text-gray-900 font-normal text-sm md:text-base lg:text-lg">${ele.price}</p>
                                            <button className="overflow-hidden flex items-center text-white bg-gray-900 rounded group">
                                                <span className="px-3 py-2 text-white bg-purple-600 transition-colors duration-300 group-hover:bg-green-700 flex items-center justify-center">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                    </svg>
                                                </span>
                                                <span className="pl-3 pr-4 py-1 text-xs md:text-sm lg:text-base">Add To Cart</span>
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
    );
}

export default Product;
