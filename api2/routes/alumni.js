const router = require('express').Router()
const multer = require('multer')
var jwt = require('jsonwebtoken');
var randomstring = require('randomstring')
var jwtdecode = require('jwt-decode')
var aesjs = require('aes-js')
const uploadSetting = require('./uploadsetting')
const fs = require('fs')
var btoa = require('btoa')
const readchunk = require('read-chunk')
const imagetype = require('image-type')
const fields1 = uploadSetting.upload.fields([
    {
        name: 'picture',
        maxCount: 1
    }
])

router.get('/selectone', async (req, res) => {

    var sql = "SELECT * FROM alumni WHERE npm=?";

    db.query(sql, [req.param("npm")], function (err, results) {
        if (results != "") {
            console.log(sql)
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

router.get('/selectriwayat', async (req, res) => {
    var npm = req.param("npm");

    var sql = "SELECT * FROM riwayat WHERE npm='" + npm + "'";

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
    var npm = req.body.npm;
    var no = req.body.no;

    var sql = "SELECT jawaban FROM kuisioner_alumni WHERE npm='" + npm + "' AND no= '"+no+"'";
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

router.get('/viewkuisioner', async (req, res) => {

    var sql = "SELECT * FROM pertanyaaan_alumni";

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
})//table kuis

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
})//button drop down

router.post('/inputdatariwayat', async (req, res) => {
    var token1 = req.header("x-access-token")
    var posisi = req.body.posisi;
    var mulai = req.body.mulai;
    var sampai = req.body.sampai;
    var npm = req.body.npm;
    var perusahaan = req.body.perusahaan;
    var id_riwayat = "RT" + npm + randomstring.generate(4);
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
                if (user.profile.npm == npm) {
                    var sql6 = "SELECT * FROM login WHERE id='" + npm + "'"
                    db.query(sql6, function (err, stat) {
                        if (stat != '') {
                            if (stat[0].status == "01") {
                                var sql5 = "SELECT * FROM alumni WHERE npm='" + npm + "'";

                                db.query(sql5, function (err, results) {
                                    if (results != "") {
                                        var sql = "INSERT INTO `riwayat`(`posisi`, `id_riwayat`, `mulai`, `sampai`, `npm`, `perusahaan`) VALUES ('" + posisi + "','" + id_riwayat + "','" + mulai + "','" + sampai + "','" + npm + "','" + perusahaan + "')";

                                        var query = db.query(sql, function (err, result) {
                                            if (result) {
                                                var sql1 = "SELECT * FROM `alumni` WHERE npm = '" + npm + "'"
                                                var query = db.query(sql1, function (err, res1) {
                                                    if (res1) {
                                                        var sql3 = "SELECT `posisi`, `id_riwayat`, `mulai`, `sampai`, `perusahaan` FROM `riwayat` WHERE npm='" + npm + "'"
                                                        var query3 = db.query(sql3, function (err, res2) {
                                                            if (res2) {
                                                                var secret = 'WOI';
                                                                var now = Math.floor(Date.now() / 1000),
                                                                    iat = (now - 10),
                                                                    expiresIn = 3600,
                                                                    expr = (now + expiresIn),
                                                                    notBefore = (now - 10),
                                                                    jwtId = Math.random().toString(36).substring(7);
                                                                var payload = {
                                                                    iat: iat,
                                                                    jwtid: jwtId,
                                                                    audience: 'TEST',
                                                                    data: res2,
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

                                                                jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: expiresIn }, function (err, token) {
                                                                    if (err) {
                                                                        res.json({
                                                                            "results":
                                                                            {
                                                                                "status": false,
                                                                                "msg": 'Error occurred while generating token'
                                                                            }
                                                                        });
                                                                    } else {
                                                                        if (token != false) {
                                                                            console.log(token)
                                                                            res.header();
                                                                            res.json({
                                                                                "results":
                                                                                {
                                                                                    "status": true,
                                                                                    "token": token,
                                                                                    "id_riwayat": id_riwayat,
                                                                                    "msg": "Insert Riwayat Success"
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
                                                                console.log('?')
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
                                                                { "status": false, "msg": 'Maaf User Tidak Di Temukan' }
                                                        });
                                                        res.end();
                                                    }
                                                })
                                            } else {
                                                res.json({
                                                    "results":
                                                        { "status": false, "msg": 'Gagal input data Alumni' }
                                                });
                                                res.end();
                                            }
                                        })
                                    }
                                    else {
                                        res.json({
                                            "results": { "status": false, "msg": 'User cannot be found' }
                                        })
                                        res.end()
                                    }
                                })
                            } else {
                                console.log('xxx')
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
                            console.log('xx')
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
                    console.log('x')
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
                        "msg": "Token is not valid"
                    }
                })
            }
        })
    }
})

router.post('/inputdatakuisioner', async (req, res) => {
    var token1 = req.header("x-access-token")
    var no = req.body.no;
    var jawaban = req.body.jawaban;
    var npm = req.body.npm;
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
                var user = jwtdecode(token2)
                if (user.profile.npm == npm) {
                    var sql6 = "SELECT * FROM login WHERE id='" + npm + "'"
                    db.query(sql6, function (err, stat) {
                        if (stat != '') {
                            if (stat[0].status == "01") {
                                var sql5 = "SELECT * FROM alumni WHERE npm='" + npm + "'";

                                db.query(sql5, function (err, results) {
                                    if (results != "") {
                                        var sql = "INSERT INTO `kuisioner_alumni`(`npm`, `no`, `jawaban`) VALUES ('" + npm + "','" + no + "','" + jawaban + "')";

                                        var query = db.query(sql, function (err, result) {
                                            if (result) {
                                                var sql1 = "SELECT * FROM `alumni` WHERE npm = '" + npm + "'"
                                                var query = db.query(sql1, function (err, res1) {
                                                    if (res1) {
                                                        var sql3 = "SELECT `posisi`, `id_riwayat`, `mulai`, `sampai`, `perusahaan` FROM `riwayat` WHERE npm='" + npm + "'"
                                                        var query3 = db.query(sql3, function (err, res2) {
                                                            if (res2) {
                                                                var secret = 'WOI';
                                                                var now = Math.floor(Date.now() / 1000),
                                                                    iat = (now - 10),
                                                                    expiresIn = 3600,
                                                                    expr = (now + expiresIn),
                                                                    notBefore = (now - 10),
                                                                    jwtId = Math.random().toString(36).substring(7);
                                                                var payload = {
                                                                    iat: iat,
                                                                    jwtid: jwtId,
                                                                    audience: 'TEST',
                                                                    data: res2,
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

                                                                jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: expiresIn }, function (err, token) {
                                                                    if (err) {
                                                                        res.json({
                                                                            "results":
                                                                            {
                                                                                "status": false,
                                                                                "msg": 'Error occurred while generating token'
                                                                            }
                                                                        });
                                                                    } else {
                                                                        if (token != false) {
                                                                            console.log(token)
                                                                            res.header();
                                                                            res.json({
                                                                                "results":
                                                                                {
                                                                                    "status": true,
                                                                                    "token": token,
                                                                                    "msg": "Edit Answer Success"
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
                                                                console.log('?')
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
                                                                { "status": false, "msg": 'Maaf User Tidak Di Temukan' }
                                                        });
                                                        res.end();
                                                    }
                                                })
                                            } else {
                                                res.json({
                                                    "results":
                                                        { "status": false, "msg": 'Gagal input data Alumni' }
                                                });
                                                res.end();
                                            }
                                        })
                                    }
                                    else {
                                        res.json({
                                            "results": { "status": false, "msg": 'User cannot be found' }
                                        })
                                        res.end()
                                    }
                                })
                            } else {
                                console.log('xxx')
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
                            console.log('xx')
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
                    console.log('x')
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
                        "msg": "Token is not valid"
                    }
                })
            }
        })
    }
})

router.post('/editdataalumni', async (req, res) => {
    var token1 = req.header("x-access-token")
    var npm = req.body.npm;
    var nama = req.body.nama;
    var tanggal_lulus = req.body.tanggal_lulus;
    var ipk = req.body.ipk;
    var jurusan = req.body.jurusan;
    var keterangan = req.body.keterangan;
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
                if (user.profile.npm == npm) {
                    var sql6 = "SELECT * FROM login WHERE id='" + npm + "'"
                    db.query(sql6, function (err, stat) {
                        if (stat != '') {
                            if (stat[0].status == "01") {
                                var sql5 = "SELECT * FROM alumni WHERE npm='" + npm + "'";

                                db.query(sql5, function (err, results) {
                                    if (results != "") {
                                        var sql = "UPDATE `alumni` SET nama='" + nama + "',tanggal_lulus='" + tanggal_lulus + "',ipk='" + ipk + "',jurusan='" + jurusan + "',keterangan='" + keterangan + "' WHERE npm='" + npm + "'";
                                        console.log(sql)
                                        db.query(sql, function (err, result) {
                                            console.log(sql)
                                            if (result) {
                                                var sql1 = "SELECT * FROM `alumni` WHERE npm = '" + npm + "'"
                                                var query = db.query(sql1, function (err, res1) {
                                                    if (res1) {
                                                        var sql3 = "SELECT `posisi`, `id_riwayat`, `mulai`, `sampai`, `perusahaan` FROM `riwayat` WHERE npm='" + npm + "'"
                                                        var query3 = db.query(sql3, function (err, res2) {
                                                            if (res2) {
                                                                var secret = 'WOI';
                                                                var now = Math.floor(Date.now() / 1000),
                                                                    iat = (now - 10),
                                                                    expiresIn = 3600,
                                                                    expr = (now + expiresIn),
                                                                    notBefore = (now - 10),
                                                                    jwtId = Math.random().toString(36).substring(7);
                                                                var payload = {
                                                                    iat: iat,
                                                                    jwtid: jwtId,
                                                                    audience: 'TEST',
                                                                    data: res2,
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

                                                                jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: expiresIn }, function (err, token) {
                                                                    if (err) {
                                                                        res.json({
                                                                            "results":
                                                                            {
                                                                                "status": false,
                                                                                "msg": 'Error occurred while generating token'
                                                                            }
                                                                        });
                                                                    } else {
                                                                        if (token != false) {
                                                                            console.log(token)
                                                                            res.json({
                                                                                "results":
                                                                                {
                                                                                    "status": true,
                                                                                    "token": token,
                                                                                    "msg": "Edit Profile successs"
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
                                                                console.log('?')
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
                                    }
                                    else {
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
})

router.post('/editalumniwithpic', async (req, res) => {
    fields1(req, res, function (err) {
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
                fs.unlink(path + picture1, (err) => {
                    if (err) {
                        res.json({
                            "results":
                            {
                                "status": false,
                                "msg": 'failed to delete image'
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
                })
                console.log('xxxx')
            } else {
                var token2 = token1.slice(9)
                jwt.verify(token1, 'WOI', function (err, ress) {
                    if (ress) {
                        var user = jwtdecode(token1)
                        if (user.profile.npm == npm) {
                            var sql6 = "SELECT * FROM login WHERE id='" + npm + "'"
                            db.query(sql6, function (err, stat) {
                                if (stat != '') {
                                    if (stat[0].status == "01") {
                                        var sql5 = "SELECT * FROM `alumni` WHERE `npm`='" + npm + "'"
                                        db.query(sql5, function (err, res5) {
                                            if (res5) {
                                                if (res5[0].picture == '') {
                                                    var sql = "UPDATE `alumni` SET nama='" + nama + "',tanggal_lulus='" + tanggal_lulus + "',ipk='" + ipk + "',jurusan='" + jurusan + "',keterangan='" + keterangan + "',picture='" + picture1 + "' WHERE npm='" + npm + "'"
                                                    console.log(sql)
                                                    db.query(sql, function (err, ress) {
                                                        if (ress) {
                                                            var sql1 = "SELECT * FROM `alumni` WHERE npm = '" + npm + "'"
                                                            var query = db.query(sql1, function (err, res1) {
                                                                if (res1) {
                                                                    var sql3 = "SELECT `posisi`, `id_riwayat`, `mulai`, `sampai`, `perusahaan` FROM `riwayat` WHERE npm='" + npm + "'"
                                                                    var query3 = db.query(sql3, function (err, res2) {
                                                                        if (res2) {
                                                                            var secret = 'WOI';
                                                                            var now = Math.floor(Date.now() / 1000),
                                                                                iat = (now - 10),
                                                                                expiresIn = 3600,
                                                                                expr = (now + expiresIn),
                                                                                notBefore = (now - 10),
                                                                                jwtId = Math.random().toString(36).substring(7);
                                                                            var payload = {
                                                                                iat: iat,
                                                                                jwtid: jwtId,
                                                                                audience: 'TEST',
                                                                                data: res2,
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
                                                                            jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: expiresIn }, function (err, token) {
                                                                                if (err) {
                                                                                    res.json({
                                                                                        "results":
                                                                                        {
                                                                                            "status": false,
                                                                                            "msg": 'Error occurred while generating token'
                                                                                        }
                                                                                    });
                                                                                } else {
                                                                                    if (token != false) {
                                                                                        console.log(token)
                                                                                        res.header();
                                                                                        res.json({
                                                                                            "results":
                                                                                            {
                                                                                                "status": true,
                                                                                                "token": token,
                                                                                                "msg": "Edit Profile successs"
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
                                                                            console.log('?')
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
                                                                            { "status": false, "msg": 'Maaf User Tidak Di Temukan' }
                                                                    });
                                                                    res.end();
                                                                }
                                                            })
                                                        } else {
                                                            console.log(sql)
                                                            res.json({
                                                                "results":
                                                                    { "status": false, "msg": 'Edit data failed' }
                                                            });
                                                            res.end();
                                                        }
                                                    })
                                                } else {
                                                    fs.unlink(path + res5[0].picture, (err1) => {
                                                        if (err1) {
                                                            res.json({
                                                                "results": { "status": false, "msg": 'Failed to Deleted picture' }
                                                            })
                                                            res.end()
                                                        } else {
                                                            var sql = "UPDATE `alumni` SET nama='" + nama + "',tanggal_lulus='" + tanggal_lulus + "',ipk='" + ipk + "',jurusan='" + jurusan + "',keterangan='" + keterangan + "',picture='" + picture1 + "' WHERE npm='" + npm + "'"
                                                            console.log(sql)
                                                            db.query(sql, function (err, ress) {
                                                                if (ress) {
                                                                    var sql1 = "SELECT * FROM `alumni` JOIN kuisioner_alumni ON alumni.npm = kuisioner_alumni.npm WHERE alumni.npm = '" + npm + "'"
                                                                    var query = db.query(sql1, function (err, res1) {
                                                                        if (res1) {
                                                                            var sql3 = "SELECT `posisi`, `id_riwayat`, `mulai`, `sampai`, `perusahaan` FROM `riwayat` WHERE npm='" + npm + "'"
                                                                            var query3 = db.query(sql3, function (err, res2) {
                                                                                if (res2) {
                                                                                    var secret = 'WOI';
                                                                                    var now = Math.floor(Date.now() / 1000),
                                                                                        iat = (now - 10),
                                                                                        expiresIn = 3600,
                                                                                        expr = (now + expiresIn),
                                                                                        notBefore = (now - 10),
                                                                                        jwtId = Math.random().toString(36).substring(7);
                                                                                    var payload = {
                                                                                        iat: iat,
                                                                                        jwtid: jwtId,
                                                                                        audience: 'TEST',
                                                                                        data: res2,
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

                                                                                    jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: expiresIn }, function (err, token) {
                                                                                        if (err) {
                                                                                            res.json({
                                                                                                "results":
                                                                                                {
                                                                                                    "status": false,
                                                                                                    "msg": 'Error occurred while generating token'
                                                                                                }
                                                                                            });
                                                                                        } else {
                                                                                            if (token != false) {
                                                                                                console.log(token)
                                                                                                res.header();
                                                                                                res.json({
                                                                                                    "results":
                                                                                                    {
                                                                                                        "status": true,
                                                                                                        "token": token,
                                                                                                        "msg": "Edit Profile successs"
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
                                                                                    console.log('?')
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
                                                fs.unlink(path + picture1, (err1) => {
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
                                        fs.unlink(path + picture1, (err1) => {
                                            if (err1) {
                                                res.json({
                                                    "results": { "status": false, "msg": 'Failed to Deleted Picture' }
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
                                    fs.unlink(path + picture1, (err1) => {
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
                            fs.unlink(path + picture1, (err1) => {
                                if (err1) {
                                    res.json({
                                        "results": { "status": false, "msg": 'Failed to Deleted Pic' }
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
                        fs.unlink(path + picture1, (err1) => {
                            if (err1) {
                                res.json({
                                    "results": { "status": false, "msg": 'Failed to Deleted Pic' }
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

router.post('/editkuisioner', async (req, res) => {
    var token1 = req.header("x-access-token")
    var no = req.body.no;
    var jawaban = req.body.jawaban;
    var npm = req.body.npm;
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
                var user = jwtdecode(token2)
                if (user.profile.npm == npm) {
                    var sql6 = "SELECT * FROM login WHERE id='" + npm + "'"
                    db.query(sql6, function (err, stat) {
                        if (stat != '') {
                            if (stat[0].status == "01") {
                                var sql5 = "SELECT * FROM alumni WHERE npm='" + npm + "'";
                                db.query(sql5, function (err, results) {
                                    if (results != "") {
                                        var sql = "UPDATE `kuisioner_alumni` SET `jawaban`='" + jawaban + "' WHERE npm ='" + npm + "' AND no = '"+no+"'";
                                        db.query(sql, function (err, result) {
                                            if (result) {
                                                var sql1 = "SELECT * FROM `alumni` WHERE npm = '" + npm + "'"
                                                var query = db.query(sql1, function (err, res1) {
                                                    if (res1) {
                                                        var sql3 = "SELECT `posisi`, `id_riwayat`, `mulai`, `sampai`, `perusahaan` FROM `riwayat` WHERE npm='" + npm + "'"
                                                        var query3 = db.query(sql3, function (err, res2) {
                                                            if (res2) {
                                                                var secret = 'WOI';
                                                                var now = Math.floor(Date.now() / 1000),
                                                                    iat = (now - 10),
                                                                    expiresIn = 3600,
                                                                    expr = (now + expiresIn),
                                                                    notBefore = (now - 10),
                                                                    jwtId = Math.random().toString(36).substring(7);
                                                                var payload = {
                                                                    iat: iat,
                                                                    jwtid: jwtId,
                                                                    audience: 'TEST',
                                                                    data: res2,
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

                                                                jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: expiresIn }, function (err, token) {
                                                                    if (err) {
                                                                        res.json({
                                                                            "results":
                                                                            {
                                                                                "status": false,
                                                                                "msg": 'Error occurred while generating token'
                                                                            }
                                                                        });
                                                                    } else {
                                                                        if (token != false) {
                                                                            console.log(token)
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
                                                                console.log('?')
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
                                                                { "status": false, "msg": 'Maaf User Tidak Di Temukan' }
                                                        });
                                                        res.end();
                                                    }
                                                })
                                            } else {
                                                res.json({
                                                    "results":
                                                        { "status": false, "msg": 'Update Failed' }
                                                });
                                                res.end();
                                            }
                                        })
                                    }
                                    else {
                                        res.json({
                                            "results": { "status": false, "msg": 'User cannot be found' }
                                        })
                                        res.end()
                                    }
                                })
                            } else {
                                console.log('xxx')
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
                            console.log('xx')
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
                    console.log('x')
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

router.post('/editriwayat', async (req, res) => {
    var token1 = req.header("x-access-token")
    var npm = req.body.npm
    var id_riwayat = req.body.id_riwayat;
    var posisi = req.body.posisi;
    var mulai = req.body.mulai;
    var sampai = req.body.sampai;
    var perusahaan = req.body.perusahaan;
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
                if (user.profile.npm == npm) {
                    var sql6 = "SELECT * FROM login WHERE id='" + npm + "'"
                    db.query(sql6, function (err, stat) {
                        if (stat != '') {
                            if (stat[0].status == "01") {
                                var sql5 = "SELECT * FROM alumni WHERE npm='" + npm + "'";

                                db.query(sql5, function (err, results) {
                                    if (results != "") {
                                        var sql = "UPDATE `riwayat` SET `posisi`='" + posisi + "',`mulai`='" + mulai + "',`sampai`='" + sampai + "',`perusahaan`='" + perusahaan + "' WHERE `id_riwayat`='" + id_riwayat + "'";
                                        db.query(sql, function (err, result) {
                                            if (result) {
                                                var sql1 = "SELECT * FROM `alumni` WHERE npm = '" + npm + "'"
                                                var query = db.query(sql1, function (err, res1) {
                                                    if (res1) {
                                                        var sql3 = "SELECT `posisi`, `id_riwayat`, `mulai`, `sampai`, `perusahaan` FROM `riwayat` WHERE npm='" + npm + "'"
                                                        var query3 = db.query(sql3, function (err, res2) {
                                                            if (res2) {
                                                                var secret = 'WOI';
                                                                var now = Math.floor(Date.now() / 1000),
                                                                    iat = (now - 10),
                                                                    expiresIn = 3600,
                                                                    expr = (now + expiresIn),
                                                                    notBefore = (now - 10),
                                                                    jwtId = Math.random().toString(36).substring(7);
                                                                var payload = {
                                                                    iat: iat,
                                                                    jwtid: jwtId,
                                                                    audience: 'TEST',
                                                                    data: res2,
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

                                                                jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: expiresIn }, function (err, token) {
                                                                    if (err) {
                                                                        res.json({
                                                                            "results":
                                                                            {
                                                                                "status": false,
                                                                                "msg": 'Error occurred while generating token'
                                                                            }
                                                                        });
                                                                    } else {
                                                                        if (token != false) {
                                                                            console.log(token)
                                                                            res.header();
                                                                            res.json({
                                                                                "results":
                                                                                {
                                                                                    "status": true,
                                                                                    "token": token,
                                                                                    "msg": "Riwayat has been editted"
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
                                                                console.log('?')
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
                                                                { "status": false, "msg": 'Maaf User Tidak Di Temukan' }
                                                        });
                                                        res.end();
                                                    }
                                                })
                                            } else {
                                                res.json({
                                                    "results":
                                                        { "status": false, "msg": 'Gagal input data Alumni' }
                                                });
                                                res.end();
                                            }
                                        })
                                    }
                                    else {
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
                    console.log(user.profile.npm)
                    console.log(npm)
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

router.post('/updatepass', async (req, res) => {
    var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    var npm = req.body.npm;
    var pass = req.body.pass;
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
    console.log(token1)
    console.log(npm)
    console.log(encryptedHex1)
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
                console.log('a')
                var user = jwtdecode(token1)
                if (user.profile.npm == npm) {
                    console.log(npm)
                    var sql = "SELECT * FROM `login` WHERE `password`='" + encryptedHex + "' and id = '" + npm + "'";

                    var query1 = db.query(sql, function (err, result) {
                        if (result != '') {
                            var sql1 = "UPDATE `login` SET password='" + encryptedHex1 + "' WHERE id= '" + npm + "'";

                            var query = db.query(sql1, function (err, results) {
                                console.log(encryptedHex1)
                                // console.log(decryptedText)
                                if (results) {
                                    console.log(sql1)
                                    res.json({
                                        "results":
                                            { "status": true, "msg": 'Update password success' }
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
                        } else {
                            console.log(sql)
                            res.json({
                                "results":
                                    { "status": false, "msg": 'Wrong Password' }
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

router.post('/deleteriwayat', async (req, res) => {
    var token1 = req.header("x-access-token")
    var npm = req.body.npm
    var id_riwayat = req.body.id_riwayat;
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
                console.log(npm)
                var user = jwtdecode(token1)
                if (user.profile.npm == npm) {
                    var sql6 = "SELECT * FROM login WHERE id='" + npm + "'"
                    db.query(sql6, function (err, stat) {
                        if (stat != '') {
                            if (stat[0].status == "01") {
                                var sql5 = "SELECT * FROM alumni WHERE npm='" + npm + "'";

                                db.query(sql5, function (err, results) {
                                    if (results != "") {
                                        var sql = "DELETE FROM `riwayat` WHERE `riwayat`.`id_riwayat`='" + id_riwayat + "'";
                                        db.query(sql, function (err, result) {
                                            if (result) {
                                                var sql1 = "SELECT * FROM `alumni` WHERE npm = '" + npm + "'"
                                                var query = db.query(sql1, function (err, res1) {
                                                    if (res1) {
                                                        var sql3 = "SELECT `posisi`, `id_riwayat`, `mulai`, `sampai`, `perusahaan` FROM `riwayat` WHERE npm='" + npm + "'"
                                                        var query3 = db.query(sql3, function (err, res2) {
                                                            if (res2) {
                                                                var secret = 'WOI';
                                                                var now = Math.floor(Date.now() / 1000),
                                                                    iat = (now - 10),
                                                                    expiresIn = 3600,
                                                                    expr = (now + expiresIn),
                                                                    notBefore = (now - 10),
                                                                    jwtId = Math.random().toString(36).substring(7);
                                                                var payload = {
                                                                    iat: iat,
                                                                    jwtid: jwtId,
                                                                    audience: 'TEST',
                                                                    data: res2,
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

                                                                jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: expiresIn }, function (err, token) {
                                                                    if (err) {
                                                                        res.json({
                                                                            "results":
                                                                            {
                                                                                "status": false,
                                                                                "msg": 'Error occurred while generating token'
                                                                            }
                                                                        });
                                                                    } else {
                                                                        if (token != false) {
                                                                            console.log(token)
                                                                            res.header();
                                                                            res.json({
                                                                                "results":
                                                                                {
                                                                                    "status": true,
                                                                                    "token": token,
                                                                                    "msg": "Riwayat Delete Success"
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
                                                                console.log('?')
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
                                                                { "status": false, "msg": 'Maaf User Tidak Di Temukan' }
                                                        });
                                                        res.end();
                                                    }
                                                })
                                            } else {
                                                res.json({
                                                    "results":
                                                        { "status": false, "msg": 'Gagal Hapus data buku' }
                                                });
                                                res.end();
                                            }
                                        })
                                    }
                                    else {
                                        res.json({
                                            "results": { "status": false, "msg": 'User cannot be found' }
                                        })
                                        res.end()
                                    }
                                })
                            } else {
                                console.log('xxx')
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
                            console.log('xx')
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
                    console.log('x')
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

module.exports = router