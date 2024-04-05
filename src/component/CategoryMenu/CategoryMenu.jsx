import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link} from 'react-router-dom';

const CategoryMenu = ({ closeMenu }) => {
    const category = useSelector(state => state.store.category);
    const [focusedCategory, setFocusedCategory] = useState(null);

    const handleFocusCategory = (category) => {
        setFocusedCategory(category);
    };

    const handleBlurCategory = () => {
        setFocusedCategory(null);
    };

    return (
        <div className="px-6 mx-auto">
            <h2 className='text-lg font-bold text-black'>Category</h2>
            <ul>
                {/* Add an "All Products" button */}
                <li
                    className={`text-gray-500 hover:text-black group font-bold hover:shadow-xl px-2 py-1 group duration-300 ${focusedCategory === 'All Products' ? 'bg-purple-200 text-purple-800 shadow-lg' : '' }`} >
                    <Link to={`/category/all`} className='block' onClick={() => closeMenu && closeMenu()} onFocus={() => handleFocusCategory('All Products')} onBlur={handleBlurCategory} tabIndex="0" >
                        All Products
                    </Link>
                </li>

                {category && category.map((ele, ind) => (
                        <li key={ind} className={`text-gray-500 hover:text-black group font-bold hover:shadow-xl px-2 py-1 group duration-300 ${focusedCategory === ele ? 'bg-purple-200 text-purple-800 shadow-lg' : '' }`} >
                            <Link to={`/category/${ele}`} className='block' onClick={() => closeMenu && closeMenu()} onFocus={() => handleFocusCategory(ele)} onBlur={handleBlurCategory} tabIndex="0" >
                                {ele}
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default CategoryMenu;