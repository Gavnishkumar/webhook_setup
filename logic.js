
  
const validatePhoneNumber = (phoneNumber) => {
  // Regular expression for validating 10-digit phone numbers
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
};
const validateEmail = (email) => {
  // Regular expression for validating email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

  const logicFuntion =(lastindex,lastresponse)=>{
    switch (lastindex) {
      case 0:{
        if(lastresponse<'0' || lastresponse >'6'){
          return 20
        }
        else{
          return 1;
        }
        break;
      }
      case 1:{
        if(lastresponse==="yes"){
          return 2;
        }
        else{
          return 18;
        }
        break;
      }
      case 2:{
        return 3;
        break;
      }
      case 3:{
        return 4;
        break;
      }
      case 4:{
        return 5;
      }
      case 5:{
        if(validatePhoneNumber(lastresponse)){
          return 6;
        }
        else{
          return 22;
        }
        break;
      }
      case 6:{
        if(validateEmail(lastresponse)){
          return 7;
        }
        return 23;
        break;
      }
      case 7:{
        if(lastresponse.toLowerCase() ==="yes" || lastresponse.toLowerCase()==="no"){
          return 8;
        }
        else{
          return 24;
        }
        break;
      }
      case 8:{
        return 9;
        break;
      }
      case 9:{
        if(lastresponse.toLowerCase()==="male" || lastresponse.toLowerCase()==="female" || lastresponse.toLowerCase()==="other"){
          return 10;
        }
        else{
          return 25
        }
        break;
      }
      case 10:{
        if(lastresponse.toLowerCase()==="yes"){
          return 11;
        }
        else if(lastresponse.toLowerCase()==="no"){
          return 15;
        }
        else{
          return 26;
        }
        break;
      }
      case 11:{
        if(lastresponse.toLowerCase()==="yes" || lastresponse.toLowerCase()==="no"){
          return 12;
        }
        else{
          return 27;
        }
        break;
      }
      case 12:{
        return 13;
        break;
      }
      case 13:{
        return 14;
        break;
      }
      case 14:{
        return 15;
      }
      case 15:{
        if(lastresponse.toLowerCase()==="yes" || lastresponse.toLowerCase()==="no"){
          return 16;
        }
        else{
          return 28;
        }
        break;
      }
      case 16:{
        if(lastresponse.toLowerCase()==="yes" || lastresponse.toLowerCase()==="no"){
          return 17;
        }
        else{
          return 29;
        }
        break;
      }
      
    }
  }
  const indexToQuestion=(index)=>{
      switch(index){
        case 0: {
          return "anyHarassment"
          break;
        }
        case 1: {
          return "safe"
          break;
        }
        case 2: {
          return "organization"
          break;
        }
        case 3: {
          return "name";
          break;
        }
        case 4: {
          return "location";
          break;
        }
        case 5: {
          return "contactNumber";
          break;
        }
        case 6: {
          return "email";
          break;
        }
        case 7: {
          return "isEthnicMinority";
          break;
        }
        case 8: {
          return "employeeOrStudentId";
          break;
        }
        case 9: {
          return "gender";
          break;
        }
        case 10: {
          return "assaulted";
          break;
        }
        case 11: {
          return "oneOffIncident";
          break;
        }
        case 12: {
          return "dateOfIncident";
          break;
        }
        case 13: {
          return "locationOfIncident";
          break;
        }
        case 14: {
          return "nameOfAssaulter";
          break;
        }
        case 15: {
          return "reportAnonymously";
          break;
        }
        case 16: {
          return "reportToManagement";
          break;
        }
      }
  }
  module.exports= {logicFuntion,indexToQuestion}