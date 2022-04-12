const express = require('express');
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "NHẬP SÁCH MỚI VÀO CỬA HÀNG"
    })
})

router.post("/", (req, res) => {
    if (req.body._id == "") {
        insertRecord(req, res);
    }
    else {
        updateRecord(req, res);
    }
})

function insertRecord(req, res) {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.nxb = req.body.nxb;
    employee.tacgia = req.body.tacgia;
    employee.soluong = req.body.soluong;
    employee.gia = req.body.gia;

    employee.save((err, doc) => {
        if (!err) {
            res.redirect('/list');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "NHẬP SÁCH MỚI VÀO CỬA HÀNG",
                    employee: req.body
                })
            }
            console.log("Đã xảy ra lỗi khi chèn bản ghi" + err);
        }
    })
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id, }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('/list');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else {
                console.log("Error occured in Updating the records" + err);
            }
        }
    })
}

router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/list", {
                list: docs
            })
        }
    })
})

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc
            })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/list');
        }
        else {
            console.log("Đã xãy ra lỗi trong quá trình nhập" + err);
        }
    })
})

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;

            // case 'nxb':
            //     body['nxbError'] = err.errors[field].message;
            //     break;

            default:
                break;
        }
    }
}

module.exports = router;