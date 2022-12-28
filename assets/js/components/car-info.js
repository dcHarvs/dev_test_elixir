import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import Modal from 'react-modal';
import { formatToDollar } from '../utls';

Modal.setAppElement('#app');

export default forwardRef(function CarInfo(_props, ref) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const data = useRef(null);

    function openModal(newData) {
        data.current = newData;
        setIsOpen(true);
    }

    function closeModal() {
        data.current = {};
        setIsOpen(false);
    }

    useImperativeHandle(ref, () => ({ openModal, closeModal }));

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={{
                content: {
                    height: 270,
                    width: 520,
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                }
            }}
        >
            {data.current == null ? <p>No data to show.</p> : <>
                <div className='flex justify-between items-center'>
                    <h3 className="text-xl text-gray-900">
                        Car Information
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={() => closeModal()}>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className='flex mt-4'>
                    <div className='p-2 border-1 borer-gray-200 rounded-lg'>
                        <img className='w-40' src={data.current.image} alt={`${data.current.year} ${data.current.make} ${data.current.model}`} />
                    </div>
                    <div className='flex flex-col px-4 py-2'>
                        <p className='text-lg font-semibold'>{data.current.make} {data.current.model}</p>
                        <p>Year: {data.current.year}</p>
                        <p>MPG: {data.current.mpg}</p>
                        <p>Number of seats: {data.current.seats}</p>
                        <p>Price: {formatToDollar(data.current.price)}</p>
                    </div>
                </div>
            </>}
        </Modal>
    );
});