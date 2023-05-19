const  axios = require('axios')
var WAValidator = require('multicoin-address-validator');
const fs = require('fs')

const tnxDetails = async (req, res) => {
  const chain = req.params.chain
  const txnId = req.params.txn_id

  if (!chain || !txnId) {
    return res.status(400).json({ error: 'Missing parameters' })
  }

  const apiUrl = `https://api.blockchair.com/${chain}/dashboards/transaction/${txnId}?key=${process.env.APIKEY}`

  axios.get(apiUrl)
    .then(response =>{
      const data = response.data
      console.log(data)
      res.json(data)
    })
    .catch(error => {
      res.status(404).json({ error: error.message })
    })
}

const accDetails = async (req, res) => {
  const chain = req.params.chain
  const address = req.params.address

  if (!chain || !address) {
    return res.status(400).json({ error: 'Missing parameters' })
  }
  if (fs.existsSync('./controllers/data/'+address+'.json')) {
      finalData = JSON.parse(fs.readFileSync('./controller/data/'+address+'.json').toString())
      res.json(finalData)
  }else{
    const apiUrl = `https://api.blockchair.com/${chain}/dashboards/address/${address}?key=${process.env.APIKEY}`
    console.log(apiUrl)
    finalData = {}
    axios.get(apiUrl)
      .then(async(response) =>{
        const data = response.data
        //console.log(data)
        finalData['address'] = address
        finalData['detectedChain'] = chain
        finalData['balanceUSD'] = data.data[address]["address"]['balance_usd']
        finalData['balanceETH'] = data.data[address]["address"]['balance'] / 1000000000000000000
        finalData['sendUSD'] = data.data[address]["address"]['spent_usd']
        finalData['feesUSD'] = data.data[address]["address"]['fees_usd']
        finalData['receivedUSD'] = data.data[address]["address"]['received_usd']
        finalData['firstReceived'] = data.data[address]["address"]['first_seen_receiving']
        finalData['transactionCount'] = data.data[address]["address"]['transaction_count']
        finalData['lastReceived'] = data.data[address]["address"]['first_seen_spending']
        finalData['firstSend'] = data.data[address]["address"]['first_seen_spending']
        finalData['lastSend'] = data.data[address]["address"]['last_seen_spending']
  
        if(chain != 'bitcoin'){
          finalData['detailTransactions'] = {}
          finalData['transactions'] = []
            for (let i = 0; i < data.data[address]["calls"].length; i++) {
              finalData['detailTransactions'][i] = {}
              finalData['transactions'].push(data.data[address]["calls"][i].transaction_hash)
              finalData['detailTransactions'][i]['sender'] = data.data[address]["calls"][i].sender
              finalData['detailTransactions'][i]['receiver'] = data.data[address]["calls"][i].recipient
              finalData['detailTransactions'][i]['time'] = data.data[address]["calls"][i].time
              finalData['detailTransactions'][i]['usd'] = data.data[address]["calls"][i].value_usd
              finalData['detailTransactions'][i]['transferred'] = data.data[address]["calls"][i].transferred
              finalData['detailTransactions'][i]['block_id'] = data.data[address]["calls"][i].block_id
            }
        }else{
          finalData['transactions'] = data.data[address]["transactions"]
          finalData['detailTransactions'] = {}
  
          for (let index = 0; index < finalData['transactions'].length; index++) {
            var element = finalData['transactions'][index];
            tempUrl = `https://api.blockchair.com/${chain}/dashboards/transaction/${element}?key=${process.env.APIKEY}`
            await axios.get(tempUrl)
              .then(response =>{
                var tmpData = response.data
                finalData['detailTransactions'][element] = {}
                finalData['detailTransactions'][element]['block_id'] = tmpData.data[element]['transaction'].block_id
                finalData['detailTransactions'][element]['sender'] = tmpData.data[element]['transaction'].id
                finalData['detailTransactions'][element]['receiver'] = tmpData.data[element]['transaction'].date
                finalData['detailTransactions'][element]['time'] =tmpData.data[element]['transaction'].time
                finalData['detailTransactions'][element]['usd'] = tmpData.data[element]['transaction'].usd
                finalData['detailTransactions'][element]['transferred'] = true
                
                //console.log(index, finalData['transactions'].length)
                if(index+1 == finalData['transactions'].length){
                  //console.log(finalData)
                  const jsonString = JSON.stringify(finalData)
                  fs.writeFile('./controllers/data/'+address+'.json', jsonString, err => {
                    if (err) {
                        console.log('Error writing file', err)
                    } else {
                        console.log('Successfully wrote file')
                        res.json(finalData)
                    }
                })
                }
              })
              .catch(error => {
                console.log(index, error)
                //res.status(404).json({ error: error.message })
              })
          }
        }
      })
      .catch(error => {
        res.status(404).json({ error: error.message })
      })
  }
}
  
const accValidator = async (req, res) => {
  const address = req.params.address

  if (!address) {
    return res.status(400).json({ error: 'Missing parameters' })
  }
  blockChains = ['0x','Aave Coin','Algorand','Bitcoin','Chainlink','CUSD','Dash','DogeCoin','Ethereum','LiteCoin','Matic','Neo','Polymath','Ripple','Solana','Stellar','Tether','TrueUSD','Uniswap Coin','ZenCash']
  chainVerified = null
  blockKeyword = {'Bitcoin':'bitcoin','DogeCoin':'dogecoin','Ethereum':'ethereum','Ripple':'ripple','Stellar':'stellar','Dash':'dash','LiteCoin':'litecoin','Cardano':'cardano'}

  for (let j = 0; j < blockChains.length; j++) {
    var valid = WAValidator.validate(address, blockChains[j]);
    if(valid){
      chainVerified = blockKeyword[blockChains[j]]
      break;
    }
    else{
      continue 
    }
  }
  finalBlockchain = {'chain':chainVerified}
  res.json(finalBlockchain)    
}


module.exports = { tnxDetails, accDetails, accValidator}