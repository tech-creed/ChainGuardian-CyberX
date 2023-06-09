import React, { useEffect, useState } from 'react'

import './transaction.css'

import { useSearchParams } from 'react-router-dom'

import useTransaction  from '../../hooks/useTransaction'
import TransactionSection from '../../components/transactionSec'
import Navbar from '../../components/navbar'
import Find from '../../components/Find'
import Table from '../../components/Table'

function Transaction() {
  const { error, isPending, data, getTransaction } = useTransaction()
  const [Id , setTxnId] = useState(null)
  const [queryString] = useSearchParams()
  const chain = queryString.get('chain')
  const txn_id = queryString.get('txn_id')
  // const [queryData,setQueryData] = useState(null)
  useEffect(()=>{
    if(chain && txn_id){
      getTransaction(chain,txn_id)
      localStorage.setItem('chain_on_txn',chain)
      setTxnId(txn_id)
    }
  },[chain,txn_id])

  const handleSubmit = (chain,txnId) => {
    getTransaction(chain,txnId)
    setTxnId(txnId)
    console.log(data)
  }
  return (
    <>
      <Navbar/>
      <Find handleSubmit={handleSubmit}/>
      {data && <TransactionSection data={data} txnId={Id}/>}
      {data && <Table data={data}/>}
    </>
  )
}

export default Transaction
