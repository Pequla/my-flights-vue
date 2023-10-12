import axios, { AxiosError, AxiosResponse } from "axios"

const client = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    validateStatus: function (status) {
        return status === 200 || status === 204
    }
})

export class BackendService {

    public static login(email: string, password: string) {
        return this.useAxios('/user/login', 'POST', {
            email: email,
            password: password
        })
    }

    public static register(email: string, password: string) {
        localStorage.clear()
        return this.useAxios('/user/register', 'POST', {
            email: email,
            password: password
        })
    }

    public static getSelf() {
        return this.useAxios('/user/self')
    }

    public static async getSavedFlights() {
        return await this.useAxios('/flight')
    }

    public static async saveFlight(id: number) {
        return await this.useAxios('/flight/' + id, 'POST')
    }

    public static async deleteSavedFlight(id: number) {
        return await this.useAxios('/flight/' + id, 'DELETE')
    }

    private static async useAxios(url: string, method: string = 'GET', body: object = {}) {
        // Attempting to retrieve data
        let rsp: AxiosResponse;

        try {
            rsp = await client.request({
                url: url,
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                },
                data: body
            }) as AxiosResponse;
        } catch (e) {
            rsp = (e as AxiosError).response as AxiosResponse
        }

        if (rsp.status == 403) {
            // Refresh token
            try {
                const tokenReq = await client.request({
                    url: '/user/refresh',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('refresh')}`
                    },
                    data: body
                })


                // Save token in local storage
                localStorage.setItem('access', tokenReq.data.access)

                // Repeating the primary request
                return await client.request({
                    url: url,
                    method: method,
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access')}`
                    },
                    data: body
                });
            } catch (e) {
                console.log(e)
                localStorage.clear()
                // window.location.href='/'
                throw new Error('Failed to refresh the token')
            }
        }

        if (rsp.status == 404) {
            throw new Error('404 Not found')
        }

        // Return response
        return rsp;
    }
}