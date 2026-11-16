
"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { AppointmentType, BarberType } from "./types/barbertypes";
import { axiosIntane } from "@/api/axiosInstace";

export default function Appointment() {
    const [isChecked, setIsChecked] = useState(false);
    const [data, setData] = useState<AppointmentType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("")

    const handleToggle = () => {
        setIsChecked((prev) => !prev);
        console.log("Toggle is now:", !isChecked);
    };


    const handleFethcBarbers = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await axiosIntane.get("/appointment");
            if (!res.data || !res.data.data) {
                throw new Error("Invalid server request");
            }
            setData(res.data.data);
            setLoading(false);
        } catch (err) {
            setError("Something went wrong")

        } finally {
            setLoading(false);
        }

    }
    console.log(data);

    useEffect(() => {
        handleFethcBarbers();

    }, [])


    if (loading) return <div className="w-full h-screen  flex items-center justify-center"><p className="text-3xl font-bold text-black">Loading...</p></div>
    if (error) return <div className="w-full h-screen flex items-center justify-center"><p className="text-3xl font-bold text-black">Something went wrong</p></div>
    return (
        <div className="overflow-x-auto p-4">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                    <tr>
                        <th className="px-6 py-3 text-left">userName</th>

                        <th className="px-6 py-3 text-center">phone </th>

                        <th className="px-6 py-3 text-center">date</th>
                        <th className="px-6 py-3 text-center">status</th>
                        <th className="px-6 py-3 text-center">paymentStatus</th>
                        <th className="px-6 py-3 text-center">Amount</th>
                        <th className="px-6 py-3 text-center">BarberShop</th>

                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {data.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-4 flex items-center space-x-3">

                                <span>{user.username}</span>
                            </td>


                            <td className="px-6 py-4 text-center">{user.phone}</td>
                            <td className="px-6 py-4 text-center">{user.date}</td>
                            <td className="px-6 py-4 text-center">{user.status}</td>
                            <td className="px-6 py-4 text-center">{user.payment?.paymentStatus ?? "PENDING"}</td>
                            <td className="px-6 py-4 text-center">{user.payment?.amount ?? "NA"}</td>
                            <td className="px-6 py-4 text-center">{user.barber?.shopName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
