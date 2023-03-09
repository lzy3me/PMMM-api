const express = require('express')
const generatePayload = require('promptpay-qr')
const app = express()
const port = 3000


app.get('/qrpayment', (req, res) => {
  const { msid, amount } = req.query;

  const qrval = generatePayload(msid, { amount: parseFloat(amount) });

  res.json({ qr: qrval })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})