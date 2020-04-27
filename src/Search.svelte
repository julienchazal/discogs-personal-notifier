<script>
    import {debounce} from './utils'
    let search = '';
    let results = [];
    let q, res;

    async function searchFn() {
        console.log('q = '+search)
        q = await fetch('https://api.discogs.com/database/search?q='+search+'&type=release&key=DISCOGS_KEY&secret=DISCOGS_SECRET');
        res = await q.json();
        console.log(res);
        results = res.results;
    }

    const debounceFn = debounce( () => {
        searchFn();
    }, 800);

    $: if (search !== '') {
        debounceFn();
    } else {
        results = []
    }
</script>

<div class="search">
    <input type="search" bind:value={search} placeholder="Black album, Rien...">
    <div>
        <ul>
            {#each results as r}
                <li data-id="{r.id}">
                    <img src="{r.thumb}" alt="">
                    <span>{r.title}<br>
                    {#each r.format as f}
                        <em>{f} /</em>
                    {/each}
                    </span>
                    <span>{r.year}</span>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style>
    .search {
        text-align: center;
    }
    input {
        font-size: 16px;
        background: aliceblue;
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 2px solid #41adff;
        padding: 1rem;
        width: 100%;
    }
    ul {
        padding: 0;
        margin: 0;
        list-style-type: none;
    }
    li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 0.5rem;
    }
    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
</style>