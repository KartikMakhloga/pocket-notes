import React, { useEffect, useState } from 'react'
import "../App.css"
import Modal from 'react-modal';
import { apiConnector } from '../services/apiconnector';
import { group } from '../services/apis'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '35%',
        height: '30%',
    },
};

Modal.setAppElement('#root');

const sidebar = ({ handleGroupClick }) => {

    const [color, setColor] = useState(''); // i want to store the color here
    const [groupName, setGroupName] = useState(''); // i want to store the group name here
    const [groups, setGroups] = useState([]); // i want to store the groups here

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);


    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#000000';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleGroupClicks = (group) => {
        // Call the function passed from App component to update selected group
        handleGroupClick(group);
      };

    const handleCreate = () => {
        // api call to create group
        ; (async () => {
            const { data } = await apiConnector(
                "POST",
                group.CREATE_GROUP,
                {
                    name: groupName,
                    color: color
                }
            )
            if (!data) {
                console.log(data);
            } else {
                console.log(data);
                setGroups([...groups, data])
                closeModal()
            }
        })();

    }

    useEffect(() => {
        ;(async () => {
            const { data } = await apiConnector(
                "GET",
                group.GET_GROUPS
            )
            if (!data) {
                console.log(data);
            } else {
                setGroups(data)
            }
        })();
    }, [])
    return (
        <>
            {/*------------MODAL---------------- */}
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className='flex'>
                        <h2 className='text-xl mb-2' ref={(_subtitle) => (subtitle = _subtitle)}>Create New Group</h2>
                    </div>
                    <div className=''>
                        <form>
                            <div className='mb-4'>
                                <label className='required text-xl'>
                                    Group Name
                                    <input className='ml-5 border border-black rounded-2xl p-2 pb-3' type="text" name="name" placeholder='enter group name' onChange={(e) => {
                                        setGroupName(e.target.value)
                                    }} />
                                </label>
                            </div>
                            <div className=''>
                                <label className='flex required text-xl'>
                                    Choose Color
                                    {/* i want color do be selectable here */}
                                    <ul className='flex gap-2 ml-7 items-center justify-center '>
                                        <li className='h-7 w-7 rounded-full bg-pink-200 hover:cursor-pointer hover:border hover:border-black' onClick={() => {
                                            setColor('fbcfe8')
                                        }}></li>
                                        <li className='h-7 w-7 rounded-full bg-red-300 hover:cursor-pointer hover:border hover:border-black' onClick={() => {
                                            setColor('fefce8')
                                        }}></li>
                                        <li className='h-7 w-7 rounded-full bg-blue-300 hover:cursor-pointer hover:border hover:border-black' onClick={() => {
                                            setColor('93c5fd')
                                        }}></li>
                                        <li className='h-7 w-7 rounded-full bg-yellow-300 hover:cursor-pointer hover:border hover:border-black' onClick={() => {
                                            setColor('fde047')
                                        }}></li>
                                        <li className='h-7 w-7 rounded-full bg-purple-400 hover:cursor-pointer hover:border hover:border-black' onClick={() => {
                                            setColor('c084fc')
                                        }}></li>
                                        <li className='h-7 w-7 rounded-full bg-cyan-300 hover:cursor-pointer hover:border hover:border-black' onClick={() => {
                                            setColor('67e8f9')
                                        }}></li>

                                    </ul>
                                </label>
                            </div>
                            <div className='flex justify-end'>
                                <button className='bg-blue-900 text-white rounded-xl p-1 pl-5 pr-5 mt-4' onClick={handleCreate}>Create</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
            <h1 className='absolute top-20 left-0 right-0 font-bold text-center text-2xl'>Pocket Notes</h1>
            <div className='overflow-y-auto h-5/6 w-full mt-36 custom-scroll'>
                {groups.map((group, index) => {
                    return (
                        <div className='flex m-3 text-center gap-6 pl-7 hover:cursor-pointer text-xl' key={index} onClick={() => handleGroupClicks(group)}>
                            <img className='h-9 w-9 rounded-full' src={`https://ui-avatars.com/api/?name=${group.name}&background=${group.color}&color-fff&rounded=true`} alt="" />
                            <h2>{group.name}</h2>
                        </div>
                    )
                })}


            </div>
            <div>
                <button className='absolute right-9 bottom-10 w-12 h-12 bg-blue-900 text-white rounded-full text-4xl flex justify-center font-bold' onClick={
                    openModal}>+</button>
            </div>
        </>
    )
}

export default sidebar