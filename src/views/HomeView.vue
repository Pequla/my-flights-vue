<template>
  <div class="home">
    <h3>Homepage</h3>
    <div v-if="flights">
      <nav>
        <ul class="pagination">
          <li class="page-item">
            <button class="page-link" type="button" @click="(e) => loadFirst()">First</button>
          </li>
          <li class="page-item">
            <button class="page-link" type="button" @click="(e) => loadPrev()">Prev</button>
          </li>
          <li class="page-item" aria-current="page">
            <a class="page-link" href="#">{{ flights.number + 1 }}</a>
          </li>
          <li class="page-item">
            <button class="page-link" type="button" @click="(e) => loadNext()">Next</button>
          </li>
          <li class="page-item">
            <button class="page-link" type="button" @click="(e) => loadLast()">Last</button>
          </li>
        </ul>
      </nav>
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
          <tr v-for="flight in flights.content">
            <th scope="row">{{ flight.id }}</th>
            <td>{{ flight.flightNumber }}</td>
            <td>{{ flight.destination }}</td>
            <td>{{ flight.plane }}</td>
            <td>{{ new Date(flight.scheduledAt).toLocaleString('sr-RS') }}</td>
            <td>
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-outline-primary btn-sm" @click="(e) => showDetails(flight.id)"><i
                    class="fa-solid fa-circle-info"></i></button>
                  <button type="button" class="btn btn-outline-success btn-sm" v-if="user && !isSaved(flight)"
                  @click="(e) => saveFlight(flight)">
                  <i class="fa-solid fa-floppy-disk"></i>
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm" v-if="user && isSaved(flight)"
                  @click="(e) => saveFlight(flight)">
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

<script setup lang="ts">
import LoadingWidget from '@/components/LoadingWidget.vue';
import { FlightModel } from '@/models/flight.model';
import { BackendService } from '@/services/backend.service';
import { FlightService } from '@/services/flight.service'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const flights = ref<any>();
const user = ref<any>()
const savedFlights = ref<FlightModel[]>()

BackendService.getSelf()
  .then(rsp => {
    user.value = rsp.data
    BackendService.getSavedFlights()
      .then(rsp => savedFlights.value = rsp.data)
      .catch(e => console.log(e))
  })
  .catch(e => console.log(e))

function loadData(page = 0) {
  FlightService.getAllFlights(page, 12)
    .then(rsp => {
      flights.value = rsp.data
    })
}

loadData()

function loadFirst() {
  if (flights.value.first) return
  loadData()
}

function loadPrev() {
  if (flights.value.first) return
  loadData(flights.value.number - 1)
}

function loadNext() {
  if (flights.value.last) return;
  loadData(flights.value.number + 1)
}

function loadLast() {
  if (flights.value.last) return;
  loadData(flights.value.totalPages - 1)
}

const router = useRouter();
function showDetails(id: number) {
  router.push('/flight/' + id)
}

function isSaved(flight: FlightModel) {
  if (savedFlights.value) {
    for (const flt in savedFlights.value) {
      const fltAny = flt as any
      if (fltAny.id === flight.id) return true
    }
    const flitered = savedFlights.value.filter((fl: FlightModel) => fl.id === flight.id)
    return flitered.length > 0
  }
  return false
}

function saveFlight(flight: FlightModel) {
  console.log(flight)
  BackendService.saveFlight(flight.id)
    .then(rsp => {
      if (rsp.status === 200) {
        alert("Successfuly saved flight")
        router.push('/saved')
        return
      }

      alert("Something went wrong...")
      localStorage.clear()
      router.push('/login')
    })
    .catch(e => {
      alert(e.message)
      localStorage.clear()
      router.push('/login')
    })
} 
</script>
