const router = require('express').Router()
var jwt = require('jsonwebtoken');
const fs = require('fs')
var btoa = require('btoa')
var aesjs = require('aes-js')
const uploadSetting = require('./uploadsetting')
const fields = uploadSetting.upload.fields([
    {
        name: 'logo',
        maxCount: 1
    } 
])
var jwtdecode = require('jwt-decode')

router.get('/viewkuisioner', async (req, res) => {

    var sql = "SELECT * FROM pertanyaan_perushaan";

    db.query(sql, function (err, results) {
        if (results != "") {
            res.header();
            res.json({
                "results":
                {
                    "status": true,
                    "data": results,
                    "msg": "Berhasil Memuat"
                }
            });
            res.end();
        }
        else if (results == "") {
            res.json({
                "results":
                    { "status": false, "msg": 'Maaf Data Tidak Di Temukan' }
            });
            res.end();
        }
    });
})

router.post('/viewkuisionergroup', async (req, res) => {
    var category = req.body.category

    var sql = "SELECT id, value FROM indikator WHERE category = '"+category+"'";
    console.log(sql)
    db.query(sql, function (err, results) {
        if (results != "") {
            res.header();
            res.json({
                "results":
                {
                    "status": true,
                    "data": results,
                    "msg": "Berhasil Memuat"
                }
            });
            res.end();
        }
        else if (results == "") {
            res.json({
                "results":
                    { "status": false, "msg": 'Maaf Data Tidak Di Temukan' }
            });
            res.end();
        }
    });
})

router.post('/selectkuisioner', async (req, res) => {
    var id_perusahaan = req.body.id_perusahaan;
    var no = req.body.no;

    var sql = "SELECT jawaban FROM kuisioner_perusahaan WHERE id_perusahaan='" + id_perusahaan + "' AND no= '"+no+"'";
    console.log(sql)
    db.query(sql, function (err, results) {
        if (results != "") {
            res.header();
            res.json({
                "results":
                {
                    "status": true,
                    "data": results,
                    "msg": "Berhasil Memuat"
                }
            });
            res.end();
        }
        else if (results == "") {
            res.json({
                "results":
                    { "status": false, "msg": 'Maaf Data Tidak Di Temukan' }
            });
            res.end();
        }
    });
})

router.post('/insert', fields,async (req, res) => {
    let logo = req.files['logo']
    var id_perusahaan = req.body.id_perusahaan;
    var nama = req.body.nama;
    var pemilik = req.body.pemilik;
    var provinsi = req.body.provinsi;
    var email = req.body.email;
    var alamat = req.body.alamat;
    var kota = req.body.kota;
    var web = req.body.web;
    var contact = req.body.contact;
    var logo1 = logo[0].filename;
    var sql = "INSERT INTO `perusahaan`(`id_perusahaan`, `nama`, `pemilik`, `provinsi`, `email`, `alamat`, `kota`, `web`, `contact`, `logo`) VALUES ('" + id_perusahaan + "','" + nama + "','" + pemilik + "','" + provinsi + "','" + email + "','" + alamat + "','" + kota + "','" + web + "','" + contact + "','" + logo1 + "')";

    var query = db.query(sql, function (err, result) {
        if (result) {
            console.log(logo)
            res.json({
                "results":
                    { "status": true, "msg": 'Data has been added' },
                "data": {
                    "id_perusahaan": id_perusahaan,
                    "logo": logo
                }
            });
            res.end();
        } else {
            res.json({
                "results":
                    { "status": false, "msg": 'Gagal input data Alumni' }
            });
            res.end();
        }
    })
    console.log(req.files)
})//tidak dipakai hanya untuk uji coba

