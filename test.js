for (let i = 0; i < 1000; i++) {
	function random(min, max) {
		return Math.floor(Math.random() * max + min);
	}

	function decimalRandom(min, max) {
		return Math.random() * max + min;
	}

	const square = new GameObject();
	square.Transform.width = 100;
	square.Transform.height = 100;
	square.Transform.x = random(0, canvas.width);
	square.Transform.y = random(0, canvas.height);

	square
		.AddComponent('Renderer', {
			sprite: Meshes.custom,
			path: 'images/funeticlogo.png',
		})
		.AddComponent('RigidBody');

	square.RigidBody.velocityX = decimalRandom(-1, 2);
	square.RigidBody.velocityY = decimalRandom(-1, 2);

	gameObjects.push(square);
}

Engine.renderGame();
