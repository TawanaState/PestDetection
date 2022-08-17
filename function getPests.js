function getPests(){
    let pests = [];
    let links = document.querySelectorAll("a.md-crosslink");
    links.forEach((v, k, p)=>{
        let pest = {
            key : k,
            name : v.innerText,
            urls : [v.getAttribute("href")],
            shortDescription : v.parentElement.innerText.toLowerCase().replace(v.innerText.toLowerCase(), ""),
            images : [],
        }
        pests.push(pest);
    });

    return pests;
}