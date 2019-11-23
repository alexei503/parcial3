const Register = require("../models/Register")

const insert = (req, res)=>{

    
    let register = new Register(
        req.body
    );

    register.datetime = new Date();

    register.save((err, nRegister)=>{
        if(err) return res.status(500).json({
            message: "nose que paso",
        });

        res.status(200).json({
            message: "lo lograste",
            register: nRegister
        });
    })
}


const update = (req, res)=>{
    let register = req.body

    if(!register._id){
        return res.status(400).json({
            message: "necesito id",
        }); 
    }

    Register.update({_id: register._id}, register)
        .then(value =>{
            res.status(200).json({
                message: "As hecho el cambio correctamente"
            });
        })
        .catch((err)=>{
            res.status(500).json({
                message: "Nose que a pasao"
            });
        })

}

const deleteById = (req, res)=>{
    let register = req.body;

    if(!register._id){
        return res.status(400).json({
            message: "necesito el id",
        }); 
    }

    Register.deleteOne({_id:register._id})
        .then(deleted=>{
            res.status(200).json({
                message: "Boraste exitosamente"
            });
        })
        .catch(err=>{
            res.status(500).json({
                message: "nose que a pasado"
            });
        })
}


const getAll = (req, res)=>{
    Register.find((err, registers)=>{
        if(err) return res.status(500).json({
            message: "Lo lograste",
        });

        if(registers){
            res.status(200).json(registers);
        }else{
            res.status(404).json({
                message: "nell no es coca",
            });
        }
    });
}


const getOneById = (req, res)=>{
    let id = req.params.id; 

    Register.findById(id, (err, register)=>{
        if(err) return res.status(500).json({
            message: "nose que a pasao",
        });

        if(register){
            res.status(200).json(register);
        }else{
            res.status(404).json({
                message: `no exite el ${id}`,
            });
        }
    });  
}

const panic = (req, res)=>{
    Register.deleteMany({}, (err)=>{
        res.status(200).send("salu");
    });
}

module.exports = {
    insert,
    update,
    deleteById,
    getAll,
    getOneById,
    panic,
}