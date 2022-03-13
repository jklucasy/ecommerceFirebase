
let titleGamer=document.querySelector('#containerProductGame');

const createProduct=(img,titleDb, elementDiv)=>{
    let containerdata = document.createElement('div');
    let titleProduct = document.createElement('h2');
    let container = document.createElement('div');
    let imgContainer = document.createElement('div');
    let imglocal = document.createElement('img');

    containerdata.classList.add('container');
    titleProduct.classList.add('mb-5');
    imgContainer.classList.add('card','bg-dark');
    imglocal.classList.add('card-img');
    
    imglocal.src=img;

    titleProduct.innerText=titleDb;

    elementDiv.appendChild(containerdata);
    containerdata.appendChild(titleProduct);
    elementDiv.appendChild(container);
    container.appendChild(imgContainer);
    imgContainer.appendChild(imglocal);

    return containerdata;
}


const getProductDetails=(id)=>{
    let url = `https://kodemiaecommerce-default-rtdb.firebaseio.com/products/${id}.json`;


    fetch(url)
    .then((response)=>{
        return response.json();
        /* console.log(response.json()); */
    }).then(product=>{
        createProduct(product.imgProduct,product.titleProduct, titleGamer);
    });
}



const params = new URLSearchParams(window.location.search);

const productId = params.get("productId");

console.log(productId)

getProductDetails(productId);