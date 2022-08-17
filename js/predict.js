let mymodel;
let loaded = false;
tf.ready().then(() => {
    const modelPath = "https://tfhub.dev/google/aiy/vision/classifier/insects_V1/1";
    tf.loadLayersModel(modelPath, { fromTFHub: true }).then((model) => {
        mymodel = model;
        loaded = true;
    });
});


async function AIYpredict(mysteryImage) {
    const myTensor = tf.browser.fromPixels(mysteryImage);
    // Resize Image to 244
    const readyfied = tf.image
        .resizeBilinear(myTensor, [224, 224], true)
        .div(255);
    const result = await mymodel.predict(readyfied);
    result.print();
    const { values, indices } = tf.topk(result, 5);
    indices.print();
    // Let's hear those winners
    const winners = indices.dataSync();
    return [
        { value: labelTOvalue(winnerswinners[0]), key: winnerswinners[0] },
        { value: labelTOvalue(winnerswinners[1]), key: winnerswinners[1] },
        { value: labelTOvalue(winnerswinners[2]), key: winnerswinners[2] },
        { value: labelTOvalue(winnerswinners[3]), key: winnerswinners[3] },
        { value: labelTOvalue(winnerswinners[4]), key: winnerswinners[4] },
    ];
    /* console.log(`
First place ${INCEPTION_CLASSES[winners[0]]},
Second place ${INCEPTION_CLASSES[winners[1]]},
Third place ${INCEPTION_CLASSES[winners[2]]}
`); */
}









/* function AIYpredict(mysteryImage) {
    tf.ready().then(() => {
        const modelPath = "https://tfhub.dev/google/aiy/vision/classifier/insects_V1/1";
        tf.tidy(() => {
            tf.loadLayersModel(modelPath, { fromTFHub: true }).then((model) => {
                const myTensor = tf.browser.fromPixels(mysteryImage);
                // Resize Image to 244
                const readyfied = tf.image
                    .resizeBilinear(myTensor, [224, 224], true)
                    .div(255);
                const result = model.predict(readyfied);
                result.print();
                const { values, indices } = tf.topk(result, 5);
                indices.print();
                // Let's hear those winners
                const winners = indices.dataSync();
                return [
                    {value : labelTOvalue(winnerswinners[0]), key : winnerswinners[0]},
                    {value : labelTOvalue(winnerswinners[1]), key : winnerswinners[1]},
                    {value : labelTOvalue(winnerswinners[2]), key : winnerswinners[2]},
                    {value : labelTOvalue(winnerswinners[3]), key : winnerswinners[3]},
                    {value : labelTOvalue(winnerswinners[4]), key : winnerswinners[4]},
                ];
                console.log(`
            First place ${INCEPTION_CLASSES[winners[0]]},
            Second place ${INCEPTION_CLASSES[winners[1]]},
            Third place ${INCEPTION_CLASSES[winners[2]]}
            `);
            });
        });
    });
} */

