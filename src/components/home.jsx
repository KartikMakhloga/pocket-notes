import React from 'react';
import { IoMdLock } from 'react-icons/io';
import homeImage from '../assets/home.png';

const Home = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <img className="h-4/6 w-2/5 mt-32" src={homeImage} alt="img" />
            <h1 className='font-bold text-3xl mt-20 mb-4 text-center'>Pocket Notes</h1>
            <h2 className='text-center'>Send and receive messages without keeping your phone online.</h2>
            <h2 className='text-center'>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</h2>

            <div className='mt-40 flex gap-2 items-center justify-center'>
                <IoMdLock />
                <h2 className='text-center'>end-to-end encrypted</h2>
            </div>
        </div>
    );
};

export default Home;
