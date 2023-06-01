
<script>
    import Searchbar from "./searchbar.svelte"
    import IoMdClose from 'svelte-icons/io/IoMdClose.svelte'
    import FaHome from 'svelte-icons/fa/FaHome.svelte'
    import FaRegClock from 'svelte-icons/fa/FaRegClock.svelte'
    import MdNewReleases from 'svelte-icons/md/MdNewReleases.svelte'
    import FaBuilding from 'svelte-icons/fa/FaBuilding.svelte'
    import IoMdTrendingDown from 'svelte-icons/io/IoMdTrendingDown.svelte'
    import IoMdBookmark from 'svelte-icons/io/IoMdBookmark.svelte'
    import IoIosMoon from 'svelte-icons/io/IoIosMoon.svelte'
    import IoMdSunny from 'svelte-icons/io/IoMdSunny.svelte'
    import IoIosCheckmarkCircleOutline from 'svelte-icons/io/IoIosCheckmarkCircleOutline.svelte'
    import FaUser from 'svelte-icons/fa/FaUser.svelte'

    export let logoutUser;
    export let loggedInUser;
    export let showRecentlyAdded;
    export let showNewHomes;
    export let showApartments;
    export let showTwoBed;
    export let showThreeBed;
    export let showFourPlusBed;
    export let showMyListings;
    export let belowMarketValueHasRun;
    export let priceSliderValue;
    export let handlePriceSliderChange;
    export let resetPriceSlider;
    export let isMobileMenuActive;
    export let toggleMobileMenu;
    export let filterProperties;
    export let toggleAllProperties;
    export let toggleNewHomes;
    export let toggleRecent;
    export let toggleApartments;
    export let toggleTwoBed;
    export let toggleThreeBed;
    export let toggleFourBedPlus;
    export let toggleMyListings;
    export let showBookmarksBar;
    export let bookmarks;
    export let filterBySearch;
    export let handleBelowMarketValueButtonClicked;
    export let toggleTheme;
    export let theme;

    import { setContext } from 'svelte';
    import { afterUpdate } from 'svelte';

    const updateTrigger = {};

    $: {
        setContext('update', updateTrigger);
    }

    let isUserPanelVisible = false
    const showUserPanel = () => isUserPanelVisible = !isUserPanelVisible

    afterUpdate(() => {
        filterProperties()        
    })

</script>

