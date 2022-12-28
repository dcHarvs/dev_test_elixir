import { createRoot } from 'react-dom/client';
import React, { useCallback, useEffect, useState } from 'react';
import Select from 'react-select'
import CarList from './components/cars-list';

const container = document.getElementById('app');
const root = createRoot(container);

const App = () => {
    const [data, setData] = useState({});

    const getCars = useCallback(async filter => {
        try {
            const req = await fetch(`/api/cars${filter == null ? "" : `?make=${filter.value}`}`);
            const res = await req.json();
            const { data, token } = await res;
            const { cars, allMakes } = data;

            setData({ cars, allMakes, token });
        } catch (error) {
            alert(error);            
        }
    })

    useEffect(() => {
        getCars();
    }, []);

    return <div className='max-w-3xl mx-auto p-5'>
        <div className='flex justify-between items-center mb-4'>
            <h1 className='text-4xl flex-1'>Cars</h1>
            <Select 
                options={data.allMakes} 
                isClearable={true}
                placeholder="Filter by Make"
                onChange={e => {
                    setData({...data, cars: null});
                    getCars(e);
                }}
                styles={{
                    control: (baseStyle) => ({
                        ...baseStyle,
                        width: 200
                    })
                }}
            />
        </div>
        <CarList cars={data.cars} token={data.token} />
    </div>;
};

root.render(<App />);