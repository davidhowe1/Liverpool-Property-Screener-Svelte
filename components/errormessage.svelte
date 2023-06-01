<script>

    import IoMdClose from 'svelte-icons/io/IoMdClose.svelte'
    export let errorMessageText;
    export let closeErrorMessage;

</script>

<section class={errorMessageText === '' ? "error_message hidden" : "error_message"}>
    <p>{errorMessageText}</p>

    <div on:click={closeErrorMessage} class="close">
        <IoMdClose/>
    </div>
</section>

<style>

    .error_message {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        bottom: 20px;
        right: 20px;
        padding: 10px 20px 10px 10px;
        border-radius: 10px;
        background-color: #f0bcbc;
        border: 1px solid #ed4d4d;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    }
    
    p {
        color: #333;
        font-weight: 500;
        margin: 10px 0px 10px 20px;
    }

    .error_message.hidden {
        display: none;
    }

    .error_message .close {
        height: 20px;
        width: 20px;
        margin: 0px 0px 0px 20px;
        cursor: pointer;
        color: #333;
    }

    @media screen and (max-width: 1000px) {
        .error_message {
            position: fixed;
            left: 0px;
            right: 0px;
            width: 85vw;
            margin: 0px auto;
        }

        .error_message .close {
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
    }

    /* Dark Styles */

    :global(body.dark) .error_message {
        background: #f0bcbc;
    }

    :global(body.dark) .error_message p {
        color: #333;
    }

    :global(body.dark) .error_message .close {
        color: #333;
    }

</style>