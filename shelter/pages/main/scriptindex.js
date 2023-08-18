import json from './pets.json' assert { type: 'json' };


const BTN_LEFT=document.querySelector("#button-left");
const BTN_RIGHT=document.querySelector("#button-right");
const CAROUSEL=document.querySelector("#carousel");
const ITEM_LEFT=document.querySelector("#item-left");
const ITEM_RIGHT=document.querySelector("#item-right");
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
    while(k<sizeOfArr)
    {
        let number=Math.floor(Math.random() * 8);
        if(active_arr.includes(number)) continue;
            active_arr[k]=number;
            k++;
    }
}
const chooseUniqueCardsLeft=()=>{
    let k=0;
    while(k<sizeOfArr)
    {
        let number=Math.floor(Math.random() * 8);
        if(left_arr.includes(number)) continue;
        let j=0;
        for(let i=0;i<sizeOfArr;i++)
        {
            if(active_arr[i]!==number) j++;
        }
        if(j===sizeOfArr)
        {
            left_arr[k]=number;
            k++;
        }
    }
}
const chooseUniqueCardsRight=()=>{
    let k=0;
    while(k<sizeOfArr)
    {
        let number=Math.floor(Math.random() * 8);
        if(right_arr.includes(number)) continue;
        let j=0;
        for(let i=0;i<sizeOfArr;i++)
        {
            if(active_arr[i]!==number) j++;
        }
        if(j===sizeOfArr)
        {
            right_arr[k]=number;
            k++;
        }
    }
}
let sizeOfArr = 3;
let active_arr=[];
let left_arr=[];
let right_arr=[];
if (document.documentElement.clientWidth < 1280 &&document.documentElement.clientWidth >= 768) {
    sizeOfArr = 2;

}
if(document.documentElement.clientWidth < 768 &&document.documentElement.clientWidth >= 320)
{
   sizeOfArr = 1;
}

const init=()=>{
    chooseUniqueCardsActive();
    chooseUniqueCardsLeft();
    chooseUniqueCardsRight();
    ITEM_ACTIVE.innerHTML="";
    ITEM_LEFT.innerHTML="";
    ITEM_RIGHT.innerHTML="";
     for(let i=0;i<sizeOfArr;i++)
     {
        const card1=createElementTemplate(left_arr[i]);
        const card2=createElementTemplate(active_arr[i]);
        const card3=createElementTemplate(right_arr[i]);
        ITEM_LEFT.appendChild(card1);
        ITEM_RIGHT.appendChild(card3);
        ITEM_ACTIVE.appendChild(card2);
    }
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
    document.querySelector(".our-pet-link").addEventListener('click',event=>{
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

    document.querySelector(".wrapper-our-friends").addEventListener('click',event=>{
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
        
         sizeOfArr=3;
         init();
       
    }
  
});
const mQuery = window.matchMedia('(max-width:1279.9px) and (min-width:768px)');

// Настраиваем слушателя событий
mQuery.addEventListener('change',(e)=>{

    if(e.matches)
    {
        
        sizeOfArr=2;
         init();
    }
  
});

const mQueryMob = window.matchMedia('(max-width:767.9px)');
mQueryMob.addEventListener('change',(e)=>{
    if(e.matches)
    {
        
        sizeOfArr=1;
        init();
    }
      
});





const moveLeft = ()=>{
    CAROUSEL.classList.add("transition-left");
    BTN_LEFT.removeEventListener("click",moveLeft);
};

BTN_LEFT.addEventListener("click",moveLeft);

const moveRight = ()=>{
    CAROUSEL.classList.add("transition-right");
    BTN_RIGHT.removeEventListener("click",moveRight);
};

BTN_RIGHT.addEventListener("click",moveRight);





CAROUSEL.addEventListener("animationend",(animationEvent)=>{
    
    if(animationEvent.animationName==="move-left"){
        CAROUSEL.classList.remove("transition-left");


        const leftItems=ITEM_LEFT.innerHTML;
        ITEM_RIGHT.innerHTML=ITEM_ACTIVE.innerHTML;
        ITEM_ACTIVE.innerHTML=leftItems;
        for(let i=0;i<sizeOfArr;i++)
        {
            right_arr[i]=active_arr[i];
            active_arr[i]=left_arr[i];
        }
        left_arr=[];
        ITEM_LEFT.innerHTML="";
        chooseUniqueCardsLeft();
         for(let i=0;i<sizeOfArr;i++)
         {
            const card=createElementTemplate(left_arr[i]);
            ITEM_LEFT.appendChild(card);
        }
          
    }
    else{
        CAROUSEL.classList.remove("transition-right");

        const rightItems=ITEM_RIGHT.innerHTML;

        ITEM_LEFT.innerHTML=ITEM_ACTIVE.innerHTML;
        ITEM_ACTIVE.innerHTML=rightItems;
        

        for(let i=0;i<sizeOfArr;i++)
        {
            left_arr[i]=active_arr[i];
            active_arr[i]=right_arr[i];
        }
        right_arr=[];
        ITEM_RIGHT.innerHTML="";
        chooseUniqueCardsRight();
         for(let i=0;i<sizeOfArr;i++)
         {
            const card=createElementTemplate(right_arr[i]);
            ITEM_RIGHT.appendChild(card);
        
        }
    }
    BTN_LEFT.addEventListener("click",moveLeft);
    BTN_RIGHT.addEventListener("click",moveRight);
});

});

    