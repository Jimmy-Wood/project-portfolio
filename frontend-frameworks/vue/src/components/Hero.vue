<script setup>
    const {name, data, percentage, handleToggleModal, handleResetData} = defineProps({
        name: Object,
        data: Object,
        handleToggleModal: Function,
        percentage: Object,
        handleResetData: Function
    })

    function copyLink() {
        navigator.clipboard.writeText("/");
        alert("Link copied to clipboard!");
    }

</script>

<template>
    <section id="hero">
        <h3 class="text-large">
            {{ name.value }}, you have {{ data.value["weeks"] }} weeks left. Make them count! ⌛
        </h3>
        <div class="btns-container">
            <button @click="handleToggleModal">Not {{ name }}?</button>
            <button @click="copyLink" class="link-button">Copy link</button>
            <button @click="handleResetData" class="link-button">Reset data</button>
        </div>
        <div class="progress-bar">
            <div :style="{'width': percentage.value}">
                <div>
                    <i class="fa-solid fa-baby" />
                    <h6 class="bar-label">Birth</h6>
                </div>
                <h6>{{ percentage.value }}</h6>
            </div>
            <div>
                <h6 class="bar-label">Death</h6>
                <i class="fa-solid fa-skull" />
            </div>
        </div>
    </section>

</template>

<style scoped></style>
