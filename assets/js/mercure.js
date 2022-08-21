import { EventSourcePolyfill } from 'event-source-polyfill';

export default function mercure() {
    const hubUrl = new URL(document.body.dataset.url);

    hubUrl.searchParams.append('topic', '/users/1');

    const lastEventId = localStorage.getItem('lastEventId');
    if (null !== lastEventId){
        hubUrl.searchParams.append('Last-Event-ID', lastEventId);
    }

    const subscriptionToken = document.body.dataset.token;

    const headers =  {
        headers: {
            Authorization: 'Bearer ' + subscriptionToken,
        },
        lastEventIdQueryParameterName: 'Last-Event-Id',
    };

    const eventSource = new EventSourcePolyfill(hubUrl, headers);

    /**
     * @param {MessageEvent} e
     */
    eventSource.onmessage = (e) => {
        localStorage.setItem('lastEventId', e.lastEventId);
        const data = JSON.parse(e.data);
        console.log({data});
    };

    window.addEventListener('beforeunload', () => {
        if (eventSource != null) {
            eventSource.close();
        }
    });
}
