import React from 'react';
import { useQuery } from 'react-query'
import { Person } from './Person';
import { useState } from 'react';

const fetchPeople = async (key, greeting, page) => {
    console.log(greeting);
    const res = await fetch(`https://swapi.dev/api/people/?page=${page}`)
    return res.json()
}

const People = () => {

    const [page, setPage ]= useState(1)

    const { data, status } = useQuery(['people', 'hello, ninjas', page], fetchPeople, {
        staleTime: 2000
    })
    // console.log(data);
    return (
        <div>
        <h2>People</h2>
        {/* <p>{ status }</p> */}


        { status === 'loading' && (
            <div className="">Loading data...</div>
        )} 
        { status === 'error' && (
            <div className="">Error fetching data</div>
        )}
        { status === 'success' && (
            <div className="">
                {data.results.map(person => (
                    
                    <Person key={person.name} person={person}/>
                    
                ))}

            </div>
        )}


        </div>
    );
}
 
export default People;