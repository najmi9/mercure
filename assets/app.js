import mercure from "./js/mercure";

(() => {
    pushUpdate();

    mercure();


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

