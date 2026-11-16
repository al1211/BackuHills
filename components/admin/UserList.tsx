
"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { BarberType } from "./types/barbertypes";
import { axiosIntane } from "@/api/axiosInstace";



export default function UserList() {
  const [isChecked, setIsChecked] = useState(false);
  const [data, setData] = useState<BarberType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
    console.log("Toggle is now:", !isChecked);
  };


  const handleFethcBarbers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axiosIntane.get("/barber");
      if (!res.data || !res.data.data) {
        throw new Error("Invalid request from server")

      }
      setData(res.data.data);
      setLoading(false);

    } catch (err) {
      setError("Some thing went wrong");
    } finally {
      setLoading(false);
    }

  }
  useEffect(() => {
    handleFethcBarbers();


  }, []);
  console.log(data);

  if (loading) return <div className="w-full h-screen flex items-center justify-center"><p className="text-3xl text-black font-bold">Loading...</p></div>
  if (error) return <div className="w-full h-screen flex items-center justify-center"><p className="text-3xl font-bold text-black">{error}</p></div>
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="px-6 py-3 text-left">ShopName</th>

            <th className="px-6 py-3 text-center">Active </th>

            <th className="px-6 py-3 text-center">Location</th>
            <th className="px-6 py-3 text-center">bio</th>

            <th className="px-6 py-3 text-center">Price</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {data.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 flex items-center space-x-3">

                <span>{user.shopName}</span>
              </td>

              <td className="px-6 py-4 text-center">
                <label className="relative w-14 h-8 inline-flex items-center bg-[#d4d9de] shadow-inner rounded-full cursor-pointer transition-all duration-300">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="absolute top-1 left-1 w-6 h-6 bg-[#e0e5ec] rounded-full peer-checked:translate-x-6 transition-all duration-300 shadow-[4px_4px_8px_#bebebe,_-4px_-4px_8px_#ffffff]"></div>
                </label>
              </td>
              <td className="px-6 py-4 text-center">{user.location}</td>
              <td className="px-6 py-4 text-center">{user.bio}</td>
              <td className="px-6 py-4 text-center">{user.price}&#8377;</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
