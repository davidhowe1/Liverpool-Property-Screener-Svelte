<script>

    import FaBed from 'svelte-icons/fa/FaBed.svelte'
    import FaBath from 'svelte-icons/fa/FaBath.svelte'
    import FaHome from 'svelte-icons/fa/FaHome.svelte'
    import { url } from '@roxi/routify';
    import { propertyDetails } from '../stores'

    export let properties;
    export let bookmarkPropertyListing;
    export let removePropertyListing;
    export let listViewIsActive;
    export let setPropertyIndex;

    let propertyIndex;

    propertyDetails.subscribe(index => propertyIndex = index )

    const handleImageError = (e) => {
        e.target.src = 'https://www.beechwoodhomes.com.au/fallback/placeholder-house.svg'
        e.target.alt = 'Placeholder Image'
    }

</script>

<section class={listViewIsActive ? "property_listings list" : "property_listings"}>
    {#each properties.length > 0 ? properties : [] as property}
        <a on:click={setPropertyIndex(property.id)} href={$url('/property/:id', {id: [property.id]})}>
            <div class={listViewIsActive ? "card list" : "card"} id={property.id}>
                <div class="card_image">
                    <img src={property.image} on:error={handleImageError} alt={property.address}>

                    <div class="bookmark" on:click={bookmarkPropertyListing}>
                        Save
                    </div>

                    {#if property.recentlyAdded === 'YOUR LISTING'} 
                        <div class="delete" on:click={removePropertyListing}>
                            Delete
                        </div>
                    {/if}
                </div>

                <div class="card_body">
                    <div class="address_and_price">
                        <h3>{property.address}</h3>
                        <h3 class="price">£{property.price.toLocaleString()}</h3>
                    </div>

                    <div class="card_details">
                        <span>
                            <div class="icon">
                                <FaBed/>
                            </div>
                            {property.bedrooms}
                        </span>

                        <span>
                            <div class="icon">
                                <FaBath/>
                            </div>
                            {property.bathrooms}
                        </span>

                        <span>
                            <div class="icon">
                                <FaHome/>
                            </div>
                            {property.type}
                        </span>
                    </div>

                    <div class="card_tags">
                        <span class="new">{property.newHome.toUpperCase()}</span>
                        <span class="recent">{property.recentlyAdded.toUpperCase()}</span>
                    </div>
                </div>
            </div>
        </a>
    {:else}
        <h2 class="no_properties_message">No Properties to show...</h2>
    {/each}
</section>

<style>

    .property_listings {
        display: flex;
        flex-wrap: wrap;
        overflow-y: scroll;
        height: 88%;
        width: 100%;
        padding: 0px 0px 100px;
    }

    .property_listings.list {
        display: block;
        width: 100%;
        padding: 0px 0px 100px;
    }

    .no_properties_message {
        margin: 50px;
    }

    .property_listings.list a {
        display: flex;
        width: 90%;
        box-sizing: border-box;
    }

    .card {
        display: flex;
        flex-direction: column;
        width: 350px;
        height: 550px;
        margin: 30px 0px 0px 30px;
        border-radius: 15px;
        background: #ffffff;
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    }

    .card.list {
        flex-direction: row;
        width: 100%;
        max-width: 1200px;
        height: fit-content;
        border-radius: 15px;
    }

    .card.list .card_image {
        border-radius: 15px 0px 0px 15px;
        height: 140px;
        width: 200px;
        overflow: hidden;
    }

    .card.list .card_image img {
        object-fit: cover;
    }

    .card.list .card_body {
        display: grid;
        grid-template-columns: 30% 30% 20%;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        margin: 10px 20px;
        align-content: center;
    }

    .card.list .card_details {
        height: 100%;
        align-items: center;
        font-size: 0.8rem;
    }

    .card.list .card_tags {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin: 0px;
    }

    .card.list h3 {
        font-size: 1rem;
    }

    .card.list .card_tags span {
        display: flex;
        align-items: center;
        width: fit-content;
        margin: 5px 0px;
        font-size: 0.9rem;
    }

    .card.list .card_tags span:empty {
        display: none;
    }

    .card:hover {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
    
    .icon {
        height: 18px;
        width: 18px;
        margin: 0px 5px 0px 0px;
    }

    .card_image {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        height: 300px;
        border-radius: 15px 15px 0px 0px;
    }

    .card:hover .bookmark, .card:hover .delete {
        opacity: 100%;
    }

    .bookmark {
        opacity: 0%;
        position: absolute;
        background-color: white;
        border: 1px solid #e4e4e4;
        border-radius: 999px;
        top: 10px;
        right: 10px;
        padding: 10px 15px;
    }

    .card.list .bookmark {
        bottom: 5px;
        top: unset;
        right: 5px;
        padding: 6px 10px;
    }

    .card.list .delete {
        padding: 6px 10px;
        bottom: 5px;
        top: unset;
        left: 5px;
        right: 50%;
    }

    .bookmark:hover {
        background: #222;
        border: 1px solid #222;
        color: white;
    }

    .delete {
        opacity: 0%;
        position: absolute;
        background-color: white;
        border: 1px solid #e4e4e4;
        border-radius: 999px;
        top: 10px;
        right: 85px;
        padding: 10px 15px;
    }

    .delete:hover {
        background-color: #ff7171;
        border: 1px solid #ff7171;
        color: white;
    }

    .card_image img {
        object-fit: cover;
        height: 100%;
    }

    .card_body {
        margin: 15px;
    }

    .card_details {
        display: flex;
        height: fit-content;
    }

    .card_details span {
        display: flex;
        margin: 0px 25px 0px 0px;
        white-space: nowrap;
    }

    .card_tags {
        margin: 20px 0px 0px;
    }

    .card_tags span:empty {
        display: none;
    }

    .card_tags span {
        border: 1px solid #fbaaaa;
        padding: 5px 10px;
        color: #fbaaaa;
        border-radius: 999px;
        margin: 0px 5px 0px 0px;
        white-space: nowrap;
        font-size: 0.8rem;
    }

    /* Dark Styles */

    :global(body.dark) .card {
        background-color: #111619;
        color: white;
    }

    :global(body.dark) .icon {
        color: #FF9B71;
    }

    :global(body.dark) .card_tags span {
        border: 1px solid #FF9B71;
        color: #FF9B71;
    }
    
    :global(body.dark) .bookmark, :global(body.dark) .delete {
        background-color: #0D1317;
        border: 1px solid #0D1317;
    }
  
    :global(body.dark) .bookmark:hover {
        background-color: #FF9B71;
        border: 1px solid #FF9B71;
        color: #191516;
    }

    :global(body.dark) .delete:hover {
        background-color: #ff7171;
        border: 1px solid #ff7171;
    }

    @media screen and (max-width: 1250px) {

        .property_listings.list a {
            width: 80%;
        }

        .card.list .card_body {
            grid-template-columns: 45% 25% 30%;
        }

        .card.list .card_details {
            height: 100%;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: flex-start;
            font-size: 0.7rem;
        }

        .card.list .card_details span {
            white-space: nowrap;
        }
    }

    @media screen and (max-width: 1000px) {

        .property_listings {
            justify-content: center;
            align-items: center;
            width: 100vw;
        }

        .property_listings.list a {
            width: 100%;
        }

        .card.list .card_body {
            grid-template-columns: 40% 25% 25%;
        }

        .property_listings.list {
            width: 100vw;
        }

        .card {
            width: 330px;
            margin: 30px 15px 0px 15px;
        }

        .bookmark {
            opacity: 100%;
            font-size: 0.8rem;
        }

        .delete {
            background-color: #ff7171;
            border: 1px solid #ff7171;
            color: white;
            opacity: 100%;
            font-size: 0.8rem;
        }

        :global(body.dark) .delete {
            background-color: #ff7171;
            border: 1px solid #ff7171;
            color: white;
        }

        .card.list {
            width: 100vw;
            margin: 10px 20px;
        }
    }

    @media screen and (max-width: 500px) {

        .property_listings {
            margin: 0px;
            padding: 0px;
            width: 100vw;
            height: 88%;
        }

        a {
            display: flex;
            justify-content: center;
            width: 90%;
            box-sizing: border-box;
        }

        .card.list {
            width: 92vw;
            box-sizing: border-box;
        }

        .card.list .card_image {
            border-radius: 15px 0px 0px 15px;
            height: 120px;
            width: 220px;
            overflow: hidden;
        }

        .card.list .card_body {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            margin: 10px 20px;
        }

        .card.list h3 {
            font-size: 0.9rem;
            margin: 8px 0px;
            white-space: nowrap;
            overflow: hidden;
            width: 50vw;
            text-overflow: ellipsis;
        }

        .card.list .card_details {
            display: none;
        }

        .card.list .card_tags {
            flex-direction: row;
            width: 100%;
        }

        .card.list .card_tags span {
            font-size: 0.6rem;
            margin: 0px 10px 0px 0px;
        }
    }

</style>