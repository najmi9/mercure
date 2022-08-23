import { EventSourcePolyfill } from 'event-source-polyfill';

const LAST_EVENT_ID_KEY = 'lastEventId';

export default function mercure() {
    const hubUrl = new URL(document.body.dataset.url);

    hubUrl.searchParams.append('topic', '/users/1');

    const lastEventId = localStorage.getItem(LAST_EVENT_ID_KEY);

    if (null !== lastEventId){
        hubUrl.searchParams.append('lastEventID', lastEventId);
    }

    const subscriptionToken = document.body.dataset.token;

    const headers =  {
        headers: {
            Authorization: 'Bearer ' + subscriptionToken,
        },
    };

    const eventSource = new EventSourcePolyfill(hubUrl, headers);

    /**
     * @param {MessageEvent} e
     */
    eventSource.onmessage = (e) => {
        localStorage.setItem(LAST_EVENT_ID_KEY, e.lastEventId);
        const data = JSON.parse(e.data);
        console.log({data});
    };

    window.addEventListener('beforeunload', () => {
        if (eventSource != null) {
            eventSource.close();
        }
    });
}
