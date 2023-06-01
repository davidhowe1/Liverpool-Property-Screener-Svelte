<script>

    import IoMdClose from 'svelte-icons/io/IoMdClose.svelte'
    export let alertMessageText;
    export let closeAlertMessage;
    export let propertyBookmark;

</script>

<section class={alertMessageText === '' ? "alert_message hidden" : "alert_message"}>
    {#if !alertMessageText.includes('£') && !alertMessageText.includes('listings.') && !alertMessageText.includes('calculation')}
        <div class="bookmark_image">
            <img src={propertyBookmark ? propertyBookmark.image : ''} alt="">
        </div>
    {/if}

    <p>{alertMessageText}</p>
    
    <div on:click={closeAlertMessage} class="close">
        <IoMdClose/>
    </div>
</section>

<style>

    .alert_message {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        bottom: 20px;
        right: 20px;
        padding: 10px 20px 10px 10px;
        border-radius: 10px;
        background-color: #111;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    }

    p {
        color: white;
        font-weight: 500;
        margin: 20px 0px 20px 20px;
    }

    .alert_message.hidden {
        display: none;
    }

    .alert_message .close {
        height: 20px;
        width: 20px;
        margin: 0px 0px 0px 20px;
        cursor: pointer;
        color: white;
    }

    .bookmark_image {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        height: 80px;
        width: 120px;
        border-radius: 5px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media screen and (max-width: 1000px) {
        .alert_message {
            position: fixed;
            left: 0px;
            right: 0px;
            width: 85vw;
            margin: 0px auto;
        }

        .alert_message .close {
            display: flex;
            align-items: center;
            height: 30px;
            width: 30px;
            margin: 0px;
        }

        p {
            width: 100%;
            font-size: 0.8rem;
            margin: 10px 0px 10px 10px;
        }

        .bookmark_image {
            height: 60px;
            width: 100px;
            border-radius: 5px;
        }
    }

    /* Dark Styles */

    :global(body.dark) .alert_message {
        background: white;
    }

    :global(body.dark) .alert_message p {
        color: #333;
    }

    :global(body.dark) .alert_message .close {
        color: #333;
    }

</style>