import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromList } from '../reduxApp/storeSlice';
import { Link } from 'react-router-dom';

const ShowWishList = () => {
    const wishlist = useSelector(state => state.store.wishList);
    const dispatch = useDispatch();

    const handleRemove = (item) => {
        dispatch(removeFromList(item));
    };



    return (
        <div className="container mx-auto my-8">
            <h1 className="text-3xl font-bold mb-4 text-center">Wishlist</h1>
            {wishlist.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <div className="flex flex-wrap justify-center gap-10">
                    {wishlist.map(item => (
                        <div key={item.id} className="bg-white sm:w-2/5 lg:w-3/12 xl:w-1/5  shadow-md rounded-lg overflow-hidden" >
                            <div className="p-4">
                                <Link to={`/item/${item.id}`} >
                                    <img src={item.thumbnail} alt={item.name} className="w-full h-48 object-cover mb-4" />
                                    <h2 className="text-lg font-bold mb-2 whitespace-nowrap overflow-hidden">{item.title}</h2>
                                    <p className="text-gray-500 mb-4 h-[55px] overflow-hidden">{item.description}</p>
                                </Link>
                                <div className="flex items-center justify-between">
                                    <p className="text-xl font-bold">${(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}</p>
                                    <div className="flex items-center">
                                        <button className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => handleRemove(item)} > Remove </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShowWishList;