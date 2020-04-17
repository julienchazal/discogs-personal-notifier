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

   function test () {
        let myHeaders = new Headers(
                {
                    "Content-Type": "application/json",
                    "X-Authorization": "96aad9d50390e92334568124b3db9aa1",
                }
        );

        let myInit = { method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({
                "group_id":"discogs",
                "recipients": {
                    "install_ids":["1844d557-2c4e-4825-8b85-1d0976b90ecd"]
                },
                "message":{
                    "title":"Discogs personal notifier",
                    "body":"Truc en vente ma gueule"
                },
                "deeplink": "https://google.fr"
            })
        };

        fetch('https://api.batch.com/1.1/9D6C2881521A4D88880E100F8F5708D9/transactional/send',myInit);
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

<button on:click={test}>TEST</button>

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