import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import getUserProfile from "@/libs/getUserProfile"
import { Select, TextField, MenuItem } from "@mui/material";
import DateReserve from "@/components/DateReserve";
import Productcard from "@/components/Card";

export default async function Booking() {

    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null 

    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt)

    return (
        <main className="bg-slate-100 m-5 p-5">
            <div className="text-2xl">Your Dashboard</div>
            <table className="table-auto border-separate border-spacing-2"><tbody>
                <tr><td>Name</td><td>{profile.data.name}</td></tr>
                <tr><td>Email</td><td>{profile.data.email}</td></tr>
                <tr><td>Tel.</td><td>{profile.data.tel}</td></tr>
                <tr><td>Member Since</td><td>{createdAt.toString()}</td></tr>
            </tbody></table>

            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-normal text-center text-gray-800 mb-6">Event Booking</h1>
                <form className="grid gap-6">
                    <div>
                        <TextField
                            label="Name-Lastname"
                            name="Name-Lastname"
                            fullWidth
                            className="mb-4 rounded-lg"
                            variant="standard"
                        />
                    </div>
                    <div>
                        <TextField
                            label="Contact-Number"
                            name="Contact-Number"
                            fullWidth
                            className="mb-4 rounded-lg"
                            variant="standard"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="venue" className="mb-2 text-gray-700">Select Venue</label>
                        <Select
                            id="venue"
                            className="border-gray-300 rounded-lg shadow-sm"
                            variant="standard"
                        >
                            <MenuItem value="Bloom">
                                The Bloom Pavilion
                            </MenuItem>
                            <MenuItem value="Spark">
                               Spark Space
                            </MenuItem>
                            <MenuItem value="GrandTable">
                                The Grand Table
                            </MenuItem>
                        </Select>
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2 text-gray-700">Event Date</label>
                        <DateReserve />
                    </div>
                    <div className="mt-6 text-center">
                        <button
                            name = "Book Venue"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Book Venue
                        </button>
                    </div>
                </form>
            </div>

        </main>
    )
}

