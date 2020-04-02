<script>
    import Search from './Search.svelte';
    let greet = 'Discogs personal notifier';
</script>

<div class="wrapper">
    <h1>{greet}</h1>
    <Search />
</div>


<style>
    :global(html) {
        font-size: 14px;
        font-family: Arial, sans-serif ;
    }
    .wrapper {
        padding: 3rem 1rem;
    }
    h1 {
        text-align: center;
        font-size: 2rem;
        color: #41adff;
    }
</style>
