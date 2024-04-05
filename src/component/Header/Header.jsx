import React, { useState, useEffect } from 'react';
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { SearchData } from '../reduxApp/storeSlice';

const Header = () => {
    let wishList = useSelector(state => state.store.wishList);
    let cart = useSelector(state => state.store.cart);
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const toggleMenu = () => {
        setIsAnimating(true);
        setIsOpen(!isOpen);
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
        closeMenu();
    }
    const logoClick = () => {
        navigate('/');
        window.location.reload();
    }
    let HeaderData = [
        { id: 1, name: 'Home', link: '/' }, { id: 2, name: 'Wishlist', link: '/wishlist',cnt: wishList.length }, { id: 3, name: 'Cart', link: '/cart', cnt: cart.length }];

    return (
        <header className="bg-white text-black py-4 shadow-xl sticky top-0 z-10">
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <div className="font-bold text-xl md:text-2xl lg:text-3xl">
                    <button onClick={() => { logoClick() }}>My Logo</button>
                </div>

                {/* Navigation */}
                <nav className="hidden lg:flex gap-5 items-center">
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
                                    <Link to={ele.link} className="hover:text-gray-700 py-1">{ele.name} {ele.cnt}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <FaBars className="h-6 w-6 fill-current" />
                    </button>
                </div>
            </div>
            {/* Off-canvas Menu */}
            <div className={`${isOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl fixed inset-y-0 right-0 z-20 bg-white lg:hidden transition-transform duration-300 ${isAnimating ? 'ease-out' : 'ease-in'}`} >
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
                        <ul className="space-y-4 text-sm md:text-base mt-5 lg:text-lg">
                            {HeaderData.map((ele, ind) => {
                                return (
                                    <li key={ind}>
                                        <Link to={ele.link} className="hover:text-gray-700" onClick={() => { toggleMenu() }}>{ele.name} {ele.cnt}</Link>
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