<script context="module">
    export async function load({ params, fetch }) {
        const response = await fetch(`/api/${params.shortUrl}/stats`);
        const data = await response.json();

        return {
            props: {
                stats: data.stats,
                totalClicks: data.totalClicks,
                shortUrl: params.shortUrl
            }
        };
    }
</script>

<script>
    export let stats = [];
    export let totalClicks = 0;
    export let shortUrl = '';

</script>

<h1>Статистика для {{ shortUrl }}</h1>

<table>
    <thead>
    <tr>
        <th>Час</th>
        <th>IP</th>
        <th>User Agent</th>
        <th>Гео</th>
    </tr>
    </thead>
    <tbody>
    {#each stats as stat}
        <tr>
            <td>{stat.time}</td>
            <td>{stat.ip}</td>
            <td>{stat.userAgent}</td>
            <td>{stat.geoIP}</td>
        </tr>
    {/each}
    </tbody>
</table>

<h2>Загальна кількість кліків: {totalClicks}</h2>
