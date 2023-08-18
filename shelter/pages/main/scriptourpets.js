import json from './pets.json' assert { type: 'json' };

const BTN_LEFTALL = document.querySelector("#button-left-all");
let BTN_LEFT = document.querySelector("#button-left");
const BTN_NUMBER=document.querySelector("#button-number");
let  BTN_RIGHT=document.querySelector("#button-right");
const BTN_RIGHTALL=document.querySelector("#button-right-all");
const ITEM_ACTIVE=document.querySelector("#item-active");

const createElementTemplate=(index)=>{
    const card=document.createElement("div");
    card.classList.add("our-pet");
    let div=document.createElement("div");
    let img=document.createElement("img");
    img.setAttribute('src',json[index].img);
    img.setAttribute('alt','pet - '+json[index].name);
    div.prepend(img);
    card.prepend(div);
    let p=document.createElement("p");
    p.className="out-pet-text";
    p.innerHTML=json[index].name;
    div.after(p);
    let button=document.createElement("button");
    button.className="our-pet-btn";
    let span=document.createElement("span");
    span.className="make-friend-btn__text";
    span.innerHTML='Learn more';
    button.prepend(span);
    p.after(button);
    return card;
};


const chooseUniqueCardsActive=()=>{
    let k=0;
    while(k<8)
    {
        let number=Math.floor(Math.random() * 8);
        if(active_arr.includes(number)) continue;
            active_arr[k]=number;
            k++;
    }
}
const shuffle=(array)=>{
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
const createMainArr=()=>{
    for(let j=0;j<6;j++)
    {
        let arr=[];
        for(let i=0;i<active_arr.length;i++)
        {
            arr.push(active_arr[i]);
            
            if(arr.length%3===0 && arr.length!==0)
            {
                arr=shuffle(arr);
                main_arr=main_arr.concat(arr);
                arr=[];
            }
        }
        if(active_arr.length===8)
        {
            shuffle(arr);
            main_arr=main_arr.concat(arr);
            arr=[];
        }
    }
  
}
let numberOfPage=1;
let main_arr=[];
let active_arr=[];
let sizeOfArr = 8;
if (document.documentElement.clientWidth < 1280 && document.documentElement.clientWidth >= 768) {
    sizeOfArr = 6;

}
if(document.documentElement.clientWidth < 768 && document.documentElement.clientWidth >= 320)
{
   sizeOfArr = 3;
}
chooseUniqueCardsActive();
createMainArr();


const disbleLeftButtons=()=>{
    BTN_LEFT.disabled=true;
    BTN_LEFTALL.disabled=true;
    BTN_LEFT.classList.add("button-arraw-inactive");
    BTN_LEFT.classList.remove("button-arraw-active");
     BTN_LEFTALL.classList.add("button-arraw-inactive");
     BTN_LEFTALL.classList.remove("button-arraw-active")
}
const disbleRightButtons=()=>{
    BTN_RIGHT.disabled=true;
    BTN_RIGHTALL.disabled=true;
    BTN_RIGHT.classList.add("button-arraw-inactive");
    BTN_RIGHT.classList.remove("button-arraw-active");
    BTN_RIGHTALL.classList.add("button-arraw-inactive");
    BTN_RIGHTALL.classList.remove("button-arraw-active");
}
const switchOnLeftButtons=()=>{
    BTN_LEFT.disabled=false;
    BTN_LEFTALL.disabled=false;
    BTN_LEFT.classList.add("button-arraw-active");
    BTN_LEFT.classList.remove("button-arraw-inactive");
    BTN_LEFTALL.classList.add("button-arraw-active");
    BTN_LEFTALL.classList.remove("button-arraw-inactive");
}
const switchOnRightButtons=()=>{
    BTN_RIGHT.disabled=false;
     BTN_RIGHTALL.disabled=false;
    BTN_RIGHT.classList.add("button-arraw-active");
    BTN_RIGHT.classList.remove("button-arraw-inactive");
    BTN_RIGHTALL.classList.add("button-arraw-active");
    BTN_RIGHTALL.classList.remove("button-arraw-inactive");
}
const switchScreen=()=>{
    
    ITEM_ACTIVE.innerHTML="";
    if(numberOfPage>Math.floor(main_arr.length/sizeOfArr))
    {
        for(let i=main_arr.length-sizeOfArr;i<main_arr.length;i++)
        {
            const card=createElementTemplate(main_arr[i]);
            ITEM_ACTIVE.appendChild(card);
        }
        numberOfPage=main_arr.length/sizeOfArr;
        BTN_NUMBER.innerHTML=numberOfPage;

        disbleRightButtons();
        switchOnLeftButtons();
    }
    else{
        let start=(numberOfPage-1)*sizeOfArr;
        for(let i=start;i<start+sizeOfArr;i++)
        {
           const card=createElementTemplate(main_arr[i]);
           ITEM_ACTIVE.appendChild(card);
           switchOnRightButtons();
       }
    }
    
  
};
const init=()=>{
    
    ITEM_ACTIVE.innerHTML="";
    
     for(let i=0;i<sizeOfArr;i++)
     {
        const card=createElementTemplate(main_arr[i]);
        ITEM_ACTIVE.appendChild(card);
    }
    numberOfPage=1;
    BTN_NUMBER.innerHTML=numberOfPage;

    
    disbleLeftButtons();
     switchOnRightButtons();


};
init();


document.addEventListener("DOMContentLoaded",()=>{
    document.querySelector('.header_burger').addEventListener("click",function(){
        document.querySelector('.header').classList.toggle("open");
        document.body.classList.toggle("lock");
    });
    document.getElementById("nav").addEventListener('click', event =>{
        event._isClickWithInMenu=true;
    });
    document.getElementById("header_burger").addEventListener('click', event =>{
        event._isClickWithInMenu=true;
    });
    document.querySelector(".about-shelter").addEventListener('click',event=>{
        event._isClickOnLink=true;
    });
    document.querySelector(".our-pets").addEventListener('click',event=>{
        event._isClickOnLink=true;
    });
    
    document.querySelector(".help-link").addEventListener('click',event=>{
        event._isClickOnLink=true;
    });
    
    document.querySelector(".contacts-link").addEventListener('click',event=>{
        event._isClickOnLink=true;
    });
    
    document.body.addEventListener('click', event =>{
        
    
        if(!event._isClickWithInMenu) {
            document.querySelector(".header").classList.remove("open");
            document.body.classList.remove("lock");
        }
        if(event._isClickOnLink){
            document.querySelector(".header").classList.remove("open");
            document.body.classList.remove("lock");
        }
    });
    
    
    document.querySelector(".carousel-wrapper").addEventListener('click',event=>{
        let divPet = event.target.closest('.our-pet'); 
        if (!divPet) return; 
        event._isClickWithInModal=true;
        let nameOfPet=divPet.querySelector('.out-pet-text').innerHTML;
        for(let i=0;i<8;i++)
        {
            if(json[i].name===nameOfPet)
            {
                document.querySelector('.modal-img-div>img').setAttribute('src',json[i].img);
                document.querySelector('.modal-title').innerHTML=json[i].name;
                document.querySelector('.modal-title4').innerHTML=`${json[i].type} - ${json[i].breed}`;
                document.querySelector('.modal-description').innerHTML=json[i].description;
                document.querySelector('.modal-title').innerHTML=json[i].name;
    
                let elements=document.querySelectorAll('.modal-features>li>span:last-child');
                elements[0].innerHTML=json[i].age;
                elements[1].innerHTML=json[i].inoculations;
                elements[2].innerHTML=json[i].diseases;
                elements[3].innerHTML=json[i].parasites;
                break;
    
            }
        }
        document.querySelector('.modal').classList.toggle("open");
        document.getElementById('html').classList.add("lock");
        
    });
    document.querySelector('.button-cross').addEventListener('click',function(){
    document.querySelector('.modal').classList.remove("open");
    document.getElementById('html').classList.remove("lock");
    });
    document.getElementById("modal").addEventListener('click', event =>{
    event._isClickWithInModal=true;
    });
    document.body.addEventListener('click', event =>{
    if(event._isClickWithInModal) return;
    document.getElementById('html').classList.remove("lock");
    document.querySelector('.modal').classList.remove("open");
    });


    const mQueryC = window.matchMedia('(min-width:1280px)');

// Настраиваем слушателя событий
mQueryC.addEventListener('change',(e)=>{

    if(e.matches)
    {
         sizeOfArr=8;
         switchScreen();
    }
  
});
const mQuery = window.matchMedia('(max-width:1279.9px) and (min-width:768px)');

// Настраиваем слушателя событий
mQuery.addEventListener('change',(e)=>{

    if(e.matches)
    {
        sizeOfArr=6;
        switchScreen();
    }
  
});

const mQueryMob = window.matchMedia('(max-width:767.9px)');
mQueryMob.addEventListener('change',(e)=>{
    if(e.matches)
    {
        
        sizeOfArr=3;
        switchScreen();
    }
      
});


 
    
    BTN_LEFTALL.addEventListener("click",init)




    BTN_RIGHTALL.addEventListener("click",()=>
    {
        ITEM_ACTIVE.innerHTML="";
            
            for(let i=main_arr.length-sizeOfArr;i<main_arr.length;i++)
            {
                const card=createElementTemplate(main_arr[i]);
                ITEM_ACTIVE.appendChild(card);
            }
            numberOfPage=main_arr.length/sizeOfArr;
            BTN_NUMBER.innerHTML=numberOfPage;

        disbleRightButtons();
        switchOnLeftButtons();
    });
    
    
    
    BTN_RIGHT.addEventListener("click",()=>{

        if(numberOfPage+1===(main_arr.length/sizeOfArr)+1)return;
        if(numberOfPage+1===main_arr.length/sizeOfArr)
        {
            disbleRightButtons();
        }
        if(numberOfPage+1===2)
        {
            switchOnLeftButtons();
        }
        numberOfPage++;
        BTN_NUMBER.innerHTML=numberOfPage;
     
        let start=(numberOfPage-1)*sizeOfArr;
        ITEM_ACTIVE.innerHTML="";
        for(let i=start;i < (start+sizeOfArr);i++)
        {
            const card=createElementTemplate(main_arr[i]);
            ITEM_ACTIVE.appendChild(card);
        }

    });


   


    BTN_LEFT.addEventListener("click",()=>{
        if(numberOfPage-1===0)return;
        if(numberOfPage-1===(main_arr.length/sizeOfArr)-1)
        {
            switchOnRightButtons();
        }
        if(numberOfPage-1===1)
        {
            disbleLeftButtons();
        }
        numberOfPage--;
        BTN_NUMBER.innerHTML=numberOfPage;
       
        let start=numberOfPage*sizeOfArr;
        ITEM_ACTIVE.innerHTML="";
        for(let i=(start-sizeOfArr);i <start;i++)
        {
            
            const card=createElementTemplate(main_arr[i]);
            ITEM_ACTIVE.appendChild(card);
        }

    });


});
