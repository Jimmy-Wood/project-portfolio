<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue'
import Layout from './components/layouts/Layout.vue'
import Hero from './components/Hero.vue'
import Clocks from './components/Clocks.vue'
import Calendar from './components/Calendar.vue'
import Summary from './components/Summary.vue'
import Portal from './components/Portal.vue'
import Form from './components/Form.vue'
import { calculateTimeLeft, getLifePercentageLived } from './utils/index.js'

const defaultBirthDate = "1992-06-12"
const defaultLifeExpectancy = 80

const birthDate = ref(defaultBirthDate)
const lifeExpectancy = ref(defaultLifeExpectancy)
const name = ref("James")
const data = ref(calculateTimeLeft(defaultBirthDate, defaultLifeExpectancy))
let percentage = computed(() => getLifePercentageLived(birthDate.value, lifeExpectancy.value))


const showModal = ref(false)

function handleToggleModal() {
    showModal.value = !showModal.value
}

function handleUpdateData(newName, newBirthDate, newLifeExpectancy) {
    if (!newName || !newBirthDate || !newLifeExpectancy) return

    localStorage.setItem("formData", JSON.stringify({
        name: newName,
        birthDate: newBirthDate,
        lifeExpectancy: newLifeExpectancy
    }))

    name.value = newName
    birthDate.value = newBirthDate
    lifeExpectancy.value = parseInt(newLifeExpectancy)
    data.value = calculateTimeLeft(newBirthDate, newLifeExpectancy)
    showModal.value = false
}

function handleResetData() {
    name.value = "James"
    birthDate.value = defaultBirthDate
    lifeExpectancy.value = defaultLifeExpectancy
    data.value = calculateTimeLeft(defaultBirthDate, defaultLifeExpectancy)
    localStorage.clear()
}

const totalProps = {
    birthDate,
    lifeExpectancy,
    name,
    data,
    percentage
}

onMounted(() => {
    if (!localStorage) return

    if (localStorage.getItem("formData")) {
        const {
            name: savedName,
            birthDate: savedBirthDate,
            lifeExpectancy: savedLifeExpectancy
        } = JSON.parse(localStorage.getItem("formData"))

        name.value = savedName
        birthDate.value = savedBirthDate
        lifeExpectancy.value = parseInt(savedLifeExpectancy)
        data.value = calculateTimeLeft(savedBirthDate, savedLifeExpectancy)
    }
})

watchEffect((onCleanup) => {
    const interval = setInterval(() => {
        data.value = calculateTimeLeft(birthDate.value, lifeExpectancy.value)
    }, 1000)

    onCleanup(() => clearInterval(interval))
})

</script>

<template>
    <Layout>
        <Portal :handleCloseModal="handleToggleModal" :showModal="showModal">
            <Form :handleCloseModal="handleToggleModal" :handleUpdateData="handleUpdateData" />
        </Portal>
        <Hero :handleResetData="handleResetData" :handleToggleModal="handleToggleModal" v-bind="totalProps" />
        <Clocks v-bind="totalProps" />
        <Calendar v-bind="totalProps" />
        <Summary v-bind="totalProps" />
    </Layout>
</template>

<style scoped></style>