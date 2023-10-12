import axios from "axios";

const client = axios.create({
    baseURL: 'https://flight.pequla.com/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

export class FlightService {
    public static getAllFlights(page = 0, size = 30) {
        return client.get(`/flight?page=${page}&size=${size}&sort=scheduledAt,asc`)
    }

    public static getFlightById(id: number) {
        return client.get('/flight/' + id)
    }
}