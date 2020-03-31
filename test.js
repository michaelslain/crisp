// Initializing Player
const player = new GameObject();

// Adding shape to player
player.AddComponent('Renderer', { mesh: Meshes.square });

player.Components.Transform.width = 100;
player.Components.Transform.height = 100;

// Custom player controller
window.addEventListener('keydown', e => {
	const speed = 10;

	// W key
	if (e.keyCode === 87) player.Components.Transform.y -= speed;

	// A key
	if (e.keyCode === 65) player.Components.Transform.x -= speed;

	// S key
	if (e.keyCode === 83) player.Components.Transform.y += speed;

	// D key
	if (e.keyCode === 68) player.Components.Transform.x += speed;
});

const enemy = new GameObject();
enemy.AddComponent('Renderer', { mesh: Meshes.square });
enemy.Components.Transform.width = 50;
enemy.Components.Transform.height = 50;
enemy.Components.Transform.x = 500;
enemy.Components.Transform.y = 200;

gameObjects.push(player);
gameObjects.push(enemy);

Engine.renderGame();
