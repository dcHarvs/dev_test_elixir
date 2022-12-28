import React, { useRef } from 'react';
import CarInfo from './car-info';

const CarList = ({ cars, token }) => {
    const carInfoRef = useRef();

    const getCar = async (e, id) => {
        e.preventDefault();

        try {
            const req = await fetch(`/api/cars/${id}?token=${token}`);
            const res = await req.json()
            const data = await res;

            carInfoRef.current.openModal(data);
        } catch (error) {
            alert(error)
        }
    };

    return cars == null ? <p>Loading...</p> : 
        cars.length == 0 ? <p>No car found.</p> : <>
            <ul>
                {cars.map((car, index) => {
                    return <li 
                        key={index}
                        className='text-xl border-1 border-solid border-gray-200 rounded-lg p-4 mb-2'
                    >
                        {car.year} {car.make} {car.model}
                        <p 
                            className='underline text-blue-400 text-sm cursor-pointer' 
                            onClick={e => getCar(e, car.id)}>See more</p>
                    </li>;
                })}
            </ul>
            <CarInfo ref={carInfoRef} />
        </>;
}

export default CarList;