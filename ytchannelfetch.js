
document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // CONFIGURATION
    // =========================

    const WORKER_URL = "https://ytchannelfetch.iixnewdev.workers.dev/";

    const youtubeChannels = [
        {
            handle: "@rays_multimedia",
            imageID: "youtube-image-1",
            nameID: "youtube-name-1",
            handleID: "youtube-handle-1",
            channelID: "youtube-channel-id-1"
        },
        {
            handle: "@Ethanfox17",
            imageID: "youtube-image-2",
            nameID: "youtube-name-2",
            handleID: "youtube-handle-2",
            channelID: "youtube-channel-id-2"
        }
    ];

    // =========================
    // FETCH CHANNEL INFORMATION
    // =========================

    async function fetchYouTubeChannel(channel) {

        const image = document.getElementById(channel.imageID);
        const name = document.getElementById(channel.nameID);
        const handle = document.getElementById(channel.handleID);
        const channelID = document.getElementById(channel.channelID);

        try {

            const response = await fetch(
                `${WORKER_URL}?handle=${encodeURIComponent(channel.handle)}`
            );

            const data = await response.json();

            if (!response.ok || data.error) {
                throw new Error(
                    data.error || `HTTP ${response.status}`
                );
            }

            // =========================
            // CHANNEL NAME
            // =========================

            if (name && data.channelName) {
                name.textContent = data.channelName;
            }

            // =========================
            // CHANNEL HANDLE
            // =========================

            if (handle) {
                handle.textContent =
                    data.channelHandle || channel.handle;
            }

            // =========================
            // CHANNEL ID
            // =========================

            if (channelID) {
                channelID.textContent =
                    data.channelId || "";
            }

            // =========================
            // CHANNEL IMAGE
            // =========================

            if (image && data.channelImage) {
                image.src = data.channelImage;
            }

            console.log(
                "YouTube channel loaded:",
                channel.handle,
                data
            );

        } catch (error) {

            console.error(
                "YouTube channel fetch error:",
                channel.handle,
                error
            );

        }
    }

    // =========================
    // INITIALIZE CHANNELS
    // =========================

    youtubeChannels.forEach(channel => {
        fetchYouTubeChannel(channel);
    });

});
