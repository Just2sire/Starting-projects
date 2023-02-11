let acceuil = document.getElementById('pageAcceuil');

let debutJeu = document.getElementById('debutJeu');

let images = [...document.getElementsByClassName('img-fluid')];

let tentatives = document.getElementById('tentative');

let paireTrouve = document.getElementById('valide');

let clicks = 0;

let paires = 0;

let dejaRetourne = false;

let firstTouch, secondTouch;

function carteTouched() {

    clicks++
    this.classList.remove("face-cache");
    tentatives.innerHTML = `Nombre de clics: <b>${clicks}</b> `
    if (!dejaRetourne) {

        dejaRetourne = true;
        firstTouch = this;
        console.log(dejaRetourne);
        console.log("Pas encore");

    } else {

        dejaRetourne = false;
        secondTouch = this;
        console.log("Deja");
        // images.forEach(carte => carte.removeEventListener('click', carteTouched));
        images.forEach(carte => carte.classList.add('noMove'));

        if (firstTouch.src == secondTouch.src && firstTouch.id != secondTouch.id) {

            console.log("Bravo");
            paires++
            // firstTouch.classList.add("noMove");
            // secondTouch.classList.add("noMove");
            paireTrouve.innerHTML = `Nombre de pairs trouvés: <b>${paires}</b> `;

        } else {

            setTimeout(() => {
                firstTouch.classList.add("face-cache");
                secondTouch.classList.add("face-cache");
            }, 500);

        }

        setTimeout(() => {
            images.forEach(carte => carte.classList.remove("noMove"));
        }, 600);

    }

}

images.forEach(element => {
    element.addEventListener('click', carteTouched)
});

function hideCart() {
    for (let i = 1; i <= 16; i++) {
        let image = document.getElementById('image' + i);
        image.classList.add('face-cache')
    }
}

function commencer() {
    acceuil.classList.add("d-none");
    debutJeu.classList.remove("d-none");

    for (let i = 0; i < 101; i++) {

        let random1 = Math.floor(Math.random() * 16) + 1;
        let random2 = Math.floor(Math.random() * 16) + 1;

        echangeImage(random1, random2);

    }
    hideCart();
}

function echangeImage(random1, random2) {
    let image1 = document.getElementById('image' + random1);
    let image2 = document.getElementById('image' + random2);

    let src1 = image1.src;

    image1.src = image2.src;

    image2.src = src1;
}

function abandon() {
    images.forEach(i => {
        i.classList.remove("d-none");
        i.classList.remove("face-cache");
    });
}

function restart() {
    commencer();
    images.forEach(img => {
        img.classList.add("face-cache");
        img.classList.remove("d-none");
        img.classList.remove("noMove")
    })
    clicks = 0;
    paires = 0;
    paireTrouve.innerHTML = `Nombre de pairs trouvés: <b>${paires}</b> `;
    tentatives.innerHTML = `Nombre de clics: <b>${clicks}</b> `
}
