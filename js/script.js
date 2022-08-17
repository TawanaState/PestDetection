    function fileExists(dir) {
        var xhttp = new XMLHttpRequest;
        /* Check the status code of the request */
        xhttp.onreadystatechange = function () {
            return (xhttp.status !== 404);
        };
        /* Open and send the request */
        xhttp.open('head', dir, false);
        xhttp.send();
    };

    async function searchWikipedia(searchQuery) {
        const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        return json;
    }

    async function WIKIobj(val) {
        const searchQuery = val.trim();
        try {
            const results = await searchWikipedia(searchQuery);
            return results;
        } catch (err) {
            console.log(err);
            //alert('Failed to search wikipedia');
        }
    }




