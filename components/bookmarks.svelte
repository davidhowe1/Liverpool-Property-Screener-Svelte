<script>
    import IoMdClose from 'svelte-icons/io/IoMdClose.svelte'
    import FaBed from 'svelte-icons/fa/FaBed.svelte'
    import FaBath from 'svelte-icons/fa/FaBath.svelte'
    import FaHome from 'svelte-icons/fa/FaHome.svelte'
    import { url } from '@roxi/routify';

    export let showBookmarksBar;
    export let bookmarksBarIsShowing;
    export let removeBookmark;
    export let bookmarks;
    export let setPropertyIndex;

    const handleImageError = (e) => {
        e.target.src = 'https://aqareyonline.com/site_new_assets/assets/images/placeholder-listing.jpeg'
    }

</script>


<section class={bookmarksBarIsShowing ? "bookmarks" : "bookmarks hidden"}>
    <header>
        <h3>Bookmarked Properties</h3>

        <div class="close" on:click={showBookmarksBar}>
            <IoMdClose/>
        </div>
    </header>

    <div class="bookmarks_container">
        {#each bookmarks.length > 0 ? bookmarks : [] as bookmark}
            <a on:click={setPropertyIndex(bookmark.id)} href={$url('/property/:id', {id: bookmark.id})}>
                <section class="bookmark_card" id={bookmark.id}>
                    <div class="image">
                        <img 
                        on:error={handleImageError}
                        src={bookmark.image} 
                        alt="">

                        <div class="remove_bookmark" on:click={removeBookmark}>
                            Remove
                        </div>
                    </div>

                    <div class="bookmark_body">
                        <h4>{bookmark.address}</h4>

                        <h3>£{bookmark.price.toLocaleString()}</h3>

                        <div class="bookmark_details">
                            <span>
                                <div class="icon">
                                    <FaHome/>
                                </div>
                                {bookmark.type}
                            </span>
        
                            <span>
                                <div class="icon">
                                    <FaBed/>
                                </div>
                                {bookmark.bedrooms}
                            </span>
        
                            <span>
                                <div class="icon">
                                    <FaBath/>
                                </div>
                                {bookmark.bathrooms}
                            </span>
                        </div>

                        <div class="bookmark_tags">
                            <span class="new">{bookmark.newHome}</span>
                            <span class="recent">{bookmark.recentlyAdded}</span>
                        </div>
                    </div>
                </section>
            </a>
        {:else}
            <p>There are no properties saved yet</p>
        {/each}
    </div>
</section>

<style>

    .bookmarks {
        position: sticky;
        position: -webkit-sticky;
        top: 1.5vh;
        bottom: 1.5vh;
        height: 100vh;
        background: #f4f4f4;
        width: 350px;
        right: 0;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transition: 00.15s;
        border-left: 1px solid #f4f4f4;
    }

    .bookmarks.hidden {
        transform: translateX(1000px);
        transition: 00.15s;
    }

    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 15px 30px;
    }

    .close {
        height: 30px;
        width: 30px;
        cursor: pointer;
        border-radius: 999px;
        transition: 00.15s;
        padding: 5px;
    }

    .close:hover {
        background-color: rgb(229, 229, 229);
        transition: 00.15s;
    }

    .bookmarks_container {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
        height: 86%;
    }

    .bookmark_card {
        box-sizing: border-box;
        border-radius: 12px;
        margin: 0px 20px 20px;
        background: white;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    }

    .image {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        box-sizing: border-box;
        border-radius: 12px 12px 0px 0px;
    }

    .image img {
        object-fit: cover;
        width: 100%;
    }

    .bookmark_body {
        padding: 10px 10px 30px;
    }

    .bookmark_details {
        display: flex;
        align-items: center;
    }

    .bookmark_details span {
        display: flex;
        align-items: center;
        margin: 0px 25px 0px 0px;
    }

    .icon {
        height: 16px;
        width: 16px;
        margin: 0px 5px 0px 0px;
    }

    .bookmark_tags {
        margin: 20px 0px 0px;
    }

    .bookmark_tags span:empty {
        display: none;
    }

    .bookmark_tags span {
        border: 1px solid #fbaaaa;
        padding: 5px 10px;
        color: #fbaaaa;
        border-radius: 999px;
        margin: 0px 5px 0px 0px;
    }

    .remove_bookmark {
        position: absolute;
        top: 10px;
        right: 10px;
        border-radius: 999px;
        background-color: white;
        cursor: pointer;
        padding: 5px 10px;
        transition: 0.075s;
    }

    .remove_bookmark:hover {
        background-color: #ef5a5a;
        color: white;
        transition: 0.075s;
    }

    @media screen and (max-width: 500px) {
        .bookmarks {
            width: 100%;
        }
    }

    /* Dark Styles */

    :global(body.dark) .bookmarks {
        background-color: #090c0d;
        border-left: 1px solid #2e353d;
    }

    :global(body.dark) .bookmark_card {
        background-color: #111619;
        color: white;
    }

    :global(body.dark) .icon {
        color: #FF9B71;
    }

    :global(body.dark) .bookmark_tags span {
        color: #FF9B71;
        border: 1px solid #FF9B71;
    }

    :global(body.dark) .close:hover {
        background-color: #2e353d;   
    }

    :global(body.dark) .remove_bookmark {
        background-color: #ef5a5a;
        color: white;
    }

    :global(body.dark) .remove_bookmark:hover {
        background-color: #ef5a5a;
    }

</style>