const router = require('express').Router();
const { Landmark } = require('../../models');
const { latRange, lonRange } = require('../../utils/distance');
const { Op } = require('sequelize');
const withAuth = require('../../utils/auth');

router.get('/:user_lat/:user_lon', async (req, res) => {
	// get all landmarks in an area
	req.params.user_lat = parseFloat(req.params.user_lat);
	req.params.user_lon = parseFloat(req.params.user_lon);

	try {
		const dbLandmarkData = await Landmark.findAll({
			where: {
				[Op.and]: [
					{
						lat: {
							[Op.between]: latRange(req.params.user_lat, 5),
						},
					},
					{
						lon: {
							[Op.between]: lonRange(req.params.user_lat, req.params.user_lon, 5),
						},
					},
				],
			},
			user_lat: parseFloat(req.params.user_lat),
			user_lon: parseFloat(req.params.user_lon),
		});
		if (!dbLandmarkData) {
			res.status(404).json({ message: 'No landmarks found in this area' });
			return;
		}

		res.json(dbLandmarkData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	// get single landmark, likely for pulling up user's saved favorites?
	try {
		const dbLandmarkData = await Landmark.findByPk(req.params.id);

		dbLandmarkData ? res.json(dbLandmarkData) : res.status(404).json({ message: 'No landmark under this id' });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post('/', async (req, res) => {
	// create new landmark
	try {
		const dbLandmarkData = await Landmark.create({
			name: req.body.name,
			address: req.body.address,
			lat: req.body.lat,
			lon: req.body.lon,
			image_url: req.body.image_url,
			added_by: req.session.user_id,
		});

		res.json(dbLandmarkData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.put('/:id', async (req, res) => {
	// likely used for adding missing data, like an image or address
	try {
		const dbLandmarkData = await Landmark.update(
			{
				name: req.body.name,
				address: req.body.address,
				lat: req.body.lat,
				lon: req.body.lon,
				image_url: req.body.image_url,
				added_by: req.session.user_id,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);

		res.json(dbLandmarkData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.delete('/:id', (req, res) => {
	console.log('id', req.params.id);
	Landmark.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then(dbLandmarkData => {
			if (!dbLandmarkData) {
				res.status(404).json({ message: 'No landmark found with this id' });
				return;
			}
			res.json(dbLandmarkData);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
