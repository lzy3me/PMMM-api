const express = require('express')
const generatePayload = require('promptpay-qr')
const helmet = require('helmet')
const compression = require('compression')
const app = express()
const port = 3000

app.use(compression())
app.use(helmet())

app.get('/m5pmmm/qrpayment', (req, res) => {
  try {
    const { msid, amount } = req.query;

    if (!msid) throw { code: 500, message: "msid can't be empty" }

    if (msid.length < 10 || msid.length > 10) throw { code: 500, message: "msid can't be more or less than 10 digit" }

    const qrval = generatePayload(msid, { amount: parseFloat(amount) });

    res.status(200).json({ code: 200, message: "success", qr: qrval })
  } catch (error) {
    res.status(500).json(error);
  }
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})