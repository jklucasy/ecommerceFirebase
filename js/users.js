/* PROFILE USER IN FORM */
let userProfile = document.querySelector('#usernameProfile');
let emailProfile = document.querySelector('#emailProfile');
let passwordProfile = document.querySelector('#passwordProfile');
let formProfile = document.querySelector('#formProfile');
let deleteProfile= document.querySelector('#deleteProfile');

const valueProfileUserForm = (info, iu) => {
    if (userProfile != null) {
        /* console.log(info) */
        userProfile.setAttribute('value', info.name);
        userProfile.setAttribute('data', iu);
        emailProfile.setAttribute('value', info.email);
    }

}


const UpdateUserDb = (profile, uid) => {
    let url = `https://kodemiaecommerce-default-rtdb.firebaseio.com/users/${uid}.json`;

    const data = {
        type: 2,
        name: profile.name,
        email: profile.email
    }

    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.ok) {
                return true;
            }
        });
}

const updateFirebaseEmail = (email) => {
    userSession.updateEmail(email).then(() => {
        return true;
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    });
}

const updateFirebasePass = (pass) => {
    userSession.updatePassword(pass).then(() => {
        return true;
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    });
}

const profileBtn = (event) => {
    event.preventDefault();
    if ((validateData(userProfile.value) || validateData(emailProfile.value)) && validateData(passwordProfile.value)) {

        profile.name = userProfile.value;
        profile.email = emailProfile.value;
        let iu = userProfile.getAttribute('data');
        /* console.log(iu) */
        UpdateUserDb(profile, iu);

        updateFirebaseEmail(emailProfile.value)
        updateFirebasePass(passwordProfile.value)


        return true;
    } else {
        return false;
    }
}

if (formProfile) {
    formProfile.addEventListener('submit', profileBtn);
}

const deleteUserDb=(uid)=>{
    let url = `https://kodemiaecommerce-default-rtdb.firebaseio.com/users/${uid}.json`;

    fetch(url, {
        method: 'DELETE'
    })
        .then((response) => {
            if (response.ok) {
                return true;
            }
        });
}

const deleteUserFirebase = () => {
    
        let iu = userProfile.getAttribute('data');
    userSession.delete().then(() => {
        deleteUserDb(iu);
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    });
    
}
if (deleteProfile) {

deleteProfile.addEventListener('click', deleteUserFirebase);
}

/* UPDATE AND DELETE GAMES */

let newGame = document.querySelector('#newGame');
let listGame = document.querySelector('#listGame');
let profileBtnGamer = document.querySelector('#profileBtn');

let accountProfile = document.querySelector('#accountProfile');
let productAdd = document.querySelector('#productAdd');

profileBtnGamer.addEventListener('click',(e)=>{
    e.preventDefault();
    accountProfile.classList.remove('d-none');
    accountProfile.classList.add('d-block');
})

newGame.addEventListener('click',(e)=>{
    e.preventDefault();
    productAdd.classList.remove('d-none');
    accountProfile.classList.add('d-none');
    productAdd.classList.add('d-block');
})


