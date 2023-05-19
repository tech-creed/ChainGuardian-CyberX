import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

import './graphNode.css'
import { Link } from 'react-router-dom';

function CustomNode({ data }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex graphNode">
        
      { //Check if message failed
        (data.usd <= 50000)
          ? <div className="ml-2">
          <div className="hash-txt text-sm font-bold"><Link to={`/detail/`+data.hash}>{data.hash}</Link></div>
          <div className="text-sm font-bold">Block ID : {data.block_id}</div>
          <div className="text-sm font-bold">{data.time}</div>
          <div className="text-sm font-bold">USD : {data.usd}</div>
          <div className="text-gray-500">{data.emoji} | {data.type}</div>
        </div>
          : <div className="ml-2 annonomys">
          <div className="hash-txt text-sm font-bold"><Link to={`/detail/`+data.hash}>{data.hash}</Link></div>
          <div className="text-sm font-bold">Block ID :{data.block_id}</div>
          <div className="text-sm font-bold">{data.time}</div>
          <div className="text-sm font-bold">USD : {data.usd}</div>
          <div className="text-gray-500">{data.emoji} | {data.type}</div>
        </div>
      }
        
      </div>

      <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" />
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" />
    </div>
  );
}

export default memo(CustomNode);