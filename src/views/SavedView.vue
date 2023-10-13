<template>
    <div class="home">
        <h3>Saved flights</h3>
        <div v-if="flights">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">FLIGHT NUMBER</th>
                        <th scope="col">DESTINATION</th>
                        <th scope="col">AIRPLANE MODEL</th>
                        <th scope="col">SCHEDULED AT</th>
                        <th scope="col">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="flight in flights">
                        <th scope="row">{{ flight.id }}</th>
                        <td>{{ flight.flightNumber }}</td>
                        <td>{{ flight.destination }}</td>
                        <td>{{ flight.plane }}</td>
                        <td>{{ new Date(flight.scheduledAt).toLocaleString('sr-RS') }}</td>
                        <td>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-outline-primary btn-sm"
                                    @click="(e) => showDetails(flight.id)">
                                    <i class="fa-solid fa-circle-info"></i>
                                </button>
                                <button type="button" class="btn btn-outline-danger btn-sm"
                                    @click="(e) => deleteFlight(flight.id)">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <LoadingWidget v-else />
    </div>
</template>

<script lang="ts" setup>
import LoadingWidget from '@/components/LoadingWidget.vue';
import { FlightModel } from '@/models/flight.model';
import { BackendService } from '@/services/backend.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const flights = ref<any>()
BackendService.getSavedFlights()
    .then(rsp => {
        if (rsp.status === 200) {
            flights.value = rsp.data
            return
        }

        alert("Session expired")
        localStorage.clear()
        window.location.href = '/login'

    })
    .catch(e => {
        alert(e.message)
        localStorage.clear()
        window.location.href = '/login'
    })

const router = useRouter();
function showDetails(id: number) {
    router.push('/flight/' + id)
}

function deleteFlight(id: number) {
    BackendService.deleteSavedFlight(id)
        .then(rsp => {
            if (rsp.status === 200) {
                flights.value = flights.value.filter((fl: FlightModel) => fl.id !== id)
                return
            }
            console.log(rsp.data)
            alert('Someting went wrong')
        })
        .catch(e => console.log(e))
}
</script>