router.post('/insertkuisioner', async (req, res) => {
    var token1 = req.header("x-access-token")
    var id_perusahaan = req.body.id_perusahaan;
    var no = req.body.no;
    var jawaban = req.body.jawaban;

    if (token1 == '') {
        console.log('xxxx')
        res.json({
            "results":
            {
                "status": false,
                "msg": 'Unauthorized User'
            }
        })
    } else {
        var token2 = token1.slice(9)
        jwt.verify(token1, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token1)
                if (user.profile.id_perusahaan == id_perusahaan) {
                    var sql6 = "SELECT * FROM login WHERE id='" + id_perusahaan + "'"
                    db.query(sql6, function (err, stat) {
                        if (stat != '') {
                            if (stat[0].status == "02") {
                                var sql5 = "SELECT * FROM `perusahaan` WHERE `id_perusahaan`='" + id_perusahaan + "'";

                                db.query(sql5, function (err, results) {
                                    if (results != "") {
                                        var sql = "INSERT INTO `kuisioner_perusahaan`(`id_perusahaan`, `no`, `jawaban`) VALUES ('" + id_perusahaan + "','" + no + "','" + jawaban + "')";
                                        db.query(sql, function (err, result) {
                                            console.log(sql)
                                            if (result) {
                                                var sql2 = "SELECT * FROM perusahaan WHERE id_perusahaan = '" + id_perusahaan + "'";
                                                var query2 = db.query(sql2, function (err, res2) {
                                                    if (res2) {
                                                        var secret1 = 'WOI';
                                                        var now1 = Math.floor(Date.now() / 1000),
                                                            iat1 = (now1 - 10),
                                                            expiresIn1 = 3600,
                                                            expr = (now1 + expiresIn1),
                                                            notBefore = (now1 - 10),
                                                            jwtId = Math.random().toString(36).substring(7);
                                                        var payload = {
                                                            iat: iat1,
                                                            jwtid: jwtId,
                                                            audience: 'TEST',
                                                            profile: {
                                                                id_perusahaan: res2[0].id_perusahaan,
                                                                status: results[0].status,
                                                                nama: res2[0].nama,
                                                                pemilik: res2[0].pemilik,
                                                                provinsi: res2[0].provinsi,
                                                                email: res2[0].email,
                                                                alamat: res2[0].alamat,
                                                                kota: res2[0].kota,
                                                                web: res2[0].web,
                                                                contact: res2[0].contact,
                                                                logo: res2[0].logo
                                                            }
                                                        };
                                                        jwt.sign(payload, secret1, { algorithm: 'HS256', expiresIn: expiresIn1 }, function (err, token) {
                                                            if (err) {
                                                                res.json({
                                                                    "results":
                                                                    {
                                                                        "status": false,
                                                                        "msg": 'Error occurred while generating token'
                                                                    }
                                                                });
                                                            } else {
                                                                console.log(token)
                                                                if (token != false) {
                                                                    res.header();
                                                                    res.json({
                                                                        "results":
                                                                        {
                                                                            "status": true,
                                                                            "token": token,
                                                                            "msg": "Update Profile Success"
                                                                        }
                                                                    });
                                                                    res.end();
                                                                }
                                                                else {
                                                                    res.json({
                                                                        "results":
                                                                            { "status": false, "msg": 'Could not create token' },
                                                                    });
                                                                    res.end();
                                                                }

                                                            }
                                                        })
                                                    } else {
                                                        console.log(res2[0].id_perusahaan)
                                                        res.json({
                                                            "results":
                                                                { "status": false, "msg": 'Maaf User Tidak Di Temukan' }
                                                        });
                                                        res.end();
                                                    }
                                                })
                                            } else {
                                                res.json({
                                                    "results":
                                                        { "status": false, "msg": 'Data edit error' }
                                                });
                                                res.end();
                                            }
                                        })
                                    } else {
                                        res.json({
                                            "results": { "status": false, "msg": 'User cannot be found' }
                                        })
                                        res.end()
                                    }
                                })
                            } else {
                                res.json({
                                    "results":
                                    {
                                        "status": false,
                                        "msg": 'Unauthorized User'
                                    }
                                });
                            }
                        } else {
                            res.json({
                                "results":
                                {
                                    "status": false,
                                    "msg": 'Unauthorized User'
                                }
                            });
                        }
                    })
                } else {
                    res.json({
                        "results":
                        {
                            "status": false,
                            "msg": 'Unauthorized User'
                        }
                    });
                }
            } else {
                res.json({
                    "results": {
                        "status": false,
                        "msg": "Token not valid"
                    }
                })
            }
        })
    }
})

