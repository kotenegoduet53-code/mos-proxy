export default async function handler(req, res) {

  const { eventId } = req.query

  if(!eventId){
    return res.status(400).json({ error: "no eventId" })
  }

  const today = new Date().toISOString().split("T")[0]

  const url =
`https://tickets.mos.ru/api/widget/v2/event/${eventId}/performances?date_from=${today}&date_to=&performances_limit_by_days=6&agent_id=museum255`

  try{

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
        "Referer": "https://tickets.mos.ru/"
      }
    })

    const text = await response.text()

    if(text.startsWith("<")){
      return res.status(500).json({ error: "HTML instead of JSON" })
    }

    return res.status(200).send(text)

  }catch(e){
    return res.status(500).json({ error: "fetch failed" })
  }
}
