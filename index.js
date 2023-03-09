const express = require('express')
const generatePayload = require('promptpay-qr')
const helmet = require('helmet')
const compression = require('compression')
const app = express()
const port = 3000

app.use(compression())
app.use(helmet())

app.get('/qrpayment', (req, res) => {
  const { msid, amount } = req.query;

  const qrval = generatePayload(msid, { amount: parseFloat(amount) });

  res.json({ qr: qrval })
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})