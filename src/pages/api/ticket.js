import axios from "axios";

export default async function handler(req, res) {

    if (req.method != 'POST') {
        res.status(405).json({message: "POST method required"});
    }

    const {token, ...b} = req.body;
    b.tickets = JSON.parse(b.tickets);
    
    const ticketRes = await axios.post(`http://backend:8000/api/payment`, b, {
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'application/json'
        }
    });

    res.status(200).json(ticketRes.data);
}