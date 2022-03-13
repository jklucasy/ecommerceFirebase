
/* CREATE SLIDER */
let sliderContainer = document.querySelector('#slideContainer');

const createSlider=(img, elementDiv, index)=>{
    let imgContainer = document.createElement('div');
    let imgSlide = document.createElement('img');

    imgContainer.classList.add('carousel-item');
    imgSlide.classList.add('d-block', 'w-100');
    if (index===0) {
        let activeSlide ='active';
        imgContainer.classList.add(activeSlide);
    }
    
    imgSlide.src=img;

    elementDiv.appendChild(imgContainer);
    imgContainer.appendChild(imgSlide);

    return imgContainer;
}

const getSlider=()=>{
    let API_KEY= 'b1ccb4f3d15d46d79be5875f9d1f8dfa';

    let url = `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=3&tags=7`;

    fetch(url)
    .then((response)=>{
        return response.json();
    })
    .then(data=>{
        /* console.log(data.results); */
        let games = data.results;
        let imgGame;
        games.forEach((game,index) => {
            imgGame = game.short_screenshots[0].image;

            createSlider(imgGame,sliderContainer,index);
        });
    });
}
getSlider();

/* CREATE CARDS */
let linkProduct='';
let cardLast=document.querySelector('#cardLatest');

const randomPrice=(min, max)=>{
    let randomPrice=Math.floor((Math.random() * (max - min + 1)) + min);
    /* console.log(randomPrice); */
    return randomPrice;
}

randomPrice(100, 1000);

const createCards=(key,title, img, platforms, elementDiv )=>{

    let card = document.createElement('div');
    let imgContainer = document.createElement('div');
    let imgCard = document.createElement('img');
    let cardBody = document.createElement('div');
    let linkCard = document.createElement('a');
    let titleCard = document.createElement('h5');
    let iconContainer = document.createElement('div');
    let iconCard = document.createElement('i');
    let iconCard2 = document.createElement('i');
    let detailsCard = document.createElement('div');
    let priceCard = document.createElement('p');
    let linkCart = document.createElement('a');
    let iconCart = document.createElement('i');

    card.classList.add('col-3', 'cardActive', 'card', 'border-0', 'rounded', 'p-0');
    imgContainer.classList.add('cardImage');
    imgCard.classList.add('card-img-top', 'styleImage');
    cardBody.classList.add('p-1');
    linkCard.classList.add('linkCard' ,'text-dark');
    titleCard.classList.add('card-title', 'fw-normal', 'text-center');
    iconContainer.classList.add('d-flex');
    iconCard.classList.add('bi','bi-windows','me-2','ms-2');
    iconCard2.classList.add('bi','bi-playstation', 'me-2');
    detailsCard.classList.add('bg-dark', 'd-flex', 'justify-content-around', 'align-items-center');
    priceCard.classList.add('text-white', 'm-0', 'fs-3', 'fw-bold');
    linkCart.classList.add('nav-link');
    iconCart.classList.add('bi', 'bi-cart-fill', 'text-warning', 'fs-3');

    titleCard.innerText=title;
    let disableb = '';
    for (let i = 0; i < platforms.length; i++) {
        disableb = platforms[1].platform.name==='PlayStation'?'d-block':'d-none';
        iconCard2.classList.add(disableb);
        break
    }
    linkCard.setAttribute('id','linkProduct');
    linkCard.href=`/product.html?productId=${key}`;

    linkCart.href='#'

    imgCard.src=img;
    
    priceCard.innerText=`S/.${randomPrice(100,1000)}`;

    elementDiv.appendChild(card);
    card.appendChild(imgContainer);
    card.appendChild(cardBody);
    card.appendChild(iconContainer);
    card.appendChild(detailsCard);
    imgContainer.appendChild(imgCard);
    cardBody.appendChild(linkCard);
    linkCard.appendChild(titleCard);
    iconContainer.appendChild(iconCard);
    iconContainer.appendChild(iconCard2);
    detailsCard.appendChild(priceCard);
    detailsCard.appendChild(linkCart);
    linkCart.appendChild(iconCart);

    return card;
}



const getGame=()=>{
    let API_KEY= 'b1ccb4f3d15d46d79be5875f9d1f8dfa';

    let url = `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=16&parent_platforms=2&platforms=4`;

    fetch(url)
    .then((response)=>{
        return response.json();
    })
    .then(data=>{
        /* console.log(data.results); */
        let games = data.results;
        let gamePlatforms;
        let titleGame;
        let imgGame;
        let productId;
        games.forEach(game => {
            productId= game.key;
            titleGame= game.name;
            imgGame = game.background_image;
            gamePlatforms = game.parent_platforms.slice(0,2);

            createProductsDb(productId,titleGame,imgGame,gamePlatforms);
        });
    });
};

const createProductsDb=(id,title, img, gamePlatforms)=>{
    let url = `https://kodemiaecommerce-default-rtdb.firebaseio.com/products.json`;

    const product = {
        idProduct:id,
        titleProduct:title,
        imgProduct:img,
        platformsProduct:gamePlatforms
    }

    fetch(url, {
        method:'POST',
        body: JSON.stringify(product),
        headers: {
        "Content-Type": "application/json",
        },
    })
    .then((response)=>{
        return response.json();
    });
}



const getAllProducts=async ()=>{
    let url = `https://kodemiaecommerce-default-rtdb.firebaseio.com/products.json`;

    let response = await fetch(url).then((response)=>{
        return response.json();
        
        /* console.log(response.json()); */
    })
    .then((products)=>{
        console.log(products);
            for (const key in products) {
                const card = {
                    id : products[key].idProduct,
                    title : products[key].titleProduct,
                    img : products[key].imgProduct,
                    platforms : products[key].platformsProduct
                }
    
                createCards(key,card.title,card.img,card.platforms,cardLast);
                
            }

            return products;
        
    });
    if (response==null) {
        getGame();
    }
}

