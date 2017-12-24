import moment from 'moment';

const fetchNextTrain = async (route_type, route_id, stop_id) => {
  try{

    const result = await fetch('https://us-central1-mytrainbackhome.cloudfunctions.net/melbourne_metro')
    const resultParsed = JSON.parse(result._bodyText)
    return {
      secondsToLeave: moment.utc(resultParsed.scheduled_departure_utc).diff(moment.utc(),'seconds') 
    }

  } catch(e){

    console.log(e);
    alert(e);
    const result = { secondsToLeave: 20 };
return result
  }
}

export {
fetchNextTrain
}
