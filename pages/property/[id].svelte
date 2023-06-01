<script>
    import { onMount } from "svelte";
    import { propertyDetails } from "../../stores";
    import { propertyListingsDatabase } from "../../stores";
    import FaBed from 'svelte-icons/fa/FaBed.svelte';
    import FaBath from 'svelte-icons/fa/FaBath.svelte';
    import FaHome from 'svelte-icons/fa/FaHome.svelte';
    import FaChevronLeft from 'svelte-icons/fa/FaChevronLeft.svelte';
    import FaExternalLinkAlt from 'svelte-icons/fa/FaExternalLinkAlt.svelte';

    let id;
    let propertyListings;
    let property = ''
    let theme = 'light'

    propertyListingsDatabase.subscribe(listings => propertyListings = listings)

    propertyDetails.subscribe(index => {
        id = index;
        localStorage.setItem('property_index', id)
    })
    
    property = propertyListings.find(property => property.id === id)

    const setThemeOnLoad = () => {
        theme = localStorage.getItem('theme')
        if (theme === 'light') {
            theme = 'light'
        } else {
            theme = 'dark'
        }
    }

    onMount(() => {
        setThemeOnLoad()
        checkContentHeight()
    })

    const handleImageError = (e) => {
        e.target.src = 'https://www.beechwoodhomes.com.au/fallback/placeholder-house.svg'
        e.target.alt = 'Placeholder Image'
    }

    let isDescriptionExpanded = false
    let isExpandButtonShowing = false
    
    const toggleDescriptionExpanded = () => isDescriptionExpanded = !isDescriptionExpanded

    const checkContentHeight = () => {
        const descriptionDiv = document.getElementById('description_container')
        const descriptionText = descriptionDiv.querySelector('p')
        const divHeight = descriptionDiv.offsetHeight
        const contentHeight = (descriptionText.offsetHeight) + 100
        isExpandButtonShowing = contentHeight > divHeight
    }

</script>

