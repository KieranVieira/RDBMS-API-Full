const express = require('express');
const db = require('../dbConfig')

const router = express.Router();

router.get('/', (req, res) => {
    db('students')
        .then(students => {
            res.status(200).json(students)
        })
        .catch(error => {
            res.status(500).json({ 
                message: "Server could not retrieve students", error 
            })
        })
});

router.post('/', (req, res) => {
    try {
        db('students')
            .insert(req.body)
            .then(ids => {
                res.status(201).json(ids)
            })
            .catch(error => {
                res.status(400).json({
                    message: "Bad request, please provide name and cohort_id",
                    error
                })
            })
    } catch (error) {
        res.status(500).json({
            message: "Server could not add student",
            error
        })
    }
});

router.get('/:id', (req, res) => {
    db('students')
        .where({ id: req.params.id})
        .first()
        .then(students => {
            if(students){
                res.status(200).json(students)
            }else{
                res.status(404).json({
                    message: "Could not find student with given ID"
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Server could get student",
                error
            })
        })
});

router.put('/:id', (req, res) => {
    try {
        db('students')
            .where({ id: req.params.id })
            .update(req.body)
            .then(count => {
                if(count){
                    res.status(200).json({ 
                        message: `Student with ID ${req.params.id} was updated` 
                    })
                }else{
                    res.status(404).json({ 
                        message: `Couldn't find student with ID ${req.params.id}` 
                    })
                }
            })
            .catch(error => {
                res.status(400).json({
                    message:'Bad request, please provide a name or cohort_id',
                    error
                })
            })   
    } catch (error) {
        res.status(500).json({
            message: "Server could not update student",
            error
        })
    }
});

router.delete('/:id', (req, res) => {
    db('students')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if(count){
                res.status(204).end();
            }else{
                res.status(404).json({
                    message: "Could not find student with the given Id"
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Server could not delete student",
                error
            })
        })
});

module.exports = router;