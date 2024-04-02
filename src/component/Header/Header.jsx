import React, { useState, useEffect } from 'react';
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { SearchData } from '../reduxApp/storeSlice';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const category = useSelector(state => state.store.category);

    let navigate = useNavigate();
    let dispatch = useDispatch();
    const toggleMenu = () => {
        setIsAnimating(true);
        setIsOpen(!isOpen);
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const closeMenu = () => {
        setIsAnimating(true);
        setIsOpen(false);
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        if (isAnimating) {
            const animation = setTimeout(() => {
                setIsAnimating(false);
            }, 500);
            return () => clearTimeout(animation);
        }
    }, [isAnimating]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            search();
            closeMenu();
        }
    };

    let search = () => {
        if (searchValue) {
            dispatch(SearchData(searchValue))
            setSearchValue('')
            navigate('/Search');
        } else {
            alert('Please Add Item to Search...!')
        }
    }

    let HeaderData = [
        { id: 1, name: 'Home', link: '/' }, { id: 2, name: 'Product', link: '/product' }, { id: 3, name: 'Category', link: '/category' }, { id: 4, name: 'Wishlist', link: '/wishlist' }, { id: 5, name: 'Cart', link: '/cart' }];

    return (
        <header className="bg-white text-black py-4 shadow-xl sticky top-0 z-10">
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <div className="font-bold text-xl md:text-2xl lg:text-3xl">
                    <Link to={'/'}>My Logo</Link>
                </div>
                <div className="text-center md:hidden">
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 " type="button" onClick={toggleDrawer} aria-expanded={isDrawerOpen ? 'true' : 'false'} aria-controls="drawer-example" > Categories </button>
            </div>
                {/* Navigation */}
                <nav className="hidden md:flex gap-5 items-center">
                    <div className="flex items-center">
                        <input type="text" placeholder="Search..." value={searchValue} onChange={handleSearchChange} onKeyDown={handleKeyDown} className="px-3 py-2 border rounded-md mr-2 text-sm md:text-base lg:text-lg lg:w-[300px]" />
                        <button type="button" onClick={search} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-md text-sm md:text-base lg:text-md">
                            Search
                        </button>
                    </div>
                    <ul className="flex space-x-4 text-sm lg:text-md">
                        {HeaderData.map((ele, ind) => {
                            return (
                                <li key={ind}>
                                    <Link to={ele.link} className="hover:text-gray-700">{ele.name}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <FaBars className="h-6 w-6 fill-current" />
                    </button>
                </div>
            </div>
            {/* first Off-canvas Menu */}
            <div className={`${isOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl fixed inset-y-0 right-0 z-10 bg-white md:hidden transition-transform duration-300 ${isAnimating ? 'ease-out' : 'ease-in'}`} >
                <div className="h-full overflow-y-auto">
                    <nav className="p-4">
                        <div className="flex justify-end mb-4">
                            <button onClick={closeMenu} className="text-black hover:text-gray-900 focus:outline-none">
                                <RxCross2 className="h-6 w-6 fill-current" />
                            </button>
                        </div>
                        <input type="text" placeholder="Search..." value={searchValue} onKeyDown={handleKeyDown} onChange={handleSearchChange} className="px-3 py-2 border rounded-md w-full mb-2 text-sm md:text-base lg:text-lg" />
                        <button onClick={search} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-md w-full text-sm md:text-base lg:text-lg">
                            Search
                        </button>
                        <ul className="space-y-4 text-sm md:text-base lg:text-lg">
                            {HeaderData.map((ele, ind) => {
                                return (
                                    <li key={ind}>
                                        <Link to={ele.link} className="hover:text-gray-700">{ele.name}</Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </div>
            </div>
          
            {/* second off Canvas */}
            <div id="drawer-example" className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} bg-white w-80 `} tabIndex="-1" aria-labelledby="drawer-label" >
                <div className="h-full overflow-y-auto">
                    <nav className="p-4">
                        <ul className="space-y-4 text-sm md:text-base lg:text-lg">
                            {category.map((ele, ind) => {
                                return (
                                    <li key={ind}>
                                        <Link to={`/category/${ele}`} onClick={()=>{toggleDrawer()}} className="hover:text-gray-700">{ele}</Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;