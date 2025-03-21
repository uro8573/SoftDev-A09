'use client'
import { useReducer, useRef, useEffect } from 'react'
import Productcard from '@/components/Card'
import Link from 'next/link'

export default function CardPanel() {

    const cardReducer = (ratingList:Map<string, number>, action:{type:string, venueName: string, rating?: number}) => {
        switch(action.type) {
            case 'set': {
                const newState = new Map(ratingList);
                newState.set(action.venueName, action.rating || 0);
                return newState;
            }
            case 'remove': {
                const newState = new Map(ratingList);
                newState.delete(action.venueName);
                return newState;
            }
            default: return ratingList;
        }
    }

    const [ratingList, dispatchRating] = useReducer(cardReducer, new Map<string, number>([
        ["The Bloom Pavilion", 0],
        ["Spark Space", 0],
        ["The Grand Table", 0]
    ]));

    const mockCardRepo = [
        {vid: "001", name:'The Bloom Pavilion', image:'/img/bloom.jpg' },
        {vid: "002", name:'Spark Space', image:'/img/sparkspace.jpg' },
        {vid: "003", name:'The Grand Table', image:'/img/grandtable.jpg' },
        
    ]

    // const [carResponse, setCarResponse] = useState(null)

    // useEffect( () => {
    //     const fetchData = async () => {
    //         const cars = await getCars() 
    //         setCarResponse(cars)
    //     }
    //     fetchData()
    // }, [])


    return (
        <div>
            <div style={{display: "flex", justifyContent: "center", gap: "3%", marginTop: "20px"}}>
                {
                    mockCardRepo.map((cardItem) => (
                        <Link key={cardItem.vid} href={`/venue/${cardItem.vid}`} className='w-1/5'>
                            <Productcard 
                                venueName={cardItem.name} 
                                imgSrc={cardItem.image}
                                dispatch={(venue: string, newRating: number) => {
                                    dispatchRating({ type: "set", venueName: venue, rating: newRating });
                                }}
                                rating={ratingList.get(cardItem.name)}
                            />
                        </Link>
                    ))
                    
                }

                {/* <Productcard venueName='The Bloom Pavilion' imgSrc='/img/bloom.jpg' 
                dispatch={(venue: string, newRating: number) => {dispatchRating({type: "set", venueName: venue, rating: newRating})}}
                rating={ratingList.get('The Bloom Pavilion')}/>
                <Productcard venueName='Spark Space' imgSrc='/img/sparkspace.jpg' 
                dispatch={(venue: string, newRating: number) => {dispatchRating({type: "set", venueName: venue, rating: newRating})}} 
                rating={ratingList.get('Spark Space')}/>
                <Productcard venueName='The Grand Table' imgSrc='/img/grandtable.jpg' 
                dispatch={(venue: string, newRating: number) => {dispatchRating({type: "set", venueName: venue, rating: newRating})}}
                rating={ratingList.get('The Grand Table')}/> */}
            </div>
            <div className="w-full text-2xl font-bold ml-[20px] mt-[3%]">
                Venue List with Ratings : { ratingList.size }
            </div>
            {
                Array.from(ratingList).map((venue) => 
                    <div data-testid={venue[0]} key={venue[0]} className="w-full text-xl font-medium ml-[20px] mt-[5px]"
                    onClick={() => dispatchRating({type:'remove', venueName: venue[0]})}>
                        {venue[0]} : {venue[1]}
                    </div>
                )
            }
        </div>
    )
}