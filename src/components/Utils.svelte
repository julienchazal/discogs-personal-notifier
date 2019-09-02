<script >
 export function test () {console.log('utils')};
//************** FETCH API ******************//
function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function json(response) {
    return response.json()
}

function text(response) {
    return response.text()
}

export function utilsFetch (url, dataType, callback, submitBtn, countdownEL) {
    submitBtn && disableFetchBtn(submitBtn);

    fetch(url, {credentials: 'same-origin'})
        .then(status)
        .then(dataType === 'text' ? text : json)
        .then(data => {
            if (countdownEL) {
                callback(data, false, countdownEL);
            } else {
                callback(data);
            }
            submitBtn && enableFetchBtn(submitBtn);
        })
        .catch(err => {
            console.log(err);
            callback(err, true, countdownEL);
            submitBtn && enableFetchBtn(submitBtn);
        });
}
</script>
