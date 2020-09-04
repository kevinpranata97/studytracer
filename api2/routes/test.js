import { fstat } from "fs";

router.post('/editdataperusahaannologo', async(req,res) =>{
    var token1 = req.header("x-access-token")
    var token2 = token1.slice(9)
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
    if (!token1) { 
        console.log('xxxx')
        res.json({
            "results":
            {
                "status": false,
                "msg": 'Unauthorized User'
            }
        })
    } else {
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

if (!token1) {
    console.log('xxxx')
    res.json({
        "results":
        {
            "status": false,
            "msg": 'Unauthorized User'
        }
    })
} else {
    jwt.verify(token2, 'WOI', function (err, ress) {
        if (ress) {
            var user = jwtdecode(token2)
            if (user.status == "03") {
                var sql = "select id from login WHERE `id`='" + id + "'";

                db.query(sql, function (err, result) {
                    if (result.length) {
                        console.log('1')
                        var sql1 = "DELETE FROM `login` WHERE `login`.`id`='" + id + "'";
                        var query1 = db.query(sql1, function (err, result2) {
                            if (result2) {
                                var sql8 = "SELECT * FROM `alumni` WHERE `npm`='" + id + "'"
                                db.query(sql8, function (err, res8) {
                                    if (res8) {
                                        if (res8[0].picture == '') {

                                        } else {
                                            fs.unlink(path + res8[0].picture)
                                        }
                                    } else {

                                    }
                                })
                                var sql2 = "DELETE FROM `kuisioner_alumni` WHERE `kuisioner_alumni`.`npm`='" + id + "'";
                                var query2 = db.query(sql2, function (err, result) {
                                    if (result) {
                                        var sql4 = "DELETE FROM `riwayat` WHERE `riwayat`.`npm`='" + id + "'";
                                        var query3 = db.query(sql4, function (err, result) {
                                            if (result) {
                                                var sql4 = "DELETE FROM `alumni` WHERE `alumni`.`npm`='" + id + "'";
                                                var query3 = db.query(sql4, function (err, result) {
                                                    if (result) {
                                                        console.log
                                                         res.json({
                                                            "results": { "status": true, "msg": 'success' }
                                                        })
                                                    } else {
                                                        res.json({
                                                            "results":
                                                                { "status": false, "msg": 'Data delete error' }
                                                        });
                                                        res.end();
                                                    }
                                                })
                                            } else {
                                                var sql4 = "DELETE FROM `alumni` WHERE `alumni`.`npm`='" + id + "'";
                                                var query3 = db.query(sql4, function (err, result) {
                                                    if (result) {
                                                        console.log('ada')
                                                        res.json({
                                                            "results": { "status": true, "msg": 'success' }
                                                        })
                                                    } else {
                                                        res.json({
                                                            "results":
                                                                { "status": false, "msg": 'Data delete error' }
                                                        });
                                                        res.end();
                                                    }
                                                })
                                            }
                                        })
                                    } else {
                                        var sql4 = "DELETE FROM `riwayat` WHERE `riwayat`.`npm`='" + id + "'";
                                        var query3 = db.query(sql4, function (err, result) {
                                            if (result) {
                                                var sql4 = "DELETE FROM `alumni` WHERE `alumni`.`npm`='" + id + "'";
                                                var query3 = db.query(sql4, function (err, result) {
                                                    if (result) {
                                                        res.json({
                                                            "results": { "status": true, "msg": 'success' }
                                                        })
                                                    } else {
                                                        res.json({
                                                            "results":
                                                                { "status": false, "msg": 'Data delete error' }
                                                        });
                                                        res.end();
                                                    }
                                                })
                                            } else {
                                                var sql4 = "DELETE FROM `alumni` WHERE `alumni`.`npm`='" + id + "'";
                                                var query3 = db.query(sql4, function (err, result) {
                                                    if (result) {
                                                        res.json({
                                                            "results": { "status": true, "msg": 'success' }
                                                        })
                                                    } else {
                                                        res.json({
                                                            "results":
                                                                { "status": false, "msg": 'Data delete error' }
                                                        });
                                                        res.end();
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            } else {
                                var sql2 = "DELETE FROM `alumni` WHERE `alumni`.`npm`='" + id + "'";

                                var query2 = db.query(sql2, function (err, result) {
                                    if (result) {
                                        res.json({
                                            "results":
                                                { "status": true, "msg": 'Data has been deleted' },
                                            "data": {
                                                "npm": id
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
                            }
                        })
                    } else {
                        var sql2 = "DELETE FROM `kuisioner_alumni` WHERE `kuisioner_alumni`.`npm`='" + id + "'";
                        var query2 = db.query(sql2, function (err, result) {
                            if (result) {
                                var sql4 = "DELETE FROM `riwayat` WHERE `riwayat`.`npm`='" + id + "'";
                                var query3 = db.query(sql4, function (err, result) {
                                    if (result) {
                                        var sql4 = "DELETE FROM `alumni` WHERE `alumni`.`npm`='" + id + "'";
                                        var query3 = db.query(sql4, function (err, result) {
                                            if (result) {
                                                res.json({
                                                    "results": { "status": true, "msg": 'success' }
                                                })
                                            } else {
                                                res.json({
                                                    "results":
                                                        { "status": false, "msg": 'Data delete error' }
                                                });
                                                res.end();
                                            }
                                        })
                                    } else {
                                        var sql4 = "DELETE FROM `alumni` WHERE `alumni`.`npm`='" + id + "'";
                                        var query3 = db.query(sql4, function (err, result) {
                                            if (result) {
                                                res.json({
                                                    "results": { "status": true, "msg": 'success' }
                                                })
                                            } else {
                                                res.json({
                                                    "results":
                                                        { "status": false, "msg": 'Data delete error' }
                                                });
                                                res.end();
                                            }
                                        })
                                    }
                                })
                            } else {
                                var sql4 = "DELETE FROM `riwayat` WHERE `riwayat`.`npm`='" + id + "'";
                                var query3 = db.query(sql4, function (err, result) {
                                    if (result) {
                                        var sql4 = "DELETE FROM `alumni` WHERE `alumni`.`npm`='" + id + "'";
                                        var query3 = db.query(sql4, function (err, result) {
                                            if (result) {
                                                res.json({
                                                    "results": { "status": true, "msg": 'success' }
                                                })
                                            } else {
                                                res.json({
                                                    "results":
                                                        { "status": false, "msg": 'Data delete error' }
                                                });
                                                res.end();
                                            }
                                        })
                                    } else {
                                        var sql4 = "DELETE FROM `alumni` WHERE `alumni`.`npm`='" + id + "'";
                                        var query3 = db.query(sql4, function (err, result) {
                                            if (result) {
                                                res.json({
                                                    "results": { "status": true, "msg": 'success' }
                                                })
                                            } else {
                                                res.json({
                                                    "results":
                                                        { "status": false, "msg": 'Data delete error' }
                                                });
                                                res.end();
                                            }
                                        })
                                    }
                                })
                            }
                        })
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