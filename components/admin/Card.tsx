import React, { ReactNode } from 'react';

type Props={
    title:string,
    value:string | number,
    percentage:number,
    isIncrease:boolean,
    icon:ReactNode,
    color:string,
    bgcolor:string,
}
const   Card = ({ title, value, percentage, isIncrease,icon,color,bgcolor }:Props) => {
  return (
    <div className="bg-white p-4 rounded-2xl border-2 border-gray-200 w-full md:w-80 flex justify-between items-center flex-col text-center ">
     <div className={`${bgcolor} h-10 w-10 rounded-full flex items-center justify-center mb-2 `}>
       <span className={`${color}`}>{icon}</span>
     </div>
<div>

      <h3 className="text-gray-500 text-3xl font-bold  tracking-wide ">{title}</h3>
      <div className={`${color} text-2xl font-bold `}>{value}</div>
      <div className={`flex items-center justify-center text-sm  ${isIncrease ? 'text-green-500' : 'text-red-500'}`}>
        {/* {isIncrease ? <TrendingUp className="w-4 h-4 " /> : <TrendingDown className="w-4 h-4" />} */}
        {percentage}%
      </div>
</div>
    </div>
  );
};

export default Card;