<section class={isMobileMenuActive ? "sidebar" : "sidebar hidden"}>
    <header>
        <div class="icon" on:click={showUserPanel} alt="User profile picture" title="User Profile">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010" alt="">
        </div>

        {#if isUserPanelVisible}
            <div class="user_panel">
                <p>{`Hello, ${loggedInUser}`}</p>
                <button class="logout" on:click={logoutUser}>Logout</button>
            </div>
        {/if}

        <Searchbar 
        filterBySearch={filterBySearch}
        />
    </header>

    <span class="title">
        <header class="mobile_menu_header">
            <div class="icon">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010" alt="">
            </div>

            <div>
                <p>{`Hello, ${loggedInUser}`}</p>
                <button class="logout" on:click={logoutUser}>Logout</button>
            </div>
        </header>

        <span>
            <h3>Quick Filters</h3>

            <div on:click={toggleMobileMenu} class="close">
                <IoMdClose/>
            </div>
        </span>
    </span>

    <div class="filtering_options">
        <ul>
            <li on:click={toggleAllProperties}>
                <div>
                    <FaHome/>
                </div>
                
                <p>All Properties</p>
            </li>

            <li on:click={toggleRecent}>
                <div>
                    <FaRegClock/>
                </div>

                <p>Recently Added</p>

                {#if showRecentlyAdded}
                    <span class="tick_icon">
                        <IoIosCheckmarkCircleOutline/>
                    </span>
                {/if}
            </li>

            <li on:click={toggleNewHomes}>
                <div>
                    <MdNewReleases/>
                </div>

                <p>New Homes</p>

                {#if showNewHomes}
                    <span class="tick_icon">
                        <IoIosCheckmarkCircleOutline/>
                    </span>
                {/if}
            </li>

            <li on:click={toggleApartments}>
                <div>
                    <FaBuilding/>
                </div>

                <p>Apartments</p>

                {#if showApartments}
                    <span class="tick_icon">
                        <IoIosCheckmarkCircleOutline/>
                    </span>
                {/if}
            </li>

            <li on:click={toggleTwoBed}>
                <div>
                    <FaHome/>
                </div>

                <p>2 Bedrooms</p>

                {#if showTwoBed}
                    <span class="tick_icon">
                        <IoIosCheckmarkCircleOutline/>
                    </span>
                {/if}
            </li>

            <li on:click={toggleThreeBed}>
                <div>
                    <FaHome/>
                </div>

                <p>3 Bedrooms</p>

                {#if showThreeBed}
                    <span class="tick_icon">
                        <IoIosCheckmarkCircleOutline/>
                    </span>
                {/if}
            </li>

            <li on:click={toggleFourBedPlus}>
                <div>
                    <FaHome/>
                </div>

                <p>4+ Bedrooms</p>

                {#if showFourPlusBed}
                    <span class="tick_icon">
                        <IoIosCheckmarkCircleOutline/>
                    </span>
                {/if}
            </li>

            <li on:click={toggleMyListings}>
                <div>
                    <FaUser/>
                </div>

                <p>My Listings</p>

                {#if showMyListings}
                    <span class="tick_icon">
                        <IoIosCheckmarkCircleOutline/>
                    </span>
                {/if}
            </li>
        </ul>

        <div class="price_slider">
            <h3>Price Range</h3>

            <span class="price">
                <h3>£{priceSliderValue}</h3>
                <button on:click={resetPriceSlider}>Reset Price</button>
            </span>

            <div class="range_slider">
                <input type="range"
                on:change={handlePriceSliderChange}
                bind:value={priceSliderValue}
                min=10000 
                max=2000000
                step=1000
                style="background: 
                    linear-gradient(to right, 
                    {theme == 'light' ? '#222 0%, #222' : '#FF9B71 0%, #FF9B71'} {(priceSliderValue / 2000000) * 100}%,
                    #fff {(priceSliderValue / 2000000) * 100}%, #fff 100%);"
                >
                <span>
                    <p>£10k</p>
                    <p>£1m</p>
                    <p>£2m</p>
                </span>
            </div>
        </div>

        <ul>
            <li on:click={handleBelowMarketValueButtonClicked} 
            title="Click to show properties below the average price of the properties on show.">
                <div>
                    <IoMdTrendingDown/>
                </div>
                
                <p>Below Average £</p>

                {#if belowMarketValueHasRun}
                    <span class="tick_icon">
                        <IoIosCheckmarkCircleOutline/>
                    </span>
                {/if}
            </li>

            <li on:click={showBookmarksBar}>
                <div>
                    <IoMdBookmark/>
                </div>

                <span>
                    <p>Bookmarks</p>
                    <p class="bookmark_count">{bookmarks.length}</p>
                </span>
            </li>

            <li on:click={toggleTheme}>
                <div>
                    {#if theme === 'light'}
                        <IoIosMoon/>
                    {:else}
                        <IoMdSunny/>
                    {/if}
                </div>
                <p>Toggle Theme</p>
            </li>
        </ul>
    </div>
</section>

<style>

    .sidebar {
        position: sticky;
        position: -webkit-sticky;
        top: 1.5vh;
        bottom: 1.5vh;
        max-height: 96.7vh;
        margin: 15px 15px;
        background: #ffffff;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
        border-radius: 10px;
        overflow-y: scroll;
        box-sizing: border-box;
        width: 320px;
        opacity: 100%;
    }

    header {
        display: grid;
        position: sticky;
        background-color: white;
        top: 0px;
        grid-template-columns: 18% 1fr;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
    }

    .user_panel {
        position: absolute;
        top: 70px;
        left: 10px;
        padding: 5px 20px 15px;
        background-color: white;
        border: 1px solid #cccccc;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

    .mobile_menu_header {
        display: none;
    }

    button.logout {
        font-size: 0.9rem;
        padding: 4px 8px;
        border-radius: 999px;
    }

    .icon {
        display: flex;
        align-items: center;
        height: 40px;
        width: 40px;
        margin-right: 20px;
        overflow: hidden;
        border-radius: 999px;
        cursor: pointer;
        border: 1px solid transparent;
    }

    .icon:hover {
        border: 2px solid #fbaaaa;
    }

    .icon img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    span.title {
        display: flex;
        background-color: white;
        margin: 20px 0px -20px;
        padding: 0px 10px;
        box-sizing: border-box;
        align-items: center;
        justify-content: space-between;
    }

    .close {
        display: none;
    }

    ul {
        padding: 0px;
        margin: 20px;
    }

    ul li {
        display: grid;
        grid-template-columns: 20% 65% 15%;
        grid-template-rows: 1fr;
        align-items: center;
        list-style: none;
        padding: 1px 10px;
        cursor: pointer;
        white-space: nowrap;
    }

    ul li div {
        height: 20px;
        width: 20px;
        margin: 0px 20px 0px 0px;
    }

    ul li span {
        display: flex;
        align-items: center;
    }

    .bookmark_count {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #cccccc;
        border-radius: 999px;
        width: 25px;
        height: 25px;
        margin: 0px 0px 0px 10px;
    }

    ul li:hover {
        background: #e7e7e7;
        border-radius: 10px;
    }

    .price_slider {
        margin: 20px;
    }

    .range_slider span {
        display: flex;
        justify-content: space-between;
    }

    input {
        width: 100%;
    }

    input:hover {
        cursor: pointer;
    }

    input {
        width: 100%;
        height: 5px;

        background-color: #111619;
        border-radius: 5px;

        appearance: none;
        background-color: #e7e7e7;
        border-radius: 10px;
        width: 100%;
        background-size: 50%;
        height: 0px;
        padding: 3px;
        cursor: pointer;
    }

    input::-webkit-slider-thumb {
        appearance: none;
        background-color: #111619;
        border: 1px solid #cccccc;
        border-radius: 999px;
        width: 20px;
        height: 20px;
        cursor: pointer;
    }

    input::-moz-range-thumb {
        appearance: none;
        background-color: #111619;
        border: 1px solid #cccccc;
        border-radius: 999px;
        width: 20px;
        height: 20px;
        cursor: pointer;
    }

    span.price {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    span.price button {
        border-radius: 999px;
        margin: 0px;
        padding: 4px 8px;
        font-size: 0.85rem;
    }

    span.price button:hover {
        background-color: #222;
        color: white;
        border: 1px solid #222;
    }

    .tick_icon {
        display: block;
        height: 20px;
        width: 20px;
        justify-self: flex-end;
    }

    @media screen and (max-width: 1000px) {

        .icon {
            height: 50px;
            width: 50px;    
        }

        .mobile_menu_header {
            display: flex;
            justify-content: flex-start;
            padding: 0px;
        }

        .mobile_menu_header p {
            font-size: 0.8rem;
            margin: 10px 0px;
        }

        span.title {
            display: flex;
            flex-direction: column;
            padding: 0px 20px;
            align-items: flex-start;
        }

        span.title span {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }

        header {
            display: none;
        }

        ul li {
            padding: 1px 8px;
        }

        ul li p {
            margin: 15px 0px;
        }

        .sidebar.hidden {
            opacity: 0%;
        }

        .close {
            display: flex;
            height: 35px;
            width: 35px;
        }
    }

    @media screen and (max-width: 500px) {
        
        .sidebar {
            width: 100vw;
            height: 88vh;
            padding: 0px;
            top: 0px;
            bottom: 0px;
            margin: 10px;
            box-shadow: none;
        }

        span.title {
            display: flex;
            position: sticky;
            top: 0px;
            margin: 0px 20px 0px;
            padding: 10px 0px 0px;
        }
    }

    /* Dark Styles */

    :global(body.dark) ul li:hover {
        background-color: #090c0d;
    }

    :global(body.dark) .mobile_menu_header, :global(body.dark) header {
        background-color: #111619;
    }

    :global(body.dark) .user_panel {
        background: #2e353d;
        border: 1px solid #505c6a;
    }

    body.dark ul li div, body.dark header div {
        color: #FF9B71;
    }

    :global(body.dark) .sidebar, :global(body.dark) span.title {
        background-color: #111619;
    }

    body.dark span.price button {
        background-color: #131d24;
        border: 1px solid #131d24;
        color: white;
    }

    :global(body.dark) button.logout {
        background-color: #2e353d;
        color: white;
        border: 1px solid #505c6a;
    }

    body.dark span.price button:hover {
        background-color: #FF9B71;
        border: 1px solid #FF9B71;
        color: white;
    }

    :global(body.dark) .bookmark_count {
        background-color: #505c6a;
    }

    :global(body.dark) input {
        background-color: #111619;

        background-color: #2e353d;
        border: 1px solid #505c6a;
    }

    :global(body.dark) input::-webkit-slider-thumb {
        background-color: #FF9B71;
        border: 1px solid #111619;
    }

    :global(body.dark) input::-moz-range-thumb {
        background-color: #FF9B71;
        border: 1px solid #111619;
    }

</style>