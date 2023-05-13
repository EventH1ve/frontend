import axios from "axios";

export default async function handler(req, res) {

    if (req.method != 'POST') {
        res.status(405).json({message: "POST method required"});
    }

    const {token, ...b} = req.body;
    
    console.log(token, b)

    const ticketRes = await axios.post(`http://127.0.0.1:8000/api/payment`, b, {
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'application/json'
        }
    });

    res.status(200).json(ticketRes.data);
}