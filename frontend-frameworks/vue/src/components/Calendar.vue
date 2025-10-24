<script setup>
import { computed } from 'vue';
const { data, lifeExpectancy } = defineProps({
    lifeExpectancy: Object,
    data: Object
})

const yearsArr = computed(() => [...Array(lifeExpectancy.value).keys()]);
const weeksArr = [...Array(52).keys()];
const weekNum = computed(() => lifeExpectancy.value * 52 - parseInt(data.value["weeks"]));
const finalWeek = computed(() => lifeExpectancy.value * 52);

function getWeeksArr(wksArr, yrIndex) {
    return wksArr.map((val, valIndex) => {
        const currentWeek = yrIndex * 52 + valIndex + 1;
        const dotStyle = currentWeek == finalWeek.value
            ? " death"
            : currentWeek < weekNum.value
                ? "  solid"
                : currentWeek == weekNum.value
                    ? " pulse"
                    : ""
        return { week: val, currentWeek, dotStyle };
    })
}

</script>

<template>
    <section id="calendar">
        <p><i>Each square of dots reqresents 52 weeks / 1 year of your life.</i></p>
        <div class=dozen-grid>
            <div class="year-grid" v-for="(year, yearIndex) in yearsArr" :key="yearIndex">
                <div class="dot" v-for="(week, weekIndex) in getWeeksArr(weeksArr, yearIndex)" :key="weekIndex" :class="week.dotStyle">
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
