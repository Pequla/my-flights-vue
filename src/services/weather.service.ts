import axios from "axios";

const client = axios.create({
    baseURL: 'https://api.pequla.com',
    headers: {
        'Content-Type': 'application/json'
    }
})

export class WeatherService {
    public static geocode(dest: string) {
        return client.get('/here/geocode?q=' + dest.toLowerCase().split(' ')[0])
    }

    public static getWeatherData(pos: any) {
        return client.get('/weather?lat=' + pos.lat + '&lon=' + pos.lng)
    }
}