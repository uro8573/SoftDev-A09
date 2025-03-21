import Productcard from "./Card"
import Link from "next/link"

export default async function VenueCatalog({venuesJson} :{venuesJson:Promise<VenueJson>}) {
    
    const venueJsonReady = await venuesJson

    return (
        <>
        Explore {venueJsonReady.count} models in our catalog
            <div style = {{margin:"20px", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around", padding:"10px" }}>
                {
                    venueJsonReady.data.map((venueItem:VenueItem) => (
                        <Link key = {venueItem.name} href = {`/venue/${venueItem.id}`} className = "w-1/5">
                            <Productcard venueName = {venueItem.name} imgSrc = {venueItem.picture}/>
                        </Link>
                        
                        
                    ))
                }
            </div>
        </>
    )
}