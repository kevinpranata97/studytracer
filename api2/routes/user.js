/**
 * Module dependencies.
 */

var jwt = require('jsonwebtoken');
var aesjs = require('aes-js')
var cryptojs = require('crypto-js')
var btoa = require('btoa')


//---------------------------------------signup services---------------------------------------------------------
exports.signup=function(req , res){
    
    var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ]
    var id= req.body.id;
    var pass= req.body.pass;
    var b64 = btoa(pass)
    var textBytes = aesjs.utils.utf8.toBytes(b64)
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

    var sql = "select id from login WHERE `id`='" + id + "'";
    db.query(sql,function(err, result){
        if(result.length){
            res.json({"results":
            {"status": false, "msg": 'User '+ id+' Already Registered'}
        });
            res.end();
        }else {
            var sql1 = "select npm from alumni WHERE `npm`='" + id + "'";
            var query = db.query(sql1,function(err,result1){
                if(result1.length){
                    var sql2 = "INSERT INTO `login`(`password`, `status`, `id`) VALUES ('" + encryptedHex + "','01','" +id+ "')";
                    var query1 = db.query(sql2,function(err,result2){
                        if(result2){
                            res.json({"results":
                            {"status": true, "msg": 'You have been registered as Alumni'}
                        });
                            res.end();
                        }else{
                            console.log(sql2)
                            res.json({"results":
                            {"status": false, "msg": 'Registration Failed'}
                        });
                            res.end();
                        }
                    })
                }else{
                    var sql3 = "select id_perusahaan from perusahaan WHERE `id_perusahaan`='" + id + "'";
                    var query2 = db.query(sql3,function(err,result3){
                        if(result3.length){
                            var sql4 = "INSERT INTO `login`(`password`, `status`, `id`) VALUES ('" + encryptedHex + "','02','" +id+ "')";
                            var query3 = db.query(sql4,function(err,result4){
                                if(result4){
                                    res.json({"results":
                                    {"status": true, "msg": 'You have been Registered as Company'}
                                });
                                    res.end();
                                }else{
                                    console.log(sql3)
                                    console.log(sql4)
                                    res.json({"results":
                                    {"status": false, "msg": 'Registration Failed'}
                                });
                                    res.end();
                                }
                            })
                        }else{
                            console.log(sql)
                            console.log(sql1)
                            console.log(sql3)
                            res.json({"results":
                            {"status": false, "msg": 'Your data is unavailable as Alumni or Company'}
                        });
                            res.end();
                        }
                    })
                }
            })
        }
    })
};
//---------------------------------------login services----------------------------------------------------------
exports.signin=function(req, res){
    var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ]
    var id= req.body.id;
    var pass= req.body.pass;
    var b64 = btoa(pass)
    var textBytes = aesjs.utils.utf8.toBytes(b64)
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

    var sql="SELECT `status`, `id` FROM `login` WHERE `password`='"+encryptedHex+"' and id = '"+id+"'";

    db.query(sql, function(err, results){
        if(results != ''){
            if(results[0].status == "01"){
                var sql1 ="SELECT * FROM `alumni` WHERE npm = '"+id+"'"
                var query =db.query(sql1, function(err,res1){
                        if(res1){
                            var sql3 = "SELECT `posisi`, `id_riwayat`, `mulai`, `sampai`, `perusahaan` FROM `riwayat` WHERE npm='" + id + "'"
                            var query3= db.query(sql3, function(err,res2){
                                if(res2){
                                    console.log(results[0].id)
                                    var secret = 'WOI';
                                    var now = Math.floor(Date.now() / 1000),
                                    iat = (now - 10),
                                    expiresIn = 3600,
                                    expr = (now + expiresIn),
                                    notBefore = (now - 10),
                                    jwtId = Math.random().toString(36).substring(7);
                                var payload = {
                                    iat: iat,
                                    jwtid : jwtId,
                                    audience : 'TEST',
                                    data : res2,
                                    profile: {
                                        npm: res1[0].npm,
                                        nama: res1[0].nama,
                                        tanggal_lulus: res1[0].tanggal_lulus,
                                        ipk: res1[0].ipk,
                                        jurusan: res1[0].jurusan,
                                        keterangan: res1[0].keterangan,
                                        picture: res1[0].picture
                                    }
                                };
                                jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn : expiresIn}, function(err, token) {
                                    if(err){
                                        res.json({
                                            "results":
                                                {
                                                    "status": false,
                                                    "msg" : 'Error occurred while generating token'
                                                }
                                        });
                                    } else {
                                        if(token != false){
                                            console.log(token)
                                            res.json({
                                                "results":
                                                    {"status": true,
                                                        "token" : token,
                                                        "user" : results[0],
                                                        "msg" : "Berhasil Login"
                                                    }
                                            });
                                            res.end();
                                        }
                                        else{
                                            res.json({
                                                "results":
                                                    {"status": false,"msg" : 'Could not create token'},
                                            });
                                            res.end();
                                        }
            
                                    }
                                });
                                }else{
                                    console.log('?')
                                    res.json({
                                        "results":
                                            {"status": false, "msg" : 'Maaf User Tidak Di Temukan'}
                                    });
                                    res.end();
                                }
                            })
                    }else{
                        res.json({
                            "results":
                                {"status": false, "msg" : 'Maaf User Tidak Di Temukan'}
                        });
                        res.end();
                    }
                })
            }else if(results[0].status == "02"){
                var sql2 = "SELECT * FROM perusahaan WHERE id_perusahaan = '"+id+"'";
                var query2 = db.query(sql2, function(err,res2){
                    if(res2){
                      console.log(id)
                      console.log(pass)
                    var secret1 = 'WOI';
                    var now1 = Math.floor(Date.now() / 1000),
                        iat1 = (now1 - 10),
                        expiresIn1 = 3600,
                        expr = (now1 + expiresIn1),
                        notBefore = (now1 - 10),
                        jwtId = Math.random().toString(36).substring(7);
                    var payload = {
                        iat: iat1,
                        jwtid : jwtId,
                        audience : 'TEST',
                        profile : {
                            id_perusahaan : res2[0].id_perusahaan,
                            status : results[0].status,
                            nama : res2[0].nama,
                            pemilik : res2[0].pemilik,
                            provinsi : res2[0].provinsi,
                            email : res2[0].email,
                            alamat : res2[0].alamat,
                            kota : res2[0].kota,
                            web : res2[0].web,
                            contact : res2[0].contact,
                            logo : res2[0].logo
                        }
                    };
                    jwt.sign(payload, secret1, { algorithm: 'HS256', expiresIn : expiresIn1}, function(err, token) {
                        if(err){
                            res.json({
                                "results":
                                    {
                                        "status": false,
                                        "msg" : 'Error occurred while generating token'
                                    }
                            });
                        } else {
                            console.log(token)
                            if(token != false){
                                console.log(token)
                                res.header();
                                res.json({
                                    "results":
                                        {"status": true,
                                            "token" : token,
                                            "user" : results[0],
                                            "msg" : "Berhasil Login"
                                        }
                                });
                                res.end();
                            }
                            else{
                                res.json({
                                    "results":
                                        {"status": false,"msg" : 'Could not create token'},
                                });
                                res.end();
                            }
    
                        }
                    });
                    }else{
                        console.log(res2[0].id_perusahaan)
                        res.json({
                            "results":
                                {"status": false, "msg" : 'Maaf User Tidak Di Temukan'}
                        }); 
                        res.end();
                    }
                })
            }else if(results[0].status == "03"){ 
                console.log(results[0].id)
                var secret2 = 'WOI';
                var now = Math.floor(Date.now() / 1000),
                    iat = (now - 10),
                    expiresIn = 3600,
                    expr = (now + expiresIn),
                    notBefore = (now - 10),
                    jwtId = Math.random().toString(36).substring(7);
                var payload = {
                    iat: iat,
                    jwtid : jwtId,
                    audience : 'TEST',
                    id : results[0].id,
                    status : results[0].status
                };
    
                jwt.sign(payload, secret2, { algorithm: 'HS256', expiresIn : expiresIn}, function(err, token) {
                    if(err){
                        res.json({
                            "results":
                                {
                                    "status": false,
                                    "msg" : 'Error occurred while generating token'
                                }
                        });
                    } else {
                        if(token != false){
                            console.log(token)
                            res.header();
                            res.json({
                                "results":
                                    {"status": true,
                                        "token" : token,
                                        "user" : results[0],
                                        "msg" : "Berhasil Login"
                                    }
                            });
                            res.end();
                        }
                        else{
                            res.json({
                                "results":
                                    {"status": false,"msg" : 'Could not create token'},
                            });
                            res.end();
                        }
    
                    }
                });
            }
            else{
                res.json({
                    "results":
                        {"status": false, "msg" : 'Maaf User Tidak Di Temukan'}
                });
                res.end();
            }
        }else{
            res.json({
                "results":
                    {"status": false, "msg" : 'Maaf User Tidak Di Temukan'}
            });
            res.end();
        } 
    });
};
