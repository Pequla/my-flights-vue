<template>
    <tr v-if="flight">
        <th scope="row">{{ flight.id }}</th>
        <td>{{ flight.flightNumber }}</td>
        <td>{{ flight.destination }}</td>
        <td>{{ flight.plane }}</td>
        <td>{{ new Date(flight.scheduledAt).toLocaleString('sr-RS') }}</td>
        <td>
            <div class="btn-group" role="group">
                <button type="button" class="btn btn-outline-primary btn-sm" @click="(e) => showDetails(flight.id)"><i
                        class="fa-solid fa-circle-info"></i></button>
                <button type="button" class="btn btn-outline-success btn-sm" v-if="user">
                    <i class="fa-solid fa-floppy-disk"></i>
                </button>
            </div>
        </td>
    </tr>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    flight: Object,
    user: Object
});
const { flight, user } = toRefs<any>(props);

const router = useRouter();
function showDetails(id: number) {
    router.push('/flight/' + id)
}

</script>