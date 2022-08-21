
import { EventSourcePolyfill } from 'event-source-polyfill';

(() => {
    pushUpdate();

    const url = new URL(document.body.dataset.url);

    url.searchParams.append('topic', '/foo');

    const subscriptionToken = document.body.dataset.token;

    const headers =  {
        headers: {
            Authorization: 'Bearer ' + subscriptionToken,
        },
        lastEventIdQueryParameterName: 'Last-Event-Id',
    };

    const eventSource = new EventSourcePolyfill(url, headers);

    eventSource.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
    };

    window.addEventListener('beforeunload', () => {
        if (eventSource != null) {
            eventSource.close();
        }
    });

    function pushUpdate() {
        const btn = document.querySelector('button.js-push-update');

        if (!btn) {
            console.error('Btn.js-push-update does not exists in the DOM');
            return;
        }

        btn.onclick = async (e) => {
            e.preventDefault();
            try {
                await fetch('/push-update');
                console.log('Update Pushed');
            } catch (error) {
                console.error(error);
            }
        }
    }
})();

