const route = require('express').Router()
const History = require('./History')

route.get('/',(req,res)=>{
   History.find()
         .then((response)=>{
            if (response.length == 0) {
               res.status(200).json({
                  message : 'No information available',
                  response
               })
            } else{
               res.status(200).json({
                  message : 'Available information is',
                  response
               })
            }
         })
         .catch((error)=>{
            console.log(error)
            res.status(500).json({
               error,
               message : "Server Error Occurred"
            })
         })
})

route.post('/',(req,res)=>{
   let history = new History(req.body)
  // console.log(req.body)

   history.save()
      .then(()=>History.find())
      .then((data)=>{
         res.status(201).json(data)
      })
      .catch((error)=>{
         console.log(error)
         res.status(500).json({
            message : "Server Error Occurred"
         })
      })
})

route.delete('/:id',(req,res)=>{
   let {id} = req.params
   History.findByIdAndRemove({_id : id})
      .then(()=>{
         res.status(200).json({
            message : "Deleted Successfully"
         })
      })
      .catch((error)=>{
         res.status(500).json({
            message : 'Server error occurred',
            error
         })
      })
})



module.exports = route