<script>
    let { data, lifeExpectancy } = $props();

    const yearsArr = $derived([...Array(lifeExpectancy).keys()]);
    const weeksArr = [...Array(52).keys()];
    const weekNum = $derived(lifeExpectancy * 52 - parseInt(data["weeks"]));
    const finalWeek = $derived(lifeExpectancy * 52);

</script>

<section id="calendar">
    <p><i>Each square of dots reqresents 52 weeks / 1 year of your life.</i></p>

    <div class=dozen-grid>
        {#each yearsArr as year, yearIndex}
        <div class="year-grid">
            {#each weeksArr.map((val, valIndex) => {
                const currWeek = yearIndex * 52 + valIndex;
                const dotStyle = currWeek == finalWeek - 1 ? " death" :
                    currWeek < weekNum ? "  solid" : currWeek == weekNum ? "  pulse" : "";
                return {week: val, currWeek, dotStyle};
            }) as week, weekIndex}
            <div class="dot {week.dotStyle}"></div>
            {/each}
        </div>
        {/each}
    </div>
</section>
