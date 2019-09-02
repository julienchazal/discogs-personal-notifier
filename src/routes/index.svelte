<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<script>
	import {utilsFetch} from '../components/Utils.svelte'

    function fetchCb(data, isErr) {
        if (isErr) {
            alert('error');
        } else {
			console.log(data);
			console.log(data.artists_sort + ' - ' + data.title + ' - ' + data.num_for_sale + ' en vente !');
        }
    }
    const name = 'test'
    utilsFetch('https://api.discogs.com/releases/2387793', 'json', fetchCb)
</script>

<h1>Great success!</h1>

<figure>
	<img alt='Borat' src='great-success.png'>
	<figcaption>HIGH FIVE { name }!</figcaption>
</figure>

<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>
