let reqBtn = document.querySelector('.button');
let reqInput = document.querySelector('.place');
let respResultDiv=document.querySelector('.fifth');
let firstValue=document.querySelector('.line1 .train');
let secondValue=document.querySelector('.line2');
let thirdValue=document.querySelector('.line3');

const API_KEY = '';
const arrId='740098001';

function getOrigin(origin,key){
      return `https://api.resrobot.se/v2.1/location.name?input=${origin}?&format=json&accessId=${key}`;
}


   function getTrainDetails(depId,arrId,key){
    return `https://api.resrobot.se/v2.1/trip?format=json&originId=${depId}&destId=${arrId}&passlist=true&showPassingPoints=true&accessId=${key}`; 
    
    
}

reqBtn.addEventListener('click',event =>{
    event.preventDefault();
    let origin=reqInput.value;
    //console.log(origin);
    let OriginDetails = getOrigin(origin,API_KEY);
    //console.log(OriginDetails);
    axios.get(OriginDetails).then(response => {
        let data=response.data;
       // console.log(data);
        let depId=data.stopLocationOrCoordLocation[0].StopLocation.extId;
        console.log(depId);
        
        let trainDetailsUrl=getTrainDetails(depId,arrId,API_KEY)
        axios.get(trainDetailsUrl).then(response =>{ 
            let value=response.data;
            console.log(value);
           // let trainName=value.Trip[0].LegList.Leg[0].Origin.name;
           let trainName=value.Trip[0].LegList.Leg[0].Product[0].name;
           let trainName1=value.Trip[1].LegList.Leg[0].Product[0].name;
           let trainName2=value.Trip[2].LegList.Leg[0].Product[0].name;
            let depTime=value.Trip[0].LegList.Leg[0].Origin.time;
            let depTime1=value.Trip[1].LegList.Leg[0].Origin.time;
            let depTime2=value.Trip[2].LegList.Leg[0].Origin.time;
            console.log(depTime);
            let  arrTime=value.Trip[0].Destination.time;
            let  arrTime1=value.Trip[1].Destination.time;
            let  arrTime2=value.Trip[2].Destination.time;
            console.log(arrTime);
        //let arrtime=trip.Leg.Destination.time;
    
        
        //let trainDetailsUrl=getTrainDetails(origin,API_KEY);
            //let originid=response.location.name.StopLocation.id;
            //respResultDiv.textContent=`${trainName}   ${depTime}  ${arrTime}`;
            firstValue.textContent=`${trainName} `;
            secondValue.textContent=`${trainName1} ${depTime1}${arrTime1}`;
            thirdValue.textContent=`${trainName2} ${depTime2}${arrTime2}`;
            


        });
        
        

        
    });


});
