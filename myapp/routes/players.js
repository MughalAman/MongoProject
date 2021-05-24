const express = require('express');
const router = express.Router();
const Player = require('../models/player');

//GET ALL PLAYERS
router.get('/', async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (error) {
        res.json({error: error});
    }
});

//CREATE A PLAYER
router.post('/', async (req, res) => {
    
        let player = new Player({
            name: req.body.name,
            score: req.body.score,
        });

    try {
        const savedPlayer = await player.save();
        res.json(savedPlayer);
    } catch (error) {
        res.json({error: error});
    }
});

//GET A PLAYER
router.get('/:playerId', async (req, res) => {
    try {
        const player = await Player.findById(req.params.playerId);
        res.json(player);
    } catch (error) {
        res.json({error: error});
    }
});

//DELETE A PLAYER
router.delete('/:playerId', async (req, res) => {
    try {
        const deletedPlayer = await Player.deleteOne({_id: req.params.playerId});
        res.json(deletedPlayer);
    } catch (error) {
        res.json({error: error});
    }
});

//UPDATE A PLAYER
router.patch('/playerId', async (req, res) => {
    try {
        const updatedPlayer = await Player.updateOne({ _id: req.params.playerId}, { $set: {name: req.body.name, score: req.body.score}});
        res.json(updatedPlayer);
    } catch (error) {
        
    }
});

//ADD A TROPHY TO A PLAYER
router.post('/:playerId', async (req, res) => {
    try {
        const player = await Player.findById({ _id: req.params.playerId});
        player.trophies.push({title: req.body.trophy.title, description: req.body.trophy.description});
        
        try {
            const updatedPlayer = await player.save();
            res.json(updatedPlayer);
        } catch (error) {
            res.json({error: error});
        }

    } catch (error) {
        res.json({error: error});
    }
});

//DELETE A TROPHY FROM A PLAYER
router.delete('/:playerId/:trophyId', async (req, res) => {
    try {
        const player = await Player.findById({ _id: req.params.playerId});
        player.trophies.id(req.params.trophyId).remove();
        savedPlayer = await player.save();
        res.json(savedPlayer);
    } catch (error) {
        res.json({error: error});
    }
});

module.exports = router;