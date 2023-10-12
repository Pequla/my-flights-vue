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
          <FlightTableRow v-for="flight in flights.content" :flight="flight" />
        </tbody>
      </table>
    </div>
    <LoadingWidget v-else />
  </div>
</template>

<script setup lang="ts">
import FlightTableRow from '@/components/FlightTableRow.vue';
import LoadingWidget from '@/components/LoadingWidget.vue';
import { FlightService } from '@/services/flight.service'
import { ref } from 'vue';

const flights = ref<any>();

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

</script>