/* CREATE DB USERS */
let navBarList = document.querySelector('#navList');
let sessionNones=document.querySelectorAll('.sessionNone');


const createSessionBtn=(elementDiv,textValue,id)=>{
    let itemSession = document.createElement('li');
    let linkSession = document.createElement('a');

    itemSession.classList.add('nav-item"');
    linkSession.classList.add('nav-link');
    
    itemSession.classList.add('disabledSession');

    
    
    linkSession.setAttribute('id',id);
    if (id==='config') {
        linkSession.href='/users.html';
    }
    
    linkSession.innerText=textValue;

    elementDiv.appendChild(itemSession);
    itemSession.appendChild(linkSession);

    return itemSession;
}

const profile ={
    type : 0,
    name : '',
    email : ''
}

const getUserFirebase=(id)=>{
    let url = `https://kodemiaecommerce-default-rtdb.firebaseio.com/users/${id}.json`;


    fetch(url)
    .then((response)=>{
        return response.json();
        /* console.log(response.json()); */
    }).then(user=>{
        profile.type=user.type;
        profile.email=user.email;
        profile.name=user.name;
        valueProfileUserForm(profile,id);
    });
}


const validateSession = (elementDiv) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            
            let uid = user.uid;
            let res = getUserFirebase(uid)
            userSession=user;
            console.log(userSession)
            sessionNones.forEach(non => {
                non.classList.add('d-none');
            });
            for (let index = 0; index < 2; index++) {
                let valueText = index == 1 ? 'Sign out' : 'Account';
                let valueId = index == 1 ? 'out' : 'config';
                createSessionBtn(navBarList, valueText, valueId);
            }
            let btnOut = document.querySelector('#out');
            signOutBtn(btnOut);
        } else {
            userSession=null;
            sessionNones.forEach(non => {
                non.classList.remove('d-none');
            });
            let itemDisabled = document.querySelectorAll('.disabledSession');
            itemDisabled.forEach(dis => {
                elementDiv.removeChild(dis);
            });
        }
    });
}

validateSession(navBarList);


const createUserDb=(id, userData)=>{
    let url = `https://kodemiaecommerce-default-rtdb.firebaseio.com/users/${id}.json`;


    fetch(url, {
        method:'POST',
        body: JSON.stringify(userData),
        headers: {
        "Content-Type": "application/json",
        },
    })
    .then((response)=>{
        return response.json();
    });
}

const createUserFirebase=(type,name,mail,pass)=>{
    
    auth.createUserWithEmailAndPassword(mail, pass)
        .then((user) => {
            let dbRef = database.ref();
            let userid = auth.currentUser;
            const userData = {
                type : type,
                name : name,
                email : mail
            }
            dbRef.child('users/'+userid.uid).set(userData);
            console.log('Usuario registrado!');
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;           
            console.log(errorMessage);
        });
}

const validateData=(value)=>{
    if(value==null||value.length==0){
        return false;
    };
    if (value.length>0) {
        return true;
    }
}

/* createUserFirebase(1,'test','testing@gmail.com','123456'); */
let formCreation=document.querySelector('#creationUser');
let formCreateMail=document.querySelector('#emailAccount');
let formCreatePass=document.querySelector('#passwordAccount');
let formCreatename=document.querySelector('#usernameAccount');
let modalCreation=document.querySelector('#createAccount');
const modalCreate = new bootstrap.Modal(modalCreation);

const btnCreateUser=(event)=>{
    event.preventDefault();
    if (validateData(formCreateMail.value)||validateData(formCreateMail.value)||validateData(formCreatename.value)) {
        createUserFirebase(2,formCreatename.value,formCreateMail.value,formCreatePass.value);

        modalCreate.hide();
        return true;
    }else{
        return false;
    }

}

formCreation.addEventListener('submit',btnCreateUser);



const initSessionFirebase=(mail,pass)=>{
    auth.signInWithEmailAndPassword(mail,pass)
        .then((user) => {
            /* console.log('sesion iniciada') */
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}


const signOutSessionFirebase=(elementDiv)=>{
    firebase.auth().signOut().then(() => {
        /* console.log('saliste') */
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
}

let formInit=document.querySelector('#formSession');
let formMail=document.querySelector('#email');
let formPass=document.querySelector('#password');
let modalSession=document.querySelector('#sesionSingIn');
const modal = new bootstrap.Modal(modalSession);

const initSessionBtn=(event)=>{
    event.preventDefault();
    if (validateData(formMail.value)||validateData(formPass.value)) {
        initSessionFirebase(formMail.value,formPass.value);

        modal.hide();
        return true;
    }else{
        return false;
    }
}

formInit.addEventListener('submit',initSessionBtn);



const signOutBtn=(btn)=>{
    btn.addEventListener('click',(event)=>{
        event.preventDefault();
        signOutSessionFirebase(navBarList);
    })
}

const getAllUsers=async ()=>{
    let url = `https://kodemiaecommerce-default-rtdb.firebaseio.com/users.json`;

    let response = await fetch(url).then((response)=>{
        return response.json();
        
        /* console.log(response.json()); */
    })
    .then((products)=>{
            for (const key in products) {
                const user = {
                    id : products[key].idProduct,
                    type : products[key].titleProduct,
                    name : products[key].titleProduct,
                    email : products[key].imgProduct,
                    password : products[key].platformsProduct
                }
                
            }

            return products;
        
    });
    if (response==null) {
        getGame();
    }
}

if (cardLast!=null) {
getAllProducts();
}