router.post('/update', async (req, res) => {
fields(req,res, function(err){
    if(err){
        res.json({"results":{"status": false, "msg": "Error File"}})
    }else{
        let logo = req.files['logo']
        var token1 = req.header("x-access-token")
        var id_perusahaan = req.body.id_perusahaan;
        var nama = req.body.nama;
        var pemilik = req.body.pemilik;
        var provinsi = req.body.provinsi;
        var email = req.body.email;
        var alamat = req.body.alamat;
        var kota = req.body.kota;
        var web = req.body.web;
        var path = './static/'
        var contact = req.body.contact;
        var logo1 = logo[0].filename;
        if (token1 =='') {
            console.log('xxxx')
            res.json({
                "results":
                {
                    "status": false,
                    "msg": 'Unauthorized User'
                }
            })
        } else {
            var token2 = token1.slice(9)
            jwt.verify(token1, 'WOI', function (err, ress) {
                if (ress) {
                    var user = jwtdecode(token1)
                    if (user.profile.id_perusahaan == id_perusahaan) {
                        var sql6 = "SELECT * FROM login WHERE id='" + id_perusahaan + "'"
                        db.query(sql6, function (err, stat) {
                            if (stat != '') {
                                if (stat[0].status == "02") {
                                    var sql5 = "SELECT * FROM `perusahaan` WHERE `id_perusahaan`='" + id_perusahaan + "'"
                                    db.query(sql5, function (err, res5) {
                                        if (res5) {
                                            if (res5[0].logo == '') {
                                                var sql = "UPDATE `perusahaan` SET `nama`='" + nama + "',`pemilik`='" + pemilik + "',`provinsi`='" + provinsi + "',`email`='" + email + "',`alamat`='" + alamat + "',`kota`='" + kota + "',`web`='" + web + "',`contact`='" + contact + "',`logo`='" + logo1 + "' WHERE id_perusahaan='" + id_perusahaan + "'"
                                                console.log(sql)
                                                db.query(sql, function (err, ress) {
                                                    if (ress) {
                                                        var sql2 = "SELECT * FROM perusahaan WHERE id_perusahaan = '" + id_perusahaan + "'";
                                                        var query2 = db.query(sql2, function (err, res2) {
                                                            if (res2) {
                                                                var secret1 = 'WOI';
                                                                var now1 = Math.floor(Date.now() / 1000),
                                                                    iat1 = (now1 - 10),
                                                                    expiresIn1 = 3600,
                                                                    expr = (now1 + expiresIn1),
                                                                    notBefore = (now1 - 10),
                                                                    jwtId = Math.random().toString(36).substring(7);
                                                                var payload = {
                                                                    iat: iat1,
                                                                    jwtid: jwtId,
                                                                    audience: 'TEST',
                                                                    profile: {
                                                                        id_perusahaan: res2[0].id_perusahaan,
                                                                        status: results[0].status,
                                                                        nama: res2[0].nama,
                                                                        pemilik: res2[0].pemilik,
                                                                        provinsi: res2[0].provinsi,
                                                                        email: res2[0].email,
                                                                        alamat: res2[0].alamat,
                                                                        kota: res2[0].kota,
                                                                        web: res2[0].web,
                                                                        contact: res2[0].contact,
                                                                        logo: res2[0].logo
                                                                    }
                                                                };
                                                                jwt.sign(payload, secret1, { algorithm: 'HS256', expiresIn: expiresIn1 }, function (err, token) {
                                                                    if (err) {
                                                                        res.json({
                                                                            "results":
                                                                            {
                                                                                "status": false,
                                                                                "msg": 'Error occurred while generating token'
                                                                            }
                                                                        });
                                                                    } else {
                                                                        console.log(token)
                                                                        if (token != false) {
                                                                            res.header();
                                                                            res.json({
                                                                                "results":
                                                                                {
                                                                                    "status": true,
                                                                                    "token": token,
                                                                                    "msg": "Update Profile Success"
                                                                                }
                                                                            });
                                                                            res.end();
                                                                        }
                                                                        else {
                                                                            res.json({
                                                                                "results":
                                                                                    { "status": false, "msg": 'Could not create token' },
                                                                            });
                                                                            res.end();
                                                                        }
    
                                                                    }
                                                                });
                                                            } else {
                                                                console.log(res2[0].id_perusahaan)
                                                                res.json({
                                                                    "results":
                                                                        { "status": false, "msg": 'Maaf User Tidak Di Temukan' }
                                                                });
                                                                res.end();
                                                            }
                                                        })
                                                    } else {
                                                        res.json({
                                                            "results":
                                                                { "status": false, "msg": 'Edit data failed' }
                                                        });
                                                        res.end();
                                                    }
                                                })
                                            } else {
                                                fs.unlink(path + res5[0].logo, (err1) => {
                                                    if (err1) {
                                                        res.json({
                                                            "results": { "status": false, "msg": 'Failed to Deleted logo' }
                                                        })
                                                        res.end()
                                                    } else {
                                                        var sql = "UPDATE `perusahaan` SET `nama`='" + nama + "',`pemilik`='" + pemilik + "',`provinsi`='" + provinsi + "',`email`='" + email + "',`alamat`='" + alamat + "',`kota`='" + kota + "',`web`='" + web + "',`contact`='" + contact + "',`logo`='" + logo1 + "' WHERE id_perusahaan='" + id_perusahaan + "'"
                                                        console.log(sql)
                                                        db.query(sql, function (err, ress) {
                                                            if (ress) {
                                                                var sql2 = "SELECT * FROM perusahaan WHERE id_perusahaan = '" + id_perusahaan + "'";
                                                                var query2 = db.query(sql2, function (err, res2) {
                                                                    if (res2) {
                                                                        var secret1 = 'WOI';
                                                                        var now1 = Math.floor(Date.now() / 1000),
                                                                            iat1 = (now1 - 10),
                                                                            expiresIn1 = 3600,
                                                                            expr = (now1 + expiresIn1),
                                                                            notBefore = (now1 - 10),
                                                                            jwtId = Math.random().toString(36).substring(7);
                                                                        var payload = {
                                                                            iat: iat1,
                                                                            jwtid: jwtId,
                                                                            audience: 'TEST',
                                                                            profile: {
                                                                                id_perusahaan: res2[0].id_perusahaan,
                                                                                status: stat[0].status,
                                                                                nama: res2[0].nama,
                                                                                pemilik: res2[0].pemilik,
                                                                                provinsi: res2[0].provinsi,
                                                                                email: res2[0].email,
                                                                                alamat: res2[0].alamat,
                                                                                kota: res2[0].kota,
                                                                                web: res2[0].web,
                                                                                contact: res2[0].contact,
                                                                                logo: res2[0].logo
                                                                            }
                                                                        };
                                                                        jwt.sign(payload, secret1, { algorithm: 'HS256', expiresIn: expiresIn1 }, function (err, token) {
                                                                            if (err) {
                                                                                res.json({
                                                                                    "results":
                                                                                    {
                                                                                        "status": false,
                                                                                        "msg": 'Error occurred while generating token'
                                                                                    }
                                                                                });
                                                                            } else {
                                                                                console.log(token)
                                                                                if (token != false) {
                                                                                    res.header();
                                                                                    res.json({
                                                                                        "results":
                                                                                        {
                                                                                            "status": true,
                                                                                            "token": token,
                                                                                            "msg": "Update Profile Success"
                                                                                        }
                                                                                    });
                                                                                    res.end();
                                                                                }
                                                                                else {
                                                                                    res.json({
                                                                                        "results":
                                                                                            { "status": false, "msg": 'Could not create token' },
                                                                                    });
                                                                                    res.end();
                                                                                }
    
                                                                            }
                                                                        });
                                                                    } else {
                                                                        console.log(res2[0].id_perusahaan)
                                                                        res.json({
                                                                            "results":
                                                                                { "status": false, "msg": 'Maaf User Tidak Di Temukan' }
                                                                        });
                                                                        res.end();
                                                                    }
                                                                })
                                                            } else {
                                                                res.json({
                                                                    "results":
                                                                        { "status": false, "msg": 'Edit data failed' }
                                                                });
                                                                res.end();
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        } else {
                                            fs.unlink(path + logo1, (err1) => {
                                                if (err1) {
                                                    res.json({
                                                        "results": { "status": false, "msg": 'Failed to Deleted logo' }
                                                    })
                                                    res.end()
                                                } else {
                                                    res.json({
                                                        "results": { "status": true, "msg": 'can not find file' }
                                                    })
                                                    res.end()
                                                }
                                            })
                                        }
                                    })
                                } else {
                                    fs.unlink(path + logo1, (err1) => {
                                    if (err1) {
                                        res.json({
                                            "results": { "status": false, "msg": 'Failed to Deleted logo' }
                                        })
                                        res.end()
                                    } else {
                                        console.log('x')
                                        res.json({
                                            "results":
                                            {
                                                "status": false,
                                                "msg": 'Unauthorized User'
                                            }
                                        });
                                        res.end()
                                    }
                                })
                                }
                            } else {
                                fs.unlink(path + logo1, (err1) => {
                                    if (err1) {
                                        res.json({
                                            "results": { "status": false, "msg": 'Failed to Deleted logo' }
                                        })
                                        res.end()
                                    } else {
                                        console.log('x')
                                        res.json({
                                            "results":
                                            {
                                                "status": false,
                                                "msg": 'Unauthorized User'
                                            }
                                        });
                                        res.end()
                                    }
                                })
                            }
                        })
                    } else {
                        fs.unlink(path + logo1, (err1) => {
                            if (err1) {
                                res.json({
                                    "results": { "status": false, "msg": 'Failed to Deleted logo' }
                                })
                                res.end()
                            } else {
                                console.log('x')
                                res.json({
                                    "results":
                                    {
                                        "status": false,
                                        "msg": 'Unauthorized User'
                                    }
                                });
                                res.end()
                            }
                        })
                    }
                } else {
                    fs.unlink(path + logo1, (err1) => {
                        if (err1) {
                            res.json({
                                "results": { "status": false, "msg": 'Failed to Deleted logo' }
                            })
                            res.end()
                        } else {
                            console.log('x')
                            res.json({
                                "results":
                                {
                                    "status": false,
                                    "msg": 'token not valid'
                                }
                            });
                            res.end()
                        }
                    })
                }
            })
        }
    }
})
})

router.post('/updatekuisioner', async(req,res) =>{
    var id_perusahaan = req.body.id_perusahaan;
    var no = req.body.no;
    var jawaban = req.body.jawaban;
    var token1 = req.header("x-access-token")
    
    if (token1 == '') {
        console.log('xxxx')
        res.json({
            "results":
            {
                "status": false,
                "msg": 'Unauthorized User'
            }
        })
    } else {
        var token2 = token1.slice(9)
        jwt.verify(token1, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token1)
                if (user.profile.id_perusahaan == id_perusahaan) {
                    var sql6 = "SELECT * FROM login WHERE id='" + id_perusahaan + "'"
                    db.query(sql6, function (err, stat) {
                        if (stat != '') {
                            if (stat[0].status == "02") {
                                var sql5 = "SELECT * FROM `perusahaan` WHERE `id_perusahaan`='" + id_perusahaan + "'" 
                                db.query(sql5, function (err, res5) {
                                    if (res5 != '') {
                                        var sql = "UPDATE `kuisioner_perusahaan` SET `jawaban`='" + jawaban + "' WHERE `id_perusahaan`='" + id_perusahaan + "' AND no = '"+no+"'";
                                        console.log(sql)
                                        var query = db.query(sql, function (err, result) {
                                            if (result) {
                                                var sql2 = "SELECT * FROM perusahaan WHERE id_perusahaan = '" + id_perusahaan + "'";
                                                var query2 = db.query(sql2, function (err, res2) {
                                                    if (res2) {
                                                        var secret1 = 'WOI';
                                                        var now1 = Math.floor(Date.now() / 1000),
                                                            iat1 = (now1 - 10),
                                                            expiresIn1 = 3600,
                                                            expr = (now1 + expiresIn1),
                                                            notBefore = (now1 - 10),
                                                            jwtId = Math.random().toString(36).substring(7);
                                                        var payload = {
                                                            iat: iat1,
                                                            jwtid: jwtId,
                                                            audience: 'TEST',
                                                            profile: {
                                                                id_perusahaan: res2[0].id_perusahaan,
                                                                nama: res2[0].nama,
                                                                pemilik: res2[0].pemilik,
                                                                provinsi: res2[0].provinsi,
                                                                email: res2[0].email,
                                                                alamat: res2[0].alamat,
                                                                kota: res2[0].kota,
                                                                web: res2[0].web,
                                                                contact: res2[0].contact,
                                                                logo: res2[0].logo
                                                            }
                                                        };
                                                        jwt.sign(payload, secret1, { algorithm: 'HS256', expiresIn: expiresIn1 }, function (err, token) {
                                                            if (err) {
                                                                res.json({
                                                                    "results":
                                                                    {
                                                                        "status": false,
                                                                        "msg": 'Error occurred while generating token'
                                                                    }
                                                                });
                                                            } else {
                                                                console.log(token)
                                                                if (token != false) {
                                                                    res.header();
                                                                    res.json({
                                                                        "results":
                                                                        {
                                                                            "status": true,
                                                                            "token": token,
                                                                            "msg": "Update Kuisioner Success"
                                                                        }
                                                                    });
                                                                    res.end();
                                                                }
                                                                else {
                                                                    res.json({
                                                                        "results":
                                                                            { "status": false, "msg": 'Could not create token' },
                                                                    });
                                                                    res.end();
                                                                }
    
                                                            }
                                                        });
                                                    } else {
                                                        console.log(res2[0].id_perusahaan)
                                                        res.json({
                                                            "results":
                                                                { "status": false, "msg": 'Maaf User Tidak Di Temukan' }
                                                        });
                                                        res.end();
                                                    }
                                                })
                                            } else {
                                                res.json({
                                                    "results":
                                                        { "status": false, "msg": 'Update Kuisioner Failed' }
                                                });
                                                res.end();
                                            }
                                        })
                                    } else {
                                        res.json({
                                            "results":
                                                { "status": false, "msg": 'User cannot be Found' }
                                        })
                                        res.end()
                                    }
                                })
                            } else {
                                res.json({
                                    "results":
                                    {
                                        "status": false,
                                        "msg": 'Unauthorized User'
                                    }
                                });
                            }
                        }
                        else {
                            res.json({
                                "results":
                                {
                                    "status": false,
                                    "msg": 'Unauthorized User'
                                }
                            });
                        }
                    })
                } else {
                    res.json({
                        "results":
                        {
                            "status": false,
                            "msg": 'Unauthorized User'
                        }
                    });
                }
            } else {
                res.json({
                    "results": {
                        "status": false,
                        "msg": "Token not valid"
                    }
                })
            }
        })
    }   
})//ubah

router.post('/editdataperusahaannologo', async (req, res) => {
    var token1 = req.header("x-access-token")
    var id_perusahaan = req.body.id_perusahaan;
    var nama = req.body.nama;
    var pemilik = req.body.pemilik;
    var provinsi = req.body.provinsi;
    var email = req.body.email;
    var alamat = req.body.alamat;
    var kota = req.body.kota;
    var web = req.body.web;
    var contact = req.body.contact;
    if (token1 == '') {
        console.log('xxxx')
        res.json({
            "results":
            {
                "status": false,
                "msg": 'Unauthorized User'
            }
        })
    } else {
        var token2 = token1.slice(9)
        jwt.verify(token1, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token1)
                if (user.profile.id_perusahaan == id_perusahaan) {
                    var sql6 = "SELECT * FROM login WHERE id='" + id_perusahaan + "'"
                    db.query(sql6, function (err, stat) {
                        if (stat != '') {
                            if (stat[0].status == "02") {
                                var sql5 = "SELECT * FROM `perusahaan` WHERE `id_perusahaan`='" + id_perusahaan + "'";

                                db.query(sql5, function (err, results) {
                                    if (results != "") {
                                        var sql = "UPDATE `perusahaan` SET `nama`='" + nama + "',`pemilik`='" + pemilik + "',`provinsi`='" + provinsi + "',`email`='" + email + "',`alamat`='" + alamat + "',`kota`='" + kota + "',`web`='" + web + "',`contact`='" + contact + "' WHERE id_perusahaan='" + id_perusahaan + "'";
                                        db.query(sql, function (err, result) {
                                            console.log(sql)
                                            if (result) {
                                                var sql2 = "SELECT * FROM perusahaan WHERE id_perusahaan = '" + id_perusahaan + "'";
                                                var query2 = db.query(sql2, function (err, res2) {
                                                    if (res2) {
                                                        var secret1 = 'WOI';
                                                        var now1 = Math.floor(Date.now() / 1000),
                                                            iat1 = (now1 - 10),
                                                            expiresIn1 = 3600,
                                                            expr = (now1 + expiresIn1),
                                                            notBefore = (now1 - 10),
                                                            jwtId = Math.random().toString(36).substring(7);
                                                        var payload = {
                                                            iat: iat1,
                                                            jwtid: jwtId,
                                                            audience: 'TEST',
                                                            profile: {
                                                                id_perusahaan: res2[0].id_perusahaan,
                                                                status: results[0].status,
                                                                nama: res2[0].nama,
                                                                pemilik: res2[0].pemilik,
                                                                provinsi: res2[0].provinsi,
                                                                email: res2[0].email,
                                                                alamat: res2[0].alamat,
                                                                kota: res2[0].kota,
                                                                web: res2[0].web,
                                                                contact: res2[0].contact,
                                                                logo: res2[0].logo
                                                            }
                                                        };
                                                        jwt.sign(payload, secret1, { algorithm: 'HS256', expiresIn: expiresIn1 }, function (err, token) {
                                                            if (err) {
                                                                res.json({
                                                                    "results":
                                                                    {
                                                                        "status": false,
                                                                        "msg": 'Error occurred while generating token'
                                                                    }
                                                                });
                                                            } else {
                                                                console.log(token)
                                                                if (token != false) {
                                                                    res.header();
                                                                    res.json({
                                                                        "results":
                                                                        {
                                                                            "status": true,
                                                                            "token": token,
                                                                            "msg": "Update Profile Success"
                                                                        }
                                                                    });
                                                                    res.end();
                                                                }
                                                                else {
                                                                    res.json({
                                                                        "results":
                                                                            { "status": false, "msg": 'Could not create token' },
                                                                    });
                                                                    res.end();
                                                                }

                                                            }
                                                        })
                                                    } else {
                                                        console.log(res2[0].id_perusahaan)
                                                        res.json({
                                                            "results":
                                                                { "status": false, "msg": 'Maaf User Tidak Di Temukan' }
                                                        });
                                                        res.end();
                                                    }
                                                })
                                            } else {
                                                res.json({
                                                    "results":
                                                        { "status": false, "msg": 'Data edit error' }
                                                });
                                                res.end();
                                            }
                                        })
                                    } else {
                                        res.json({
                                            "results": { "status": false, "msg": 'User cannot be found' }
                                        })
                                        res.end()
                                    }
                                })
                            } else {
                                res.json({
                                    "results":
                                    {
                                        "status": false,
                                        "msg": 'Unauthorized User'
                                    }
                                });
                            }
                        } else {
                            res.json({
                                "results":
                                {
                                    "status": false,
                                    "msg": 'Unauthorized User'
                                }
                            });
                        }
                    })
                } else {
                    res.json({
                        "results":
                        {
                            "status": false,
                            "msg": 'Unauthorized User'
                        }
                    });
                }
            } else {
                res.json({
                    "results": {
                        "status": false,
                        "msg": "Token not valid"
                    }
                })
            }
        })
    }
})

router.post('/updatepass', async(req,res) =>{
    var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ]
    var id_perusahaan= req.body.id_perusahaan;
    var pass= req.body.pass;
    var b64 = btoa(pass)
    var passbaru = req.body.passbaru
    var b65 = btoa(passbaru)
    var textBytes1 = aesjs.utils.utf8.toBytes(b65)
    var textBytes = aesjs.utils.utf8.toBytes(b64)
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var aesCtr1 = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);
    var encryptedBytes1 = aesCtr1.encrypt(textBytes1);
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    var encryptedHex1 = aesjs.utils.hex.fromBytes(encryptedBytes1);
    var token1 = req.header("x-access-token")
    console.log(encryptedHex)
    console.log(encryptedHex1)
    if (token1=='') {
        console.log('xxxx')
        res.json({
            "results":
            {
                "status": false,
                "msg": 'Unauthorized User'
            }
        })
    } else {
        var token2 = token1.slice(9)
        jwt.verify(token1, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token1)
                if (user.profile.id_perusahaan == id_perusahaan) {
                    var sql = "SELECT * FROM `login` WHERE `password`='"+encryptedHex+"' and id = '"+id_perusahaan+"'";
    
                    var query1 = db.query(sql, function (err, result){
                        if(result != ''){
                            var sql1 = "UPDATE `login` SET password='" + encryptedHex1 +"' WHERE id= '" + id_perusahaan + "'";
                
                            var query = db.query(sql1, function (err, results) { 
                               console.log(encryptedHex1)
                               // console.log(decryptedText)
                               if (results) {
                                   console.log(sql1)
                                   res.json({
                                       "results":
                                       {"status": true, "msg": 'Update password success'}
                                   });
                                   res.end();
                               } else {
                                   res.json({
                                       "results":
                                           { "status": false, "msg": 'Update password error' }
                                   });
                                   res.end();
                               }
                           });
                        }else{
                            console.log(sql)
                            res.json({
                                "results":
                                    { "status": false, "msg": 'User cannot found' }
                            });
                            res.end();
                        } 
                    })
                } else {
                    res.json({
                        "results":
                        {
                            "status": false,
                            "msg": 'Unauthorized User'
                        }
                    })
                }
            } else {
                res.json({
                    "results": {
                        "status": false,
                        "msg": "Token not valid"
                    }
                })
            }
        })
    }
})

router.get('/selectone', async(req,res) =>{
    var id = req.param("id");

    var sql = "SELECT * FROM perusahaan WHERE id_perusahaan='" + id + "'";

    db.query(sql, function (err, results) {
        if (results != "") {
            res.header();
            res.json({
                "results":
                {
                    "status": true,
                    "data": results,
                    "msg": "Berhasil Memuat"
                }
            });
            res.end();
        }
        else if (results == "") {
            res.json({
                "results":
                    { "status": false, "msg": 'Maaf Data Tidak Di Temukan' }
            });
            res.end();
        }
    });
})

module.exports = router