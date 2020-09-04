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
        jwt.verify(token2, 'WOI', function (err, ress) {
            if (ress) {
                var user = jwtdecode(token2)
                if (user.profile.id_perusahaan == id_perusahaan) {
                    var sql6 = "SELECT * FROM login WHERE id='" + id_perusahaan + "'"
                    db.query(sql6, function (err, stat) {
                        if (stat != '') {
                            if (stat[0].status == "02") {
                                var sql5 = "SELECT * FROM `perusahaan` WHERE `id_perusahaan`='" + id_perusahaan + "'";

                                db.query(sql5, function (err, results) {
                                    if (results != "") {
                                        var sql = "UPDATE `perusahaan` SET `nama`='" + nama + "',`pemilik`='" + pemilik + "',`provinsi`='" + provinsi + "',`email`='" + email + "',`alamat`='" + alamat + "',`kota`='" + kota + "',`web`='" + web + "',`contact`='" + contact + "',`logo`='" + logo1 + "' WHERE id_perusahaan='" + id_perusahaan + "'";
                                        db.query(sql, function (err, result) {
                                            console.log(sql)
                                            if (result) {
                                                var sql2 = "SELECT * FROM `kuisioner_perusahaan` JOIN perusahaan ON kuisioner_perusahaan.id_perusahaan = perusahaan.id_perusahaan WHERE perusahaan.id_perusahaan = '" + id_perusahaan + "'";
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
                                                            },
                                                            kuisioner: {
                                                                tanggal: res2[0].tanggal,
                                                                keahlian: res2[0].keahlian,
                                                                b_inggris: res2[0].b_inggris,
                                                                integritas: res2[0].integritas,
                                                                komunikasi: res2[0].komunikasi,
                                                                kerjasama: res2[0].kerjasama,
                                                                saran: res2[0].saran,
                                                                penguasaan_diri: res2[0].penguasaan_diri
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