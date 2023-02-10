const Time = require("../models/Time");
const Task = require("../models/Task");

const mongoose = require("mongoose");


exports.create = async (req, res) => {
    const employeeId = req.params.employeeId;
    const taskId = req.params.taskId;
    const _id =  new mongoose.Types.ObjectId();

    const times = req.body.times;
   
    for (let i = times.length - 1; i >= 0; i--) {

        const time = new Time({ _id,...times[i], employeeId, taskId });

        time.save(async (err, time) => {

            if (err) {
                return res.status(400).json({
                    err: errorHandler(err),
                });
            }
            Task.findOneAndUpdate({
                _id: taskId
            }, {
                $inc: {
                    spent: times[i].spent
                },
                $push: {
                    times : time._id
                }
            }).then(async () => {
                try {
                    const times = await Time.find({ employeeId });
                    res.status(200).json(times);
                } catch (err) {
                    res.status(500).json(err);
                }
            })


        });
    }

    // time.save( async (err, time) => {
    //   console.log(err);
    //   if (err) {
    //     return res.status(400).json({
    //       err: errorHandler(err),
    //     });
    //   }
    //   Task.findOneAndUpdate({
    //     _id : taskId
    //    } , {
    //      $push : {
    //        times : time._id
    //      }
    //    }).then( async ()=>{
    //     try {
    //       const times = await Time.find({ employeeId });
    //       res.status(200).json(times);
    //     } catch (err) {
    //       res.status(500).json(err);
    //     }
    //    })


    // });
};
