const dropdowns = document.querySelectorAll(".dropdown select");
  const button=document.querySelector("button");
  const BaseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
    const fromcurr=document.querySelector(".from select");
    const tocurr=document.querySelector(".to select");
    const Message=document.querySelector(".msg");
     for(let select of dropdowns){
    for (currcode in countryList){
       let newOption=document.createElement("option");
        newOption.value=currcode;
        newOption.innerText=currcode;
        if(select.name==="from" && currcode==="USD"){
        newOption.selected="selected";
        }
          if(select.name==="to" && currcode==="INR"){
        newOption.selected="selected";
        }
          select.append(newOption);
    }
      select.addEventListener("change",(evt) => {
             updateFlag(evt.target);
          });
  }
  const updateFlag= (element)=>{
        let currcode=element.value;
        let countrycode=countryList[currcode];
        let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`
        let img= element.parentElement.querySelector("img");
        img.src=newsrc;
  };
  button.addEventListener("click", async(evt)=>{
   evt.preventDefault();
   let amount=document.querySelector("input");
    let amtValue=amount.value;
    if(amtValue===" " || amtValue<1){
      amtValue=1;
      amount.value="1";
    }
      const from = fromcurr.value.toLowerCase();   // read at click time
  const to = tocurr.value.toLowerCase();

 const URL = `${BaseUrl}/${from}.json`;
  let response = await fetch(URL);
  let data = await response.json();
 let amt=data[from][to]; //usd:inr, we are getting the conversion in INR 
 let rate=amtValue*amt;
 let fromcountry=fromcurr.value;
  let tocountry=tocurr.value;
 Message.innerText=`Exchange Rate= 1 ${fromcountry} => ${data[from][to]} ${tocountry}\n`+
`Conversion of ${amtValue} in ${tocountry} is: ${rate}`;
  });