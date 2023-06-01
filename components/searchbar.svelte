<script>

    export let filterBySearch;

</script>

<section class="searchbar">
    <input 
    on:input={filterBySearch}
    type="text" 
    placeholder="Type city, address or postcode..."
    >
</section>

<style>

    .searchbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    input {
        border-radius: 99px;
        padding: 12px;
        width: 100%;
        margin: 0px;
        background: #f4f4f4;
    }

    input::placeholder {
        font-size: 0.9rem;
    }

    @media screen and (max-width: 500px) {
        input {
            padding: 8px;
        }
    }

    /* Dark Styles */

    :global(body.dark) input {
        background-color: #111619;
        border: 1px solid #2e353d;
        color: white;
    }

</style>