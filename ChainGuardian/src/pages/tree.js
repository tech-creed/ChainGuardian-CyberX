import React from 'react'
import OverviewFlow from '../components/App'

function tree() {
    return (
        <div>
            <div className='justify-items-stretch flex'>
                <h1 className="justify-self-start font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Node Structer
                </h1>
                <button  className='bg-indigo-600 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark'>back</button>
            </div>

            <OverviewFlow />
        </div>
    )
}

export default tree
