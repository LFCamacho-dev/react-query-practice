import React from 'react';
import { usePaginatedQuery } from 'react-query'
import { Planet } from './Planet';
import { useState } from 'react';

const fetchPlanets = async (key,  page) => {
    const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`)
    return res.json()
}

const Planets = () => {

    const [page, setPage ]= useState(1)

    const { resolvedData, latestData, status } = usePaginatedQuery(['planets', page], fetchPlanets)
    // console.log(data);
    return (
        <div>
        <h2>Planets</h2>
        {/* <p>{ status }</p> */}

        {/* <button onClick={() => setPage(page + 1)}>Next Page</button> */}


        { status === 'loading' && (
            <div className="">Loading data...</div>
        )} 
        { status === 'error' && (
            <div className="">Error fetching data</div>
        )}
        { status === 'success' && (
            <>
            <button 
                onClick={() => setPage(old => Math.max(old - 1, 1))}
                disabled={page === 1}
            >Previous Page
            </button>
            <span>{page}</span>
            <button
                onClick={() => setPage(old => (!latestData || !latestData.next ? old : old + 1))}
                disabled={!latestData || !latestData.next}
            >Next Page
            </button>
                <div>
                    {resolvedData.results.map(planet => (                    
                        <Planet key={planet.name} planet={planet}/>                    
                    ))}

                </div>
            </>
        )}


        </div>
    );
}
 
export default Planets;