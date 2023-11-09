const mongoose = require('mongoose');
// Define the schema for your "chat" collection
const UserChat = new mongoose.Schema({
    phoneno: String,
    index: Number,
    safe: {
      type:String,
      required:true
    },
    anyHarassment: String,
    organization: String,
    name: String,
    location: String,
    contactNumber: String,
    email: String,
    employeeOrStudentId: String,
    isEthnicMinority: String,
    gender: String,
    assaulted: String,
    oneOffIncident: String,
    dateOfIncident: String,
    nameOfAssaulter: String,
    reportAnonymously: String,
    reportToManagement: String,
    locationOfIncident: String,
    createdAt: { type: Date, default: Date.now },
  }, { 
    expiresAfterSeconds: 300 // Automatically delete documents after 60 seconds (1 minute)
  
  });

// Create a model from the schema
const Userchat = mongoose.model('UserChat', UserChat);
// Export the model
module.exports = Userchat;