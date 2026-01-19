const express = require('express');
const router = express.Router();
const releaseController = require('../controllers/releaseController');

router.get('/', releaseController.getAllReleases);
router.get('/:id', releaseController.getReleaseById);
router.post('/', releaseController.createRelease);
router.put('/:id', releaseController.updateRelease);
router.delete('/:id', releaseController.deleteRelease);
router.post('/:id/tracks', releaseController.addTrack);
router.post('/:id/platforms', releaseController.addPlatform);
router.patch('/:id/status', releaseController.updateStatus);

module.exports = router;
