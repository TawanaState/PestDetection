// App Constants
const userAuth = 'agric-ai-auth';

// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();

// Init Users Database
let usersCollection = db.collection("users");
// username, phonenumber, emailaddress, password, description, interests, title

function listUsers() {
    usersCollection.get()
        .then(snapshot => {
            let arr = [];
            snapshot.forEach((v, k, p) => {
                arr.push({
                    "label": v.username,
                    "value": v.username
                });
            });
            return arr;
        })
        .catch(err => {
            console.error(err);
            return [];
        });
}
function addUser(user) {
    let returnval;
    if (userExists(user.username) == true) {
        return { message: "The Username already exists!", goon: false };
    } else {
        usersCollection.doc(user.username).set(user)
            .then(() => {
                returnval = { message: "User successfully created!", goon: true };
            })
            .catch(err => {
                returnval = { message: err, goon: false };
            });
    }
    return returnval;
}
function login(username, password) {
    if (userExists(username) == true) {
        if (userValid(username, password) == true) {
            localStorage.removeItem(userAuth);
            localStorage.setItem(userAuth, JSON.stringify(getUser(username)));
            return { message: 'Welcome ' + username, goon: true };
        } else {
            return { message: 'Access Denied!', goon: false };
        }
    } else {
        return { message: 'The username : ' + username + ' does not exist!', goon: false };
    }
}
function logout() {
    localStorage.removeItem(userAuth);
    window.location.reload();
}
function userExists(username) {
    let returnval = false;
    usersCollection.doc(username).get()
        .then(user => {
            return user.exists;
        })
        .catch(err => {
            console.error(err);
        });
    return returnval;
}
function userValid(username, password) {
    let returnval = false;
    usersCollection.doc(username).get()
        .then(snapshot => {
            if (snapshot.exists == true) {
                return (snapshot.data().password == password)
            }
        })
        .catch(err => {
            console.error(err);
        });
    return returnval;
}
function updateUser(user) {
    let returnval;
    usersCollection.doc(user.username).update(user)
        .then(() => {
            returnval = { message: "User successfully created!", goon: true }
        })
        .catch(err => {
            returnval = { message: err, goon: false }
        });
    return returnval;
}
function logged() {
    if (localStorage.getItem(userAuth) == null) {
        return false;
    } else {
        return true;
    }
}
function getUser(username) {
    usersCollection.doc(username).get()
        .then(user => {
            return user;
        })
        .catch(err => {
            return err;
        });
}
function getCurrentUser() {
    if (logged() == true) {
        return (JSON.parse(localStorage.getItem(userAuth)));
    } else {
        return null;
    }
}



// 
// Blog
//

// Init Users Database
let blogCollection = db.collection("blog");
// slug, title, author, views, content, image, date-modified, tags, enabled

function addPage(page) {
    let returnval;
    if (logged() == true) {
        if (pageExists(page.slug) == true) {
            returnval = { message: "A page with the same title already exists!", goon: false }
        } else {
            blogCollection.doc(page.slug).set(page)
                .then(() => {
                    returnval = { message: "Page successfully published!", goon: true }
                })
                .catch(err => {
                    returnval = { message: err, goon: false }
                });
        }
    } else {
        returnval = { message: 'Please login first!', goon: false }
    }
    return returnval;
}
function updatePage(page) {
    let returnval;
    blogCollection.doc(page.slug).update(page)
        .then(() => {
            returnval = { message: "Page successfully published!", goon: true }
        })
        .catch(err => {
            returnval = { message: err, goon: false }
        });
    return returnval;
}
function pageExists(slug) {
    return getPage(slug).exists;
}
function getPage(slug) {
    blogCollection.doc(slug).get()
        .then(page => {
            return page;
        })
        .catch(err => {
            return err;
        });
}
function trueAuthor(author, slug) {
    let page = getPage(slug);
    if (page.exists == true) {
        return page.data().author == author;
    } else {
        return false;
    }
}


//
// Blog
//

let pestCollection = db.collection("pests");
// name, common-name, comments[{username, date, content}]
function getPest(name) {
    blogCollection.doc(name).get()
        .then(pest => {
            return pest;
        })
        .catch(err => {
            return err;
        });
}
function pestExists(name) {
    return getPest(name).exists;
}
function updatePest(pest) {
    let returnval;
    pestCollection.doc(pest.name).update(pest)
        .then(() => {
            returnval = { message: "Page successfully published!", goon: true }
        })
        .catch(err => {
            returnval = { message: err, goon: false }
        });
    return returnval;
}
function addPest(pest) {
    let returnval;
    if (pestExists(pest.name) == true) {
        returnval = { message: "A pest with the same name already exists!", goon: false }
    } else {
        pestCollection.doc(pest.name).set(pest)
            .then(() => {
                returnval = { message: "Pest successfully updated!", goon: true }
            })
            .catch(err => {
                returnval = { message: err, goon: false }
            });
    }

    return returnval;
}
function addUpdatePest(pest) {
    let returnval;
    if (pestExists(pest.name) == true) {
        pestCollection.doc(pest.name).update(pest)
            .then(() => {
                returnval = { message: "Pest successfully updated!", goon: true }
            })
            .catch(err => {
                returnval = { message: err, goon: false }
            });
    } else {
        pestCollection.doc(pest.name).set(pest)
            .then(() => {
                returnval = { message: "Pest successfully created!", goon: true }
            })
            .catch(err => {
                returnval = { message: err, goon: false }
            });
    }

    return returnval;
}





