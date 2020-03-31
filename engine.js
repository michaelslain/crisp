const canvas = document.querySelector('canvas#game');

// Initializing game size
function gameInit() {
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
}
gameInit();

const sec = 1000;
const fps = 60;
const frame = canvas.getContext('2d');

const gameObjects = [];

// Draws each frame
function draw() {
	frame.clearRect(0, 0, canvas.width, canvas.height);

	if (gameObjects.length !== 0) {
		gameObjects.forEach(gameObject => {
			gameObject.Update();
			gameObject.draw();
		});
	}

	setTimeout(draw, sec / fps);
}

// GameObject object
class GameObject {
	constructor() {
		this.Components = {
			Transform: {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			}
		};

		this.Actor = canvas.getContext('2d');

		this.draw = () => {
			const { Components, Actor } = this;
			const { Renderer, Transform } = Components;

			if (Renderer !== undefined) Renderer.render({ Transform, Actor });
		};

		this.AddComponent = (newComponent, config) => {
			const { Components } = this;

			switch (newComponent) {
				case 'Renderer':
					addRenderer();
					break;
			}

			function addRenderer() {
				Components.Renderer = { render: config.mesh };
			}
		};

		this.Update = () => {};
	}
}

// Engine object
const Engine = {
	renderGame: () => draw()
};

// Different render types
const Meshes = {
	square: ({ Transform, Actor }) => {
		if (typeof this === 'object') {
			const { x, y, width, height } = Transform;

			Actor.beginPath();
			Actor.rect(x, y, width, height);
			Actor.fill();
		}
	}
};

window.addEventListener('resize', gameInit);
