const request = require("request")
module.exports = new Promise((resolve, reject) => {
  request(
    "https://opendata.cwb.gov.tw/api/v1/rest/datastore/C-B0074-002?Authorization=rdec-key-123-45678-011121314",
    (error, response, body) => {
      if (error) return reject(error)
      resolve(
        JSON.parse(body).records.data.stationStatus.station.filter((item) => {
          return item.status === "現存測站"
        })
      )
    }
  )
})
