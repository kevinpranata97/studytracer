const router = require('express').Router()
const fs = require('fs')
const uploadSetting = require('./uploadsetting')
const fields = uploadSetting.upload.fields([
    { 
        name: 'logo',
        maxCount: 1
    }
])
const fields1 =uploadSetting.upload.fields([
    {
        name: 'picture',
        maxCount : 1
    }
]) 
var jwt = require('jsonwebtoken')
var btoa = require('btoa')
var atob = require('atob')
var aesjs = require('aes-js')
var jwtdecode = require('jwt-decode')

router.get('/viewalldataalumni', async (req, res) => {
    var token1 = req.header('x-access-token') 
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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token2)
                if (user.status == "03") {
                    var sql = "SELECT `npm`, `nama`, CAST(`tanggal_lulus` AS char) AS tanggal_lulus, `ipk`, `jurusan`,`keterangan`,`picture` FROM `alumni`";
    
                    db.query(sql, function (err, results) {
                        if (results != "") {
    
                            res.header();
                            res.json({
                                "results":
                                {
                                    "status": true,
                                    "data": results,
                                    "msg": "Data has been included"
                                }
                            });
                            res.end();
                        }
                        else if (results == "") {
                            res.json({
                                "results":
                                    { "status": false, "msg": 'Data can not be found' }
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

router.get('/viewallkuisalumni', async (req, res) => {
    var token1 = req.header('x-access-token') 
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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token2)
                if (user.status == "03") {
                    var sql = "SELECT * FROM pertanyaaan_alumni";
    
                    db.query(sql, function (err, results) {
                        if (results != "") {
                            console.log(sql)
                            res.json({
                                "results":
                                {
                                    "status": true,
                                    "data": results,
                                    "msg": "Data has been included"
                                }
                            });
                            res.end();
                        }
                        else if (results == "") {
                            res.json({
                                "results":
                                    { "status": false, "msg": 'Data can not be found' }
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

router.get('/viewallindikator', async (req, res) => {
    var token1 = req.header('x-access-token') 
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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token2)
                if (user.status == "03") {
                    var sql = "SELECT * FROM `indikator`";
    
                    db.query(sql, function (err, results) {
                        if (results != "") {
    
                            res.header();
                            res.json({
                                "results":
                                {
                                    "status": true,
                                    "data": results,
                                    "msg": "Data has been included"
                                }
                            });
                            res.end();
                        }
                        else if (results == "") {
                            res.json({
                                "results":
                                    { "status": false, "msg": 'Data can not be found' }
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

router.get('/dropdownkuisalumni', async (req, res) => {
    var token1 = req.header('x-access-token') 
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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token2)
                if (user.status == "03") {
                    var sql = "SELECT text FROM `pertanyaaan_alumni`";
    
                    db.query(sql, function (err, results) {
                        if (results != "") {
    
                            res.header();
                            res.json({
                                "results":
                                {
                                    "status": true,
                                    "data": results,
                                    "msg": "Data has been included"
                                }
                            });
                            res.end();
                        }
                        else if (results == "") {
                            res.json({
                                "results":
                                    { "status": false, "msg": 'Data can not be found' }
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

router.get('/dropdownkuisperusahaan', async (req, res) => {
    var token1 = req.header('x-access-token') 
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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token2)
                if (user.status == "03") {
                    var sql = "SELECT text FROM `pertanyaan_perushaan`";
    
                    db.query(sql, function (err, results) {
                        if (results != "") {
    
                            res.header();
                            res.json({
                                "results":
                                {
                                    "status": true,
                                    "data": results,
                                    "msg": "Data has been included"
                                }
                            });
                            res.end();
                        }
                        else if (results == "") {
                            res.json({
                                "results":
                                    { "status": false, "msg": 'Data can not be found' }
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

router.get('/viewalldataperusahaan', async (req,res) =>{
    var token1 = req.header('x-access-token') 
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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token2)
                if (user.status == "03") {
                    var sql = "SELECT * FROM perusahaan";
    
                    db.query(sql, function (err, results) {
                        if (results != "") {
                            res.json({
                                "results":
                                {
                                    "status": true,
                                    "data": results,
                                    "msg": "Data has been included"
                                }
                            });
                            res.end();
                        }
                        else if (results == "") {
                            res.json({
                                "results":
                                    { "status": false, "msg": 'Data can not be found' }
                            });
                            res.end();
                        }
                    });
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

router.get('/viewallkuisperusahaan', async (req, res) => {
    var token1 = req.header('x-access-token') 
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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token2)
                if (user.status == "03") {
                    var sql = "SELECT * FROM pertanyaan_perushaan";
    
                    db.query(sql, function (err, results) {
                        if (results != "") {
    
                            res.header();
                            res.json({
                                "results":
                                {
                                    "status": true,
                                    "data": results,
                                    "msg": "Data has been included"
                                }
                            });
                            res.end();
                        }
                        else if (results == "") {
                            res.json({
                                "results":
                                    { "status": false, "msg": 'Data can not be found' }
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

router.get('/kuisalumni', async (req, res) => {
    var token1 = req.header('x-access-token') 
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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token2)
                if (user.status == "03") {
                    var sql = "SELECT no, text FROM pertanyaaan_alumni";
    
                    db.query(sql, function (err, results) {
                        if (results != "") {
                            console.log(sql)
                            res.json({
                                "results":
                                {
                                    "status": true,
                                    "data": results,
                                    "msg": "Data has been included"
                                }
                            });
                            res.end();
                        }
                        else if (results == "") {
                            res.json({
                                "results":
                                    { "status": false, "msg": 'Data can not be found' }
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

router.get('/kuisaperusahaan', async (req, res) => {
    var token1 = req.header('x-access-token') 
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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token2)
                if (user.status == "03") {
                    var sql = "SELECT no, text FROM pertanyaan_perushaan";
    
                    db.query(sql, function (err, results) {
                        if (results != "") {
                            console.log(sql)
                            res.json({
                                "results":
                                {
                                    "status": true,
                                    "data": results,
                                    "msg": "Data has been included"
                                }
                            });
                            res.end();
                        }
                        else if (results == "") {
                            res.json({
                                "results":
                                    { "status": false, "msg": 'Data can not be found' }
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

router.post('/editdataalumni', async(req,res) =>{
    var npm = req.body.npm;
    var nama = req.body.nama;
    var tanggal_lulus = req.body.tanggal_lulus;
    var ipk = req.body.ipk;
    var jurusan = req.body.jurusan;
    var keterangan = req.body.keterangan;
    var token1 = req.header('x-access-token')
    console.log(req)
    console.log(token1)
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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token2)
                if (user.status == "03") {
                    var sql = "UPDATE `alumni` SET nama='" + nama + "',tanggal_lulus='" + tanggal_lulus + "',ipk='" + ipk + "',jurusan='" + jurusan + "',keterangan='" + keterangan + "' WHERE npm='" + npm + "'";
    
                    db.query(sql, function (err, result) {
                        console.log(sql)
                        if (result) {
                            res.json({ 
                                "results":
                                    { "status": true, "msg": 'Data has been added' },
                                "data": {
                                    "npm": npm,
                                    "nama": nama,
                                    "tanggal_lulus": tanggal_lulus,
                                    "ipk": ipk,
                                    "jurusan": jurusan,
                                    "keterangan": keterangan
                                }
                            });
                            res.end();
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
//tambah satu endpoint buat yang tidak pakai fields supaya tidak ada bug
router.post('/editdataperusahaannologo', async(req,res) =>{
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
    console.log(req)
    console.log(token1)
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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token2)
                if (user.status == "03") {
                    var sql = "UPDATE `perusahaan` SET `nama`='" + nama + "',`pemilik`='" + pemilik + "',`provinsi`='" + provinsi + "',`email`='" + email + "',`alamat`='" + alamat + "',`kota`='" + kota + "',`web`='" + web + "',`contact`='" + contact + "' WHERE id_perusahaan='" + id_perusahaan + "'";
                    db.query(sql, function (err, result) {
                        console.log(sql)
                        if (result) {
                            res.json({
                                "results":
                                    { "status": true, "msg": 'Data has been editted' },
                            })
                            res.end()
                        } else {
                            res.json({
                                "results":
                                    { "status": false, "msg": 'Data edit error' }
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

router.post('/editalumnipic' , async (req,res) => {
   fields1(req,res, function(err){
    if (err) {
        res.json({ "results": { "status": false, "msg": "Error File" } })
    } else {
            let picture = req.files['picture']
            console.log(picture)
            var token1 = req.header("x-access-token")
            var picture1 = picture[0].filename;
            var npm = req.body.npm;
            var nama = req.body.nama;
            var tanggal_lulus = req.body.tanggal_lulus;
            var ipk = req.body.ipk;
            var jurusan = req.body.jurusan;
            var keterangan = req.body.keterangan;
            var path = './static/'
            var picture1 = picture[0].filename;
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
                jwt.verify(token2, 'WOI', function (err, ress){
                    if(ress){
                        var user = jwtdecode(token2)
                        if (user.status == "03") {
                            var sql5 = "SELECT * FROM `alumni` WHERE `npm`='" + npm + "'"
                            db.query(sql5, function (err, res5) {
                                if (res5 == '') {
                                    fs.unlink(path + picture1, (err) => {
                                        console.log(path + picture1)
                                        if (err) {
                                            res.json({
                                                "results": { "status": false, "msg": "failed to delete pic" }
                                            })
                                        } else {
                                            console.log('xx')
                                            res.json({
                                                "results": { "status": false, "msg": "User not found" }
                                            })
                                        }
                                    })
                                } else {
                                    if (res5[0].picture == '') {
                                        var sql = "UPDATE `alumni` SET nama='" + nama + "',tanggal_lulus='" + tanggal_lulus + "',ipk='" + ipk + "',jurusan='" + jurusan + "',keterangan='" + keterangan + "',picture='" + picture1 + "' WHERE npm='" + npm + "'"
                                        db.query(sql, function (err, ress) {
                                            if (ress) {
                                                console.log('a')
                                                res.json({
                                                    "results": { "status": true, "msg": "Data Updated" }
                                                })
                                            } else {
                                                console.log('x')
                                                res.json({
                                                    "results": { "status": false, "msg": "Failed updated" }
                                                })
                                            }
                                        })
                                    } else {
                                        fs.unlink(path + res5[0].picture, (err) => {
                                            console.log(path + res5[0].picture)
                                            if (err) {
                                                res.json({
                                                    "results": { "status": false, "msg": "Failed to Delete Logo" }
                                                })
                                            } else {
                                                var sql2 = "UPDATE `alumni` SET nama='" + nama + "',tanggal_lulus='" + tanggal_lulus + "',ipk='" + ipk + "',jurusan='" + jurusan + "',keterangan='" + keterangan + "',picture='" + picture1 + "' WHERE npm='" + npm + "'"
                                                db.query(sql2, function (err, ress1) {
                                                    if (ress1) {
                                                        console.log('aa')
                                                        res.json({
                                                            "results": { "status": true, "msg": "Data updated" }
                                                        })
                                                    } else {
                                                        console.log('xxx')
                                                        res.json({
                                                            "results": { "status": false, "msg": "Edit failed" }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                }
                            })
                        }else{
                            res.json({
                                "results":
                                {
                                    "status": false,
                                    "msg": 'Unauthorized User'
                                }
                            })
                        }
                    } else{
                        res.json({
                            "results": {
                                "status": false,
                                "msg": "Token not valid"
                            }
                        })
                    }
                })
            }
    }
   })
})


router.post('/editdataperusahaan', async (req, res) => {
    fields(req, res, function (err) {
        if (err) {
            res.json({ "results": { "status": false, "msg": "Error File" } })
        }
        else {
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
            console.log(logo)
            console.log(token1)
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
                jwt.verify(token2, 'WOI', function (err, ress) {
                    if (ress) {
                        var user = jwtdecode(token2)
                        if (user.status == "03") {
                            var sql5 = "SELECT * FROM `perusahaan` WHERE `id_perusahaan`='" + id_perusahaan + "'"
                            db.query(sql5, function (err, res5) {
                                if (res5 == '') {
                                    fs.unlink(path + logo1, (err) => {
                                        console.log(path + logo1)
                                        if (err) {
                                            res.json({
                                                "results": { "status": false, "msg": "failed to delete logo" }
                                            })
                                        } else {
                                            console.log('xx')
                                            res.json({
                                                "results": { "status": false, "msg": "User not found" }
                                            })
                                        }
                                    })
                                } else {
                                    if (res5[0].logo == '') {
                                        var sql = "UPDATE `perusahaan` SET `nama`='" + nama + "',`pemilik`='" + pemilik + "',`provinsi`='" + provinsi + "',`email`='" + email + "',`alamat`='" + alamat + "',`kota`='" + kota + "',`web`='" + web + "',`contact`='" + contact + "',`logo`='" + logo1 + "' WHERE id_perusahaan='" + id_perusahaan + "'"
                                        db.query(sql, function (err, ress) {
                                            if (ress) {
                                                console.log('a')
                                                res.json({
                                                    "results": { "status": true, "msg": "Data Updated" }
                                                })
                                            } else {
                                                console.log('x')
                                                res.json({
                                                    "results": { "status": false, "msg": "Failed updated" }
                                                })
                                            }
                                        })
                                    } else {
                                        fs.unlink(path + res5[0].logo, (err) => {
                                            console.log(path + res5[0].logo)
                                            if (err) {
                                                res.json({
                                                    "results": { "status": false, "msg": "Failed to Delete Logo" }
                                                })
                                            } else {
                                                var sql2 = "UPDATE `perusahaan` SET `nama`='" + nama + "',`pemilik`='" + pemilik + "',`provinsi`='" + provinsi + "',`email`='" + email + "',`alamat`='" + alamat + "',`kota`='" + kota + "',`web`='" + web + "',`contact`='" + contact + "',`logo`='" + logo1 + "' WHERE id_perusahaan='" + id_perusahaan + "'"
                                                db.query(sql2, function (err, ress1) {
                                                    if (ress1) {
                                                        console.log('aa')
                                                        res.json({
                                                            "results": { "status": true, "msg": "Data updated" }
                                                        })
                                                    } else {
                                                        console.log('xxx')
                                                        res.json({
                                                            "results": { "status": false, "msg": "Edit failed" }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
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
        }
    })
})

router.post('/editindikator', async (req, res) => {
    var id = req.body.id;
    var value = req.body.value;
    var category = req.body.category
    var token1 = req.header("x-access-token")
    console.log(token1)
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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token2)
                if (user.status == "03") {
                    var sql = "UPDATE `indikator` SET `value`='"+value+"',`category`='"+category+"' WHERE `id`='"+id+"'";

                    var query = db.query(sql, function (err, result) {
                        if (result) {
                            res.json({
                                "results":
                                    { "status": true, "msg": 'Data has been added' },
                                "data": {
                                    "no": id,
                                    "pertanyaan": value,
                                    "category": category
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
                    });
                } else {
                    console.log('x')
                    console.log(token2)
                    res.json({
                        "results":
                        {
                            "status": false,
                            "msg": 'Unauthorized User'
                        }
                    })
                }
            } else {
                console.log('a')
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

router.post('/editkuisioneralumni', async(req,res) =>{
    var no = req.body.no;
    var text = req.body.text;
    var category = req.body.category
    var token1 = req.header("x-access-token")
    console.log(req)
    console.log(token1)
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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token2)
                if (user.status == "03") {
                    var sql = "UPDATE `pertanyaaan_alumni` SET text='" + text + "',category='" + category + "' WHERE no='" + no + "'";
    
                    db.query(sql, function (err, result) {
                        console.log(sql)
                        if (result) {
                            res.json({ 
                                "results":
                                    { "status": true, "msg": 'Data has been editted' }
                            });
                            res.end();
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

router.post('/editkuisionerperusahaan', async(req,res) =>{
    var no = req.body.no;
    var text = req.body.text;
    var category = req.body.category
    var token1 = req.header("x-access-token")
    console.log(req)
    console.log(token1)
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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token2)
                if (user.status == "03") {
                    var sql = "UPDATE pertanyaan_perushaan SET text='" + text + "',category='" + category + "' WHERE no='" + no + "'";
                    console.log(sql)
                    db.query(sql, function (err, result) {
                        console.log(sql)
                        if (result) {
                            res.json({ 
                                "results":
                                    { "status": true, "msg": 'Data has been editted' }
                            });
                            res.end();
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

router.get('/selectonekuisioneralumni', async(req,res) =>{
    var npm = req.param("npm");

    var sql = "SELECT pertanyaaan_alumni.no, pertanyaaan_alumni.text, indikator.value FROM kuisioner_alumni JOIN indikator ON indikator.id = kuisioner_alumni.jawaban JOIN pertanyaaan_alumni ON kuisioner_alumni.no = pertanyaaan_alumni.no WHERE kuisioner_alumni.npm='" + npm + "' ORDER BY pertanyaaan_alumni.no ASC";

    db.query(sql, function (err, results) {
        if (results != "") { 
            console.log(sql)
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
            console.log(sql)
            res.json({
                "results":
                    { "status": false, "msg": 'Maaf Data Tidak Di Temukan' }
            });
            res.end();
        }
    });
})

router.get('/selectonekuisionerperusahaan', async(req,res) =>{
    var id_perusahaan = req.param("id_perusahaan");

    var sql = "SELECT pertanyaan_perushaan.no, pertanyaan_perushaan.text, indikator.value FROM kuisioner_perusahaan JOIN indikator ON indikator.id = kuisioner_perusahaan.jawaban JOIN pertanyaan_perushaan ON kuisioner_perusahaan.no = pertanyaan_perushaan.no WHERE kuisioner_perusahaan.id_perusahaan='"+id_perusahaan+"' ORDER BY pertanyaan_perushaan.no ASC";

    db.query(sql, function (err, results) {
        if (results != "") { 
            console.log(sql)
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
            console.log(sql)
            res.json({
                "results":
                    { "status": false, "msg": 'Maaf Data Tidak Di Temukan' }
            });
            res.end();
        }
    });
})

router.post('/deletealumni', async (req, res) => {
    var id = req.body.id;
    var token1 = req.header('x-access-token')
    console.log(token1)
    var path = './static/'

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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token2)
                if (user.status == "03") {
                    var sql2 = "DELETE FROM `login` WHERE `login`.`id`='" + id + "'"
                    db.query(sql2, function (err, ress2) {
                        if (ress2) {
                            var sql3 = "DELETE FROM `riwayat` WHERE `riwayat`.`npm`='" + id + "'"
                            db.query(sql3, function (err, ress3) {
                                if (ress3) {
                                    var sql4 = "DELETE FROM `kuisioner_alumni` WHERE `kuisioner_alumni`.`npm`='" + id + "'"
                                    db.query(sql4, function (err, ress4) {
                                        if (ress4) {
                                            var sql5 = "SELECT * FROM `alumni` WHERE `npm`='" + id + "'"
                                            db.query(sql5, function (err, ress5) {
                                                if (ress5) {
                                                    if (ress5[0].picture == '') {
                                                        var sql7 = "DELETE FROM `alumni` WHERE `alumni`.`npm`='" + id + "'"
                                                        db.query(sql7, function (err, ress7) {
                                                            if (ress7) {
                                                                res.json({
                                                                    "results": { "status": true, "msg": 'success' }
                                                                })
                                                                res.end()
                                                            } else {
                                                                res.json({
                                                                    "results":
                                                                        { "status": false, "msg": 'Data delete error' }
                                                                })
                                                                res.end()
                                                            }
                                                        })
                                                    } else {
                                                        fs.unlink(path + ress5[0].picture, (err) => {
                                                            if (err) {
                                                                res.json({
                                                                    "results": { "status": false, "msg": 'Failed to Deleted logo' }
                                                                })
                                                                res.end()
                                                            } else {
                                                                var sql6 = "DELETE FROM `kuisioner_alumni` WHERE `kuisioner_alumni`.`npm`='" + id + "'"
                                                                db.query(sql6, function (err, ress6) {
                                                                    if (ress6) {
                                                                        var sql7 = "DELETE FROM `alumni` WHERE `alumni`.`npm`='" + id + "'"
                                                                        db.query(sql7, function (err, ress7) {
                                                                            if (ress7) {
                                                                                res.json({
                                                                                    "results": { "status": true, "msg": 'success' }
                                                                                })
                                                                                res.end()
                                                                            } else {
                                                                                res.json({
                                                                                    "results":
                                                                                        { "status": false, "msg": 'Data delete error' }
                                                                                })
                                                                                res.end()
                                                                            }
                                                                        })
                                                                    } else {
                                                                        res.json({
                                                                            "results":
                                                                                { "status": false, "msg": 'Data delete error' }
                                                                        })
                                                                        res.end()
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                } else {
                                                    res.json({
                                                        "results":
                                                            { "status": false, "msg": 'Alumni not Found' }
                                                    })
                                                    res.end()
                                                }
                                            })
                                        } else {
                                            res.json({
                                                "results":
                                                    { "status": false, "msg": 'Data delete error' }
                                            })
                                            res.end()
                                        }
                                    })
                                } else {
                                    res.json({
                                        "results":
                                            { "status": false, "msg": 'Data delete error' }
                                    })
                                    res.end()
                                }
                            })
                        } else {
                            res.json({
                                "results":
                                    { "status": false, "msg": 'Data delete error' }
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

router.post('/deletekuisalumni', async (req, res) => {
var no = req.body.no
var token1 = req.header('x-access-token')
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
    jwt.verify(token2, 'WOI', function (err, ress) {
        if (ress) {
            var user = jwtdecode(token2)
            if (user.status == "03") {
                var sql2 = "DELETE FROM `pertanyaaan_alumni` WHERE `pertanyaaan_alumni`.`no`='" + no + "'"
                db.query(sql2, function (err, ress2) {
                    if (ress2) {
                        var sql3 = "DELETE FROM `kuisioner_alumni` WHERE `kuisioner_alumni`.`no`='" + no + "'"
                        db.query(sql3, function (err,ress3){
                            if (ress3) {
                                res.json({
                                    "results": { "status": true, "msg": 'Delete data success' }
                                })
                                res.end()
                            }else{
                                res.json({
                                    "results": { "status": false, "msg": 'Delete data failed' }
                                })
                                res.end()
                            }
                        })
                    } else {
                        res.json({
                            "results": { "status": false, "msg": 'Delete data failed' }
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

router.post('/deletekuisperusahaan', async (req, res) => {
    var no = req.body.no
    var token1 = req.header('x-access-token')
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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token2)
                if (user.status == "03") {
                    var sql2 = "DELETE FROM pertanyaan_perushaan WHERE pertanyaan_perushaan.`no`='" + no + "'"
                    db.query(sql2, function (err, ress2) {
                        if (ress2) {
                            var sql3 = "DELETE FROM `kuisioner_perusahaan` WHERE `kuisioner_perusahaan`.`no`='" + no + "'"
                        db.query(sql3, function (err,ress3){
                            if (ress3) {
                                res.json({
                                    "results": { "status": true, "msg": 'Delete data success' }
                                })
                                res.end()
                            }else{
                                res.json({
                                    "results": { "status": false, "msg": 'Delete data failed' }
                                })
                                res.end()
                            }
                        })
                        } else {
                            res.json({
                                "results": { "status": false, "msg": 'Delete data failed' }
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

router.post('/deleteindikator', async (req, res) => {
    var id = req.body.id
    var token1 = req.header('x-access-token')
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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token2)
                if (user.status == "03") {
                    var sql2 = "DELETE FROM `indikator` WHERE `indikator`.`id`='" + id + "'"
                    db.query(sql2, function (err, ress2) {
                        if (ress2) {
                            var sql3 = "DELETE FROM `kuisioner_alumni` WHERE `kuisioner_alumni`.`jawaban`='" + id + "'"
                            db.query(sql3, function (err,ress3){
                                console.log(sql2)
                                console.log(sql3)
                                if (ress3) {
                                    res.json({
                                        "results": { "status": true, "msg": 'Delete data success' }
                                    })
                                    res.end()
                                }else{
                                    res.json({
                                        "results": { "status": false, "msg": 'Delete data failed' }
                                    })
                                    res.end()
                                }
                            })
                        } else {
                            res.json({
                                "results": { "status": false, "msg": 'Delete data failed' }
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

router.post('/deleteperusahaan', async (req, res) => {
    var id_perusahaan = req.body.id_perusahaan;
    var path = './static/'
    var token1 = req.header("x-access-token")
    console.log(token2)
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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                console.log('a')
                var user = jwtdecode(token2)
                if (user.status == "03") {
                    var sql = "SELECT * FROM `perusahaan` WHERE `id_perusahaan`='" + id_perusahaan + "'";
                    var query = db.query(sql, function (err, rows) {
                        if (rows != '') {
                            console.log(sql)
                            if (rows[0].logo != '') {
                                console.log(rows)
                                fs.unlink(path + rows[0].logo, (err) => {
                                    if (err) {
                                        res.json({
                                            "results": { "status": false, "msg": 'Failed to Deleted logo' }
                                        })
                                        res.end()
                                    } else {
                                        console.log(path + rows[0].logo)
                                        var sql1 = "DELETE FROM `login` WHERE `login`.`id`='" + id_perusahaan + "'";
                                        var query1 = db.query(sql1, function (err, results) {
                                            if (results) {
                                                var sql3 = "DELETE FROM `kuisioner_perusahaan` WHERE `kuisioner_perusahaan`.`id_perusahaan`='" + id_perusahaan + "'"
                                                var query3 = db.query(sql3, function (err, resd) {
                                                    if (resd) {
                                                        var sql2 = "DELETE FROM `perusahaan` WHERE `perusahaan`.`id_perusahaan`='" + id_perusahaan + "'";

                                                        var query2 = db.query(sql2, function (err, result) {
                                                            if (result) {
                                                                res.json({
                                                                    "results":
                                                                        { "status": true, "msg": 'Data has been deleted' },
                                                                    "data": {
                                                                        "id_perusahaan": id_perusahaan
                                                                    }
                                                                });
                                                                res.end();
                                                            } else {
                                                                res.json({
                                                                    "results":
                                                                        { "status": false, "msg": 'Data delete error' }
                                                                });
                                                                res.end();
                                                            }
                                                        })
                                                    } else {
                                                        res.json({
                                                            "results":
                                                                { "status": false, "msg": 'Data delete error' }
                                                        })
                                                        res.end()
                                                    }
                                                })
                                            } else {
                                                var sql3 = "DELETE FROM `kuisioner_perusahaan` WHERE `kuisioner_perusahaan`.`id_perusahaan`='" + id_perusahaan + "'"
                                                var query3 = db.query(sql3, function (err, resd) {
                                                    if (resd) {
                                                        var sql2 = "DELETE FROM `perusahaan` WHERE `perusahaan`.`id_perusahaan`='" + id_perusahaan + "'";

                                                        var query2 = db.query(sql2, function (err, result) {
                                                            if (result) {
                                                                res.json({
                                                                    "results":
                                                                        { "status": true, "msg": 'Data has been deleted' },
                                                                    "data": {
                                                                        "id_perusahaan": id_perusahaan
                                                                    }
                                                                });
                                                                res.end();
                                                            } else {
                                                                res.json({
                                                                    "results":
                                                                        { "status": false, "msg": 'Data delete error' }
                                                                });
                                                                res.end();
                                                            }
                                                        })
                                                    } else {
                                                        res.json({
                                                            "results":
                                                                { "status": false, "msg": 'Data delete error' }
                                                        })
                                                        res.end()
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            } else {
                                var sql1 = "DELETE FROM `login` WHERE `login`.`id`='" + id_perusahaan + "'";
                                var query1 = db.query(sql1, function (err, results) {
                                    if (results) {
                                        var sql3 = "DELETE FROM `kuisioner_perusahaan` WHERE `kuisioner_perusahaan`.`id_perusahaan`='" + id_perusahaan + "'"
                                        var query3 = db.query(sql3, function (err, resd) {
                                            if (resd) {
                                                var sql2 = "DELETE FROM `perusahaan` WHERE `perusahaan`.`id_perusahaan`='" + id_perusahaan + "'";

                                                var query2 = db.query(sql2, function (err, result) {
                                                    if (result) {
                                                        res.json({
                                                            "results":
                                                                { "status": true, "msg": 'Data has been deleted' },
                                                            "data": {
                                                                "id_perusahaan": id_perusahaan
                                                            }
                                                        });
                                                        res.end();
                                                    } else {
                                                        res.json({
                                                            "results":
                                                                { "status": false, "msg": 'Data delete error' }
                                                        });
                                                        res.end();
                                                    }
                                                })
                                            } else {
                                                res.json({
                                                    "results":
                                                        { "status": false, "msg": 'Data delete error' }
                                                })
                                                res.end()
                                            }
                                        })
                                    } else {
                                        var sql3 = "DELETE FROM `kuisioner_perusahaan` WHERE `kuisioner_perusahaan`.`id_perusahaan`='" + id_perusahaan + "'"
                                        var query3 = db.query(sql3, function (err, resd) {
                                            if (resd) {
                                                var sql2 = "DELETE FROM `perusahaan` WHERE `perusahaan`.`id_perusahaan`='" + id_perusahaan + "'";

                                                var query2 = db.query(sql2, function (err, result) {
                                                    if (result) {
                                                        res.json({
                                                            "results":
                                                                { "status": true, "msg": 'Data has been deleted' },
                                                            "data": {
                                                                "id_perusahaan": id_perusahaan
                                                            }
                                                        });
                                                        res.end();
                                                    } else {
                                                        res.json({
                                                            "results":
                                                                { "status": false, "msg": 'Data delete error' }
                                                        });
                                                        res.end();
                                                    }
                                                })
                                            } else {
                                                res.json({
                                                    "results":
                                                        { "status": false, "msg": 'Data delete error' }
                                                })
                                                res.end()
                                            }
                                        })
                                    }
                                })
                            }
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

router.post('/inputdataalumni', async (req, res) => {
    var npm = req.body.npm;
    var jurusan = req.body.jurusan;
    var token1 = req.header("x-access-token")
    console.log(token1)
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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token2)
                if (user.status == "03") {
                    var sql = "INSERT INTO `alumni`(`npm`, `nama`, `tanggal_lulus`, `ipk`, `jurusan`, `keterangan`, `picture`) VALUES ('" + npm + "','',null,'','" + jurusan + "','','')";

                    var query = db.query(sql, function (err, result) {
                        console.log(sql)
                        if (result) {
                            res.json({
                                "results":
                                    { "status": true, "msg": 'Data has been added' },
                                "data": {
                                    "npm": npm,
                                    "jurusan": jurusan
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
                    });
                } else {
                    console.log('x')
                    console.log(token2)
                    res.json({
                        "results":
                        {
                            "status": false,
                            "msg": 'Unauthorized User'
                        }
                    })
                }
            } else {
                console.log('a')
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

router.post('/inputkuisioneralumni', async (req, res) => {
    var no = req.body.no;
    var text = req.body.text;
    var category = req.body.category
    var token1 = req.header("x-access-token")
    console.log(token1)
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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token2)
                if (user.status == "03") {
                    var sql = "INSERT INTO `pertanyaaan_alumni`(`no`, `text`, `category`) VALUES ('" + no + "','"+ text +"','"+category+"')";

                    var query = db.query(sql, function (err, result) {
                        console.log(sql)
                        if (result) {
                            res.json({
                                "results":
                                    { "status": true, "msg": 'Data has been added' },
                                "data": {
                                    "no": no,
                                    "pertanyaan": text,
                                    "category": category
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
                    });
                } else {
                    console.log('x')
                    console.log(token2)
                    res.json({
                        "results":
                        {
                            "status": false,
                            "msg": 'Unauthorized User'
                        }
                    })
                }
            } else {
                console.log('a')
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

router.post('/inputindikator', async (req, res) => {
    var id = req.body.id;
    var value = req.body.value;
    var category = req.body.category
    var token1 = req.header("x-access-token")
    console.log(token1)
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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token2)
                if (user.status == "03") {
                    var sql = "INSERT INTO `indikator`(`id`, `value`, `category`) VALUES  ('" + id + "','"+ value +"','"+category+"')";

                    var query = db.query(sql, function (err, result) {
                        if (result) {
                            res.json({
                                "results":
                                    { "status": true, "msg": 'Data has been added' },
                                "data": {
                                    "no": id,
                                    "pertanyaan": value,
                                    "category": category
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
                    });
                } else {
                    console.log('x')
                    console.log(token2)
                    res.json({
                        "results":
                        {
                            "status": false,
                            "msg": 'Unauthorized User'
                        }
                    })
                }
            } else {
                console.log('a')
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

router.post('/inputkuisionerperusahaan', async (req, res) => {
    var no = req.body.no;
    var text = req.body.text;
    var category = req.body.category
    var token1 = req.header("x-access-token")
    console.log(token1)
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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token2)
                if (user.status == "03") {
                    var sql = "INSERT INTO pertanyaan_perushaan(`no`, `text`, `category`) VALUES ('" + no + "','"+ text +"','"+category+"')";
                    console.log(sql)
                    var query = db.query(sql, function (err, result) {
                        if (result) {
                            console.log(sql)
                            res.json({
                                "results":
                                    { "status": true, "msg": 'Data has been added' },
                                "data": {
                                    "no": no,
                                    "pertanyaan": text,
                                    "category": category
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
                    });
                } else {
                    console.log('x')
                    console.log(token2)
                    res.json({
                        "results":
                        {
                            "status": false,
                            "msg": 'Unauthorized User'
                        }
                    })
                }
            } else {
                console.log('a')
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

router.post('/inputdataperusahaan', async (req, res) => {
    var id_perusahaan = req.body.id_perusahaan;
    var token1 = req.header("x-access-token")
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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token2)
                if (user.status == "03") {
                    var sql = "INSERT INTO `perusahaan`(`id_perusahaan`, `nama`, `pemilik`, `provinsi`, `email`, `alamat`, `kota`, `web`, `contact`, `logo`) VALUES ('" + id_perusahaan + "','','','','','','','','','')";
                    db.query(sql, function (err, result) {
                        if (result) {
                            res.json({
                                "results":
                                    { "status": true, "msg": 'Input data Success' }
                            })
                            res.end()
                        } else {
                            console.log(sql)
                            res.json({
                                "results":
                                    { "status": false, "msg": 'Fail to input data' }
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

router.post('/viewkuisionergraph', async(req,res) =>{
    var text = req.body.text
    var jurusan = req.body.jurusan
    var tahunlulus = req.body.tahunlulus
    if (jurusan == undefined || jurusan == ''){
        var a = '1 = 1'
        console.log(a)
        if (tahunlulus == undefined || tahunlulus == ''){
            var b = '1=1'
            // sql jurusan 1=1 dan tahunlulus 1=1
            var sql = "SELECT COUNT(DISTINCT kuisioner_alumni.npm) AS y, indikator.value AS x FROM kuisioner_alumni JOIN pertanyaan_alumni ON pertanyaan_alumni.no = kuisioner_alumni.no JOIN alumni ON kuisioner_alumni.npm = alumni.npm JOIN indikator ON indikator.id = kuisioner_alumni.jawaban  WHERE "+a+" AND "+b+" AND pertanyaan_alumni.text = '"+ text +"' AND kuisioner_alumni.jawaban IS NOT NULL GROUP BY indikator.value, pertanyaan_alumni.text"
            console.log(sql)
            db.query(sql, function(err,ress,rows){
                var sql1 = "SELECT COUNT(DISTINCT kuisioner_alumni.npm) AS y, indikator.value AS x FROM kuisioner_alumni JOIN pertanyaaan_alumni ON pertanyaaan_alumni.no = kuisioner_alumni.no JOIN alumni ON kuisioner_alumni.npm = alumni.npm JOIN indikator ON indikator.id = kuisioner_alumni.jawaban  WHERE "+a+" AND "+b+" AND pertanyaaan_alumni.text = '"+ text +"' AND kuisioner_alumni.jawaban IS NOT NULL GROUP BY indikator.value, pertanyaaan_alumni.text"
                db.query(sql1, function(err, ress1){
                    if(ress1){
                        // var actual = []
                        //  ress.map(function(object){
                        //      actual.push(objectToArray(object))
                        //  })
                        //  function objectToArray(obj) {
                        //      var array = []
                        //      var objkeys = Object.keys(obj).sort()
                        //      for(var i = 0; i < objkeys.length; i++) {
                        //          array.push(obj[objkeys[i]])
                        //      }
                        //      return array
                        //  }
                        //  var merged = [].concat.apply([],actual)
                        //  var actual1 = []
                        //  ress1.map(function(object1){
                        //      actual1.push(objectToArray(object1))
                        //  })
                        //  function objectToArray(obj1) {
                        //      var array1 = []
                        //      var objkeys1 = Object.keys(obj1).sort()
                        //      for(var i = 0; i < objkeys1.length; i++) {
                        //          array1.push(obj1[objkeys1[i]])
                        //      }
                        //      return array1
                        //  }
                        //  var merged1 = [].concat.apply([],actual)
                        //  console.log(Object.entries(ress))
                        //  console.log(merged)
                        res.json({
                            "results":
                            {
                                "status": true,
                                "label": ress1,
                                "data": ress,
                                "msg": "Data has been included"
                            }
                        });
                        res.end();
                    } else {
                        res.json({
                            "results":
                            {
                                "status": false,
                                "msg": "Failed to fetch data"
                            }
                        })
                    }
                })
            })
        }else{
            var b = "alumni.tahunlulus = '"+tahunlulus+"'"
            //sql jurusan 1=1 dan tahunlulus = value
            var sql = "SELECT COUNT(DISTINCT kuisioner_alumni.npm) AS y, indikator.value AS x FROM kuisioner_alumni JOIN pertanyaaan_alumni ON pertanyaaan_alumni.no = kuisioner_alumni.no JOIN alumni ON kuisioner_alumni.npm = alumni.npm JOIN indikator ON indikator.id = kuisioner_alumni.jawaban  WHERE "+a+" AND "+b+" AND pertanyaaan_alumni.text = '"+ text +"' AND kuisioner_alumni.jawaban IS NOT NULL GROUP BY indikator.value, pertanyaaan_alumni.text"
            console.log(sql)
            db.query(sql, function(err,ress){
                var sql1 = "SELECT COUNT(DISTINCT kuisioner_alumni.npm) AS y, indikator.value AS x FROM kuisioner_alumni JOIN pertanyaaan_alumni ON pertanyaaan_alumni.no = kuisioner_alumni.no JOIN alumni ON kuisioner_alumni.npm = alumni.npm JOIN indikator ON indikator.id = kuisioner_alumni.jawaban  WHERE "+a+" AND "+b+" AND pertanyaaan_alumni.text = '"+ text +"' AND kuisioner_alumni.jawaban IS NOT NULL GROUP BY indikator.value, pertanyaaan_alumni.text"
                db.query(sql1, function(err, ress1){
                    if(ress1){
                        // var actual = []
                        //  ress.map(function(object){
                        //      actual.push(objectToArray(object))
                        //  })
                        //  function objectToArray(obj) {
                        //      var array = []
                        //      var objkeys = Object.keys(obj).sort()
                        //      for(var i = 0; i < objkeys.length; i++) {
                        //          array.push(obj[objkeys[i]])
                        //      }
                        //      return array
                        //  }
                        //  var merged = [].concat.apply([],actual)
                        //  var actual1 = []
                        //  ress1.map(function(object1){
                        //      actual1.push(objectToArray(object1))
                        //  })
                        //  function objectToArray(obj1) {
                        //      var array1 = []
                        //      var objkeys1 = Object.keys(obj1).sort()
                        //      for(var i = 0; i < objkeys1.length; i++) {
                        //          array1.push(obj1[objkeys1[i]])
                        //      }
                        //      return array1
                        //  }
                        //  var merged1 = [].concat.apply([],actual)
                        //  console.log(Object.entries(ress))
                        //  console.log(merged)
                        // console.log(ress)
                        res.json({
                            "results":
                            {
                                "status": true,
                                "label": ress1,
                                "data": ress,
                                "msg": "Data has been included"
                            }
                        });
                        res.end();
                    } else {
                        res.json({
                            "results":
                            {
                                "status": false,
                                "msg": "Failed to fetch data"
                            }
                        })
                    }
                })
            })
        }
    } else {
        var a = "alumni.jurusan = '"+ jurusan+"'"
        console.log(a)
        if (tahunlulus == undefined || tahunlulus == ''){
            var b = '1=1'
            var sql = "SELECT COUNT(DISTINCT kuisioner_alumni.npm) AS y, indikator.value AS x FROM kuisioner_alumni JOIN pertanyaaan_alumni ON pertanyaaan_alumni.no = kuisioner_alumni.no JOIN alumni ON kuisioner_alumni.npm = alumni.npm JOIN indikator ON indikator.id = kuisioner_alumni.jawaban  WHERE "+a+" AND "+b+" AND pertanyaaan_alumni.text = '"+ text +"' AND kuisioner_alumni.jawaban IS NOT NULL GROUP BY indikator.value, pertanyaaan_alumni.text"
            console.log(sql)
            db.query(sql, function(err,ress){
                var sql1 = "SELECT COUNT(DISTINCT kuisioner_alumni.npm) AS y, indikator.value AS x FROM kuisioner_alumni JOIN pertanyaaan_alumni ON pertanyaaan_alumni.no = kuisioner_alumni.no JOIN alumni ON kuisioner_alumni.npm = alumni.npm JOIN indikator ON indikator.id = kuisioner_alumni.jawaban  WHERE "+a+" AND "+b+" AND pertanyaaan_alumni.text = '"+ text +"' AND kuisioner_alumni.jawaban IS NOT NULL GROUP BY indikator.value, pertanyaaan_alumni.text"
                db.query(sql1, function(err, ress1){
                    if(ress1){
                        // var actual = []
                        //  ress.map(function(object){
                        //      actual.push(objectToArray(object))
                        //  })
                        //  function objectToArray(obj) {
                        //      var array = []
                        //      var objkeys = Object.keys(obj).sort()
                        //      for(var i = 0; i < objkeys.length; i++) {
                        //          array.push(obj[objkeys[i]])
                        //      }
                        //      return array
                        //  }
                        //  var merged = [].concat.apply([],actual)
                        //  var actual1 = []
                        //  ress1.map(function(object1){
                        //      actual1.push(objectToArray(object1))
                        //  })
                        //  function objectToArray(obj1) {
                        //      var array1 = []
                        //      var objkeys1 = Object.keys(obj1).sort()
                        //      for(var i = 0; i < objkeys1.length; i++) {
                        //          array1.push(obj1[objkeys1[i]])
                        //      }
                        //      return array1
                        //  }
                        //  var merged1 = [].concat.apply([],actual)
                        //  console.log(Object.entries(ress))
                        //  console.log(merged)
                        // console.log(ress)
                        res.json({
                            "results":
                            {
                                "status": true,
                                "label": ress1,
                                "data": ress,
                                "msg": "Data has been included"
                            }
                        });
                        res.end();
                    } else {
                        res.json({
                            "results":
                            {
                                "status": false,
                                "msg": "Failed to fetch data"
                            }
                        })
                    }
                })
            })
            //sql jurusan =value dan tahunlulus 1=1
        }else{
            var b = "alumni.tahunlulus = '"+tahunlulus+"'"
            var sql = "SELECT COUNT(DISTINCT kuisioner_alumni.npm) AS y, indikator.value AS x FROM kuisioner_alumni JOIN pertanyaaan_alumni ON pertanyaaan_alumni.no = kuisioner_alumni.no JOIN alumni ON kuisioner_alumni.npm = alumni.npm JOIN indikator ON indikator.id = kuisioner_alumni.jawaban  WHERE "+a+" AND "+b+" AND pertanyaaan_alumni.text = '"+ text +"' AND kuisioner_alumni.jawaban IS NOT NULL GROUP BY indikator.value, pertanyaaan_alumni.text"
            console.log(sql)
            db.query(sql, function(err,ress){
                var sql1 = "SELECT COUNT(DISTINCT kuisioner_alumni.npm) AS y, indikator.value AS x FROM kuisioner_alumni JOIN pertanyaaan_alumni ON pertanyaaan_alumni.no = kuisioner_alumni.no JOIN alumni ON kuisioner_alumni.npm = alumni.npm JOIN indikator ON indikator.id = kuisioner_alumni.jawaban  WHERE "+a+" AND "+b+" AND pertanyaaan_alumni.text = '"+ text +"' AND kuisioner_alumni.jawaban IS NOT NULL GROUP BY indikator.value, pertanyaaan_alumni.text"
                db.query(sql1, function(err, ress1){
                    if(ress1){
                        // var actual = []
                        //  ress.map(function(object){
                        //      actual.push(objectToArray(object))
                        //  })
                        //  function objectToArray(obj) {
                        //      var array = []
                        //      var objkeys = Object.keys(obj).sort()
                        //      for(var i = 0; i < objkeys.length; i++) {
                        //          array.push(obj[objkeys[i]])
                        //      }
                        //      return array
                        //  }
                        //  var merged = [].concat.apply([],actual)
                        //  var actual1 = []
                        //  ress1.map(function(object1){
                        //      actual1.push(objectToArray(object1))
                        //  })
                        //  function objectToArray(obj1) {
                        //      var array1 = []
                        //      var objkeys1 = Object.keys(obj1).sort()
                        //      for(var i = 0; i < objkeys1.length; i++) {
                        //          array1.push(obj1[objkeys1[i]])
                        //      }
                        //      return array1
                        //  }
                        //  var merged1 = [].concat.apply([],actual)
                        //  console.log(Object.entries(ress))
                        //  console.log(merged)
                        res.json({
                            "results":
                            {
                                "status": true,
                                "label": ress1,
                                "data": ress,
                                "msg": "Data has been included"
                            }
                        });
                        res.end();
                    } else {
                        res.json({
                            "results":
                            {
                                "status": false,
                                "msg": "Failed to fetch data"
                            }
                        })
                    }
                })
            })
        }
    }
})

router.post('/updatepass', async(req,res) =>{
    var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ]
    var id= req.body.id;
    var pass= req.body.pass;
    var b64 = btoa(pass)
    var textBytes = aesjs.utils.utf8.toBytes(b64)
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    var token1 = req.header("x-access-token")
    console.log(encryptedHex)
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
                if (user.status == "03") {
                    var sql = "SELECT * FROM `login` WHERE id = '"+id+"'";
    
                    var query1 = db.query(sql, function (err, result){
                        if(result != ''){
                            var sql1 = "UPDATE `login` SET password='" + encryptedHex +"' WHERE id= '" + id + "'";
                
                            var query = db.query(sql1, function (err, results) { 
                               console.log(encryptedHex)
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

router.post('/kuisionerp', async(req,res) => {
    var text = req.body.text
    var sql = "SELECT COUNT(DISTINCT kuisioner_perusahaan.id_perusahaan) AS y, indikator.value AS x FROM kuisioner_perusahaan JOIN indikator ON indikator.id = kuisioner_perusahaan.jawaban JOIN pertanyaan_perushaan ON pertanyaan_perushaan.no = kuisioner_perusahaan.no WHERE pertanyaan_perushaan.text = '"+text+"' AND kuisioner_perusahaan.jawaban IS NOT NULL GROUP BY indikator.value, pertanyaan_perushaan.text"
    console.log(sql)
    db.query(sql, function(err,res1){
        if(res1){
            res.json({
                "results":{
                    "status": true,
                    "data": res1,
                    "msg": "Data fetch success"
                }
            })
        }else{
            res.json({
                "results":{
                    "status": false,
                    "msg": "Data fetch failed"
                }
            })
        }
    })
})

router.post('/findalumni', async(req,res) => {
    var nama = req.body.nama
    var jurusan = req.body.jurusan
    if (nama == undefined || nama == '') {
        var sql = "SELECT * FROM alumni WHERE jurusan = '"+jurusan+"'"
    console.log(sql)
    db.query(sql, function(err,res1){
        if(res1){
            res.json({
                "results":{
                    "status": true,
                    "data": res1,
                    "msg": "Data fetch success"
                }
            })
        }else{
            res.json({
                "results":{
                    "status": false,
                    "msg": "Data fetch failed"
                }
            })
        }
    })
    }else if(jurusan == undefined || jurusan == '') {
        var sql = "SELECT * FROM alumni WHERE nama = '"+nama+"'"
    console.log(sql)
    db.query(sql, function(err,res1){
        if(res1){
            res.json({
                "results":{
                    "status": true,
                    "data": res1,
                    "msg": "Data fetch success"
                }
            })
        }else{
            res.json({
                "results":{
                    "status": false,
                    "msg": "Data fetch failed"
                }
            })
        }
    })
    }else{
        var sql = "SELECT * FROM alumni WHERE nama = '"+nama+"' AND jurusan = '"+jurusan+"'"
        console.log(sql)
        db.query(sql, function(err,res1){
            if(res1){
                res.json({
                    "results":{
                        "status": true,
                        "data": res1,
                        "msg": "Data fetch success"
                    }
                })
        }else{
            res.json({
                "results":{
                    "status": false,
                    "msg": "Data fetch failed"
                }
            })
        }
    })
    }
})

module.exports = router