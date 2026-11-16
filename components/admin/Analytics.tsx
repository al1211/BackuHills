

import { IconAlertTriangle, IconClockFilled, IconCoinRupeeFilled, IconContainerOff, IconFileCheckFilled, IconFileDollarFilled, IconMessageCircle, IconStarFilled, IconUserFilled, IconUsers } from '@tabler/icons-react';
import Card from './Card';




const data = [
  {
    title: "Users",
    value: "12.4K",
    percentage: 5.2,
    isIncrease: true,
    icon: <IconUserFilled />,
    bgcolor: "bg-pink-200",
    color: "text-pink-500",
  },
  {
    title: "Online Users",
    value: "1.2K",
    percentage: -2.1,
    isIncrease: false,
    icon: <IconFileCheckFilled />,
    bgcolor: "bg-green-200",
    color: "text-green-500",
  },
  {
    title: "Total Income",
    value: "₹34.6K",
    percentage: 3.8,
    isIncrease: true,
    icon: <IconCoinRupeeFilled />,
    bgcolor: "bg-green-200",
    color: "text-green-600",
  },
  {
    title: "Coins Purchased",
    value: 42950,
    percentage: 7.6,
    isIncrease: true,
    icon: <IconFileDollarFilled />,
    bgcolor: "bg-yellow-200",
    color: "text-yellow-600",
    description: "Coins purchased in last 7 days",
  },
  {
    title: "New Registrations",
    value: 1243,
    percentage: 8.9,
    isIncrease: true,
    icon: <IconUsers />,
    bgcolor: "bg-indigo-200",
    color: "text-indigo-600",
    description: "New accounts created this week",
  },
  {
    title: "Chats Started",
    value: "23.1K",
    percentage: 6.4,
    isIncrease: true,
    icon: <IconMessageCircle />,
    bgcolor: "bg-blue-200",
    color: "text-blue-500",
  },

  {
    title: "VIP Users",
    value: "762",
    percentage: 2.9,
    isIncrease: true,
    icon: <IconStarFilled />,
    bgcolor: "bg-purple-200",
    color: "text-purple-500",
  },

  {
    title: "Reports",
    value: "83",
    percentage: -1.4,
    isIncrease: false,
    icon: <IconAlertTriangle />,
    bgcolor: "bg-red-200",
    color: "text-red-600",
  },
  {
    title: "Blocked",
    value: "27",
    percentage: 1.1,
    isIncrease: true,
    icon: <IconContainerOff />,
    bgcolor: "bg-gray-200",
    color: "text-gray-600",
  },
  {
    title: "Avg. Session",
    value: "7m 34s",
    percentage: 4.5,
    isIncrease: true,
    icon: <IconClockFilled />,
    bgcolor: "bg-yellow-100",
    color: "text-yellow-600",
  },
];


const Analytics = () => {


  return (
    <div className="flex h-screen">


      <main className="flex-1 p-4 overflow-y-scroll">
        <div className="flex flex-wrap gap-4 md:gap-10 items-center justify-start">
          {data?.map((card, idx) => (
            <Card key={idx} {...card} />
          ))}
        </div>
      </main>


    </div>
  )
}

export default Analytics