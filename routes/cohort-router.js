const express = require('express');
const db = require('../dbConfig');

const router = express.Router();

router.post('/', (req, res) => {
    try {
        db('cohorts')
            .insert(req.body)
            .then(id => {
                res.status(201).json(id)
            })
            .catch(error => {
                res.status(400).json({ message:"Bad request, please provide cohort name", error })
            })
    } catch (error) {
        res.status(500).json({ message:"Server could not post cohort", error })
    }
});

router.get('/', (req, res) => {
    db('cohorts')
        .then(cohorts => {
            res.status(200).json(cohorts)
        })
        .catch(error => {
            res.status(500).json({ message:"Server couldn't retrieve cohorts" ,error})
        })
});

router.get('/:id', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .first()
        .then(cohort => {
            if(cohort){
                res.status(200).json(cohort)
            }else{
                res.status(404).json({ message: "Could not find cohort with this ID" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Server could not retrieve cohort", error })
        })
});

router.get('/:id/students', (req, res) => {
    db('students')
        .where({ cohort_id: req.params.id })
        .then(students => {
            if(students.length){
                res.status(200).json(students)
            }else{
                res.status(404).json({ message: "Could not find students in cohort with this ID" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Server could not retrieve students", error })
        })
});

router.put('/:id', (req, res) => {
    try {
        db('cohorts')
            .where({ id: req.params.id })
            .update(req.body)
            .then(count => {
                if(count){
                    res.status(200).json({ message: `cohort with id ${req.params.id} was updated` })
                }else{
                    res.status(404).json({ message: "Couldn't find cohort with this ID" })
                }
            })
            .catch(error => {
                res.status(400).json({ message: "Bad request, please provide required fields.", error })
            })
    } catch (error) {
        res.status(500).json({ message: "Server could not update cohort", error })
    }
});

router.delete('/:id', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if(count){
                res.status(204).end();
            }else{
                res.status(404).json({ message: "Couldn't find cohort with this ID" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Server could not delete cohort", error })
        })
});

module.exports = router;