<body class={theme === 'light' ? "" : "dark"}>

    {#if id === undefined || property === undefined || propertyListings === null || !localStorage.getItem('property_listings')}

        <section class="error_404">
            <h1>Error</h1>
            <h2>Well this is embarrassing... looks like there was a problem loading the page!</h2>
            <a href="/">
                <button>Back Home</button>
            </a>
        </section>

    {:else}

        <div class="column">
            <div class="image_container">
                <img 
                on:error={handleImageError}
                src={property.image} 
                alt="">
            </div>


            <div class="text_container">
                <h1>{property.address}</h1>
                
                <span class="tags">
                    <h1>£{property.price.toLocaleString()}</h1>
                    <h3 class="tag">{property.newHome}</h3>
                    <h3 class="tag">{property.recentlyAdded}</h3>
                </span>

                <span class="details">
                    <span class="icon">
                        <div>
                            <FaHome/>
                        </div>
                        <h3>{property.type}</h3>
                    </span>

                    <span class="icon">
                        <div>
                            <FaBed/>
                        </div>
                        <h3>{property.bedrooms}</h3>
                    </span>

                    <span class="icon">
                        <div>
                            <FaBath/>
                        </div>
                        <h3>{property.bathrooms}</h3>
                    </span>
                </span>

                <div
                id="description_container" 
                class={isDescriptionExpanded ? "description expanded" : "description"}
                style="-webkit-mask-image: {!isDescriptionExpanded ? 'linear-gradient(to bottom, black 90%, transparent 100%)' : 'unset'};
                    mask-image:{!isDescriptionExpanded ? 'linear-gradient(to bottom, black 90%, transparent 100%);' : 'unset'}"
                >
                    <h2>About the property</h2>
                    <p>{property.description}</p>
                </div>

                {#if isExpandButtonShowing}
                    <button on:click={toggleDescriptionExpanded} 
                    class="show_more">
                        {isDescriptionExpanded ? 'Show Less' : 'Read more'}
                    </button>
                {/if}

                <span class="button_container">
                    <a href="/">
                        <button>
                            <div class="button_icon chevron">
                                <FaChevronLeft/>
                            </div>
                            Back
                        </button>
                    </a>

                    <a target="_blank" href={property.propertyLink}>
                        <button>
                            Visit Link
                            <div class="button_icon external">
                                <FaExternalLinkAlt/>
                            </div>
                        </button>
                    </a>
                </span>
            </div>
        </div>
    {/if}
</body>

<style>

    body {
        display: flex;
        justify-content: center;
        margin: 0px auto;
        padding: 80px 0px 50px;
        box-sizing: border-box;
        overflow: auto;
        height: 100%;
    }

    .column {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 800px;
    }

    .image_container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 500px;
        overflow: hidden;
    }

    .image_container img {
        object-fit: contain;
        width: 100%;
    }

    .text_container {
        display: flex;
        flex-direction: column;
    }

    h1 {
        font-size: 2.4rem;
        font-weight: 400;
        margin: 30px 0px 30px;
    }

    h2 {
        font-weight: 500;
    }

    h3 {
        font-weight: 400;
    }

    span.details {
        display: flex;
        margin: 30px 0px 0px;
        padding: 30px 0px 30px;
        border-top: 1px solid #c1c1c1;
    }

    span.tags {
        display: flex;
        align-items: center;
        padding: 0px;
    }

    span.tags h1 {
        font-size: 2.2rem;
        margin: 0px;
    }

    .tag {
        border: 2px solid #fbaaaa;
        border-radius: 999px;
        padding: 6px 10px;
        margin: 0px 0px 0px 20px;
        color: #fbaaaa;
        font-weight: 500;
    }

    .icon {
        display: flex;
        margin: 0px 50px 0px 0px;
    }

    .icon div {
        height: 20px;
        width: 20px;
        display: flex;
        align-items: center;
    }
    
    .icon h3 {
        white-space: nowrap;
        margin: 0px 0px 0px 10px;
    }

    span h3, span h3 {
        margin-right: 40px;
    }

    h3:empty {
        display: none;
    }

    .tag {
        font-size: 1rem;
    }
    
    .description {
        padding: 10px 0px;
        border-top: 1px solid #c1c1c1;
        height: 300px;
        overflow: hidden;
    }

    .description.expanded {
        height: fit-content;
    }

    .description p {
        font-size: 1.1rem;
        line-height: 2rem;
    }

    span.button_container {
        display: flex;
        align-items: center;
        margin: 20px 0px 0px;
    }

    button {
        display: flex;
        align-items: center;
        margin-right: 10px;
        padding: 10px;
        border-radius: 999px;
    }

    button:hover {
        background-color: #222;
        border: 1px solid #222;
        color: white;
    }

    .button_icon {
        height: 17px;
        width: 17px;
    }

    .button_icon.chevron {
        margin: 0px 6px 0px 0px;
    }

    .button_icon.external {
        margin: 0px 0px 0px 8px;
    }

    button.show_more {
        background-color: transparent;
        align-self: center;
        justify-self: center;
        border: 1px solid transparent;
        border-radius: 0px;
        padding: 6px 0px;
        font-size: 0.9rem;
        margin: 10px 0px 0px;
    }

    button.show_more:hover {
        color: #222;
        border-bottom: 1px solid #222;
    }

    :global(body.dark) .show_more {
        background-color: transparent;
        border: 1px solid transparent;
    }

    :global(body.dark) .show_more:hover {
        background-color: transparent;
        border: 1px solid transparent;
        border-bottom: 1px solid #c1c1c1;
    }

    .error_404 {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    .error_404 h1 {
        font-size: 5rem;
        margin: 0px;
    }

    @media screen and (max-width: 1000px) {

        body {
            margin: 0px;
            padding: 0px 0px 200px;
        }

        .column {
            width: 100%;
        }

        .text_container {
            padding: 0px 40px;
        }

    }

    @media screen and (max-width: 500px) {

        .image_container {
            height: fit-content;
        }

        .text_container {
            padding: 0px 20px;
        }

        .column {
            width: 100%;
        }

        span.button_container {
            margin: 40px 0px 0px;
        }

        h1 {
            font-size: 1.8rem;
            font-weight: 400;
        }

        span.tags h1 {
            font-size: 2rem;
        }

        .tag {
            font-size: 0.7rem;
            border: 1px solid #fbaaaa;
            padding: 5px 8px;
            white-space: nowrap;
        }
    }

    /* Dark Styles */

    :global(body.dark) {
        background: #090c0d;
        overflow-x: scroll;
    }

    :global(body.dark) button {
        background-color: #2e353d;
        border: 1px solid #2e353d;
        color: white;
    }

    :global(body.dark) button:hover {
        background-color: #FF9B71;
        border: 1px solid #FF9B71;
        color: white;
    }

    :global(body.dark) .tag {
        border: 1px solid #FF9B71;
        color: #FF9B71;
    }

    :global(body.dark) .icon div {
        color: #FF9B71;
    }

    :global(body.dark) span.details, :global(body.dark) .description {
        border-top: 1px solid #2e353d;
    }

</style>