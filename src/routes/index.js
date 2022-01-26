const {Router}=require('express');
const router=Router();
const admin = require('firebase-admin')
var serviceAccount=require('../../utrasplantes-927cb-firebase-adminsdk-zy3vk-690e8e034d.json')
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL:'https://utrasplantes-927cb-default-rtdb.firebaseio.com/'
});
const db = admin.database();
router.get('/',(req,res)=>{
    db.ref('contactos').once('value',(snapshot)=>{
        const data = snapshot.val();
        res.render('index',{contactos:data});
    });
});
router.post('/nuevo-contacto',(req,res)=>{
    console.log(req.body);
    const nuevoContacto = {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        phone:req.body.phone,
    }
    db.ref('contactos').push(nuevoContacto);
    res.redirect('/');
});
router.get('/borrar-contacto/:id',(req,res)=>{
    db.ref('contactos/' + req.params.id).remove();
    res.redirect('/');
});
module.exports=router;