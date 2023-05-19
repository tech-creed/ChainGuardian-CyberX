const  axios = require('axios')
var WAValidator = require('multicoin-address-validator');
const fs = require('fs')

const accGraph = async (req, res) => {
    const chain = req.params.chain
    const address = req.params.address

    if (!chain || !address) {
        return res.status(400).json({ error: 'Missing parameters' })
    }
    if (fs.existsSync('./controllers/data/'+address+'.json')) {
        finalData = JSON.parse(fs.readFileSync('./controllers/data/'+address+'.json').toString())
        var x = 0
                            var y = 50
                            var nodes = [
                                {
                                    id: 'walletId',
                                    type: 'input',
                                    data: { label: address },
                                    position: { x: x, y: y },
                                    style: { width: 280, height: 120 },
                                }
                            ]
                            transKeys = Object.keys(finalData['detailTransactions'])
                            y += 100
                            x -+ 2200
                            for (let h = 0; h < 5; h++) {
                                var element = finalData['detailTransactions'][h];
                                nodes.push({
                                    id: transKeys[h],
                                    type: 'custom',
                                    data: {hash:transKeys[h], 
                                        blockID:finalData['detailTransactions'][transKeys[h]]['block_id'],
                                        blockID:finalData['detailTransactions'][transKeys[h]]['time'],
                                        blockID:finalData['detailTransactions'][transKeys[h]]['usd'],
                                        blockID:finalData['detailTransactions'][transKeys[h]]['transferred'],
                                        type: 'Transaction', emoji: '💸'},
                                    position: {x: x, y: y}
                                })
                                x += 500
                            }
                            var edges = [
                                
                              ];

                            //   {
                                //   id: 'e1-2',
                                //   source: '1',
                                //   target: '2',
                                //   animated:true
                                // },
                                // {
                                //   id: 'e1-3',
                                //   source: '1',
                                //   target: '3',
                                // },
                                // {
                                //   id: 'e1-3',
                                //   source: '1',
                                //   target: '4',
                                // },
                            res.json({'nodes':nodes,'edges':edges})
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
                            var x = 0
                            var y = 50
                            var nodes = [
                                {
                                    id: 'walletId',
                                    type: 'input',
                                    data: { label: address },
                                    position: { x: x, y: y },
                                    style: { width: 280, height: 60 },
                                }
                            ]
                            transKeys = Object.keys(finalData['detailTransactions'])
                            y += 100
                            x -+ 4000
                            for (let h = 0; h < 5; h++) {
                                var element = finalData['detailTransactions'][h];
                                nodes.push({
                                    id: transKeys[h],
                                    type: 'custom',
                                    data: {hash:transKeys[h], 
                                        blockID:finalData['detailTransactions'][transKeys[h]]['block_id'],
                                        blockID:finalData['detailTransactions'][transKeys[h]]['time'],
                                        blockID:finalData['detailTransactions'][transKeys[h]]['usd'],
                                        blockID:finalData['detailTransactions'][transKeys[h]]['transferred'],
                                        type: 'Transaction', emoji: '💸'},
                                    position: {x: x, y: y}
                                })
                                x += 500
                            }
                            var edges = [
                                
                              ];

                            //   {
                                //   id: 'e1-2',
                                //   source: '1',
                                //   target: '2',
                                //   animated:true
                                // },
                                // {
                                //   id: 'e1-3',
                                //   source: '1',
                                //   target: '3',
                                // },
                                // {
                                //   id: 'e1-3',
                                //   source: '1',
                                //   target: '4',
                                // },
                            res.json({'nodes':nodes,'edges':edges})
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

module.exports = { accGraph }