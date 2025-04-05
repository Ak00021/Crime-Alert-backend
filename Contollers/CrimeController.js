const {Crime}=require('../db.js')
const registerCrime = async (req, res) => {
    try {
      const data = req.body; // Extract data from the request body
    //   console.log(data);
  
      // Create a new crime document using the Crime model
      const newCrime = new Crime({
        crimes: [
          {
            email: data.email,
            contact: data.contact,
            description: data.description,
            incidentType: data.incidentType,
            isAnonymous: data.isAnonymous,
            location: data.location,
            name: data.name,
            urgency: data.urgency,
            latitude: data.latitude,
            longitude: data.longitude,
            date: data.date || new Date() // Use provided date or current date
          }
        ]
      });
  
      // Save the document to the database
      await newCrime.save();
  
      // Send a success response
      res.status(201).json({ message: "Crime registered successfully", data: newCrime });
    } catch (error) {
      // Handle any errors
      console.error("Error registering crime:", error);
      res.status(500).json({ message: "Failed to register crime", error });
    }
  };
  
async function getCrimeData(req,res){

}

module.exports={registerCrime,getCrimeData}