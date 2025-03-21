import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from '@mui/material';

export default function Productcard({venueName, imgSrc, dispatch, rating}:{venueName:string, imgSrc:string, dispatch?: Function, rating?: number}) {

    return (
        <InteractiveCard contentName={venueName} >
            <div className={`w-full h-[70%] relative rounded-t-lg`}>
                <Image src={imgSrc}
                alt={venueName}
                fill={true}
                style={{objectFit: 'cover'}}
                className='object-cover rounded-t-lg'
                />
            </div>
            <div className={`w-full h-[15%] p-[10px] text-black`}>
                {venueName}
            </div>
            {/* <Rating
                className={`p-[10px]`}
                name={`${venueName} Rating`}
                id={`${venueName} Rating`}
                data-testid={`${venueName} Rating`}
                value={rating || 0}
                onClick={ (e) => { e.stopPropagation(); }}
                onChange={(event, newValue) => {
                    event.stopPropagation();
                    dispatch(venueName, newValue);
                }}
            /> */}
        </InteractiveCard>
    )
}