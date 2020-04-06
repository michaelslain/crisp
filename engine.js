// Canvas that the game is rendered on
const canvas = document.querySelector('canvas#game');
// The header that displays the frameRate
const frameRateDisplay = document.querySelector('h2#frame-rate');

// Initializing game size
function gameInit() {
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
}
gameInit();

const frame = canvas.getContext('2d');
const gameObjects = [];

// Variables that have to do with time
const Time = {
	lastTime: 0,
	deltaTime: 0,
	frameRate: 60,
};

// Game loop stuff
function gameLoop(timeStamp) {
	const { lastTime } = Time;

	Time.deltaTime = timeStamp - lastTime;
	Time.lastTime = timeStamp;

	clearCanvas();
	handleFrameRateDisplay();

	gameObjects.forEach((gameObject) => {
		gameObject.Update();
		gameObject.draw();
	});

	window.requestAnimationFrame(gameLoop);
}

// Clears canvas between each frame
function clearCanvas() {
	frame.clearRect(0, 0, canvas.width, canvas.height);
}

// Changes frame rate number
function handleFrameRateDisplay() {
	const { deltaTime, frameRate } = Time;

	Time.frameRate = Math.round(1000 / deltaTime);
	frameRateDisplay.innerHTML = frameRate;
}

// Object contains engine commands
const Engine = {
	renderGame: () => gameLoop(0),
};

// Different render types
const Meshes = {
	// Renders square
	square: ({ Transform, Actor }) => {
		const { x, y, width, height } = Transform;

		Actor.beginPath();
		Actor.rect(x, y, width, height);
		Actor.fill();
	},
	// Renders circle
	circle: ({ Transform, Actor }) => {
		const { x, y, width } = Transform;

		const newX = x + width;
		const newY = y + width;

		Actor.beginPath();
		Actor.arc(newX, newY, width, 0, Math.PI * 2, true);
		Actor.fill();
	},
	// Renders triangle
	triangle: ({ Transform, Actor }) => {
		const { x, y, width, height } = Transform;

		const newHeight = height * Math.cos(Math.PI / 6);
		const newY = y + newHeight;

		Actor.beginPath();
		Actor.moveTo(x, newY);
		Actor.lineTo(x + width, newY);
		Actor.lineTo(x + width / 2, newY - newHeight);
		Actor.fill();
	},
	// Renders image
	custom: ({ Transform, Actor, image }) => {
		const { x, y, width, height } = Transform;

		Actor.drawImage(image, x, y, width, height);
	},
};

// Game object class
class GameObject {
	constructor() {
		this.Transform = {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
		};

		this.Actor = canvas.getContext('2d');

		this.Update = () => {};
	}

	draw() {
		if (this.Renderer !== undefined) {
			const { Transform, Actor, Renderer, RigidBody } = this;

			if (RigidBody !== undefined) {
				const { deltaTime } = Time;
				const { velocityX, velocityY } = RigidBody;

				Transform.x += velocityX * deltaTime;
				Transform.y += velocityY * deltaTime;
			}

			if (Renderer.render === Meshes.custom) {
				Renderer.render({
					Transform,
					Actor,
					image: Renderer.image,
				});
			} else Renderer.render({ Transform, Actor });
		}
	}

	AddComponent(newComponent, config) {
		self = this;

		switch (newComponent) {
			case 'Renderer':
				addRenderer();
				break;
			case 'RigidBody':
				addRigidBody();
				break;
		}

		function addRenderer() {
			const { sprite, path } = config;

			if (sprite !== Meshes.custom) {
				self.Renderer = { render: sprite };

				if (path !== undefined) console.warn('No need to include path object');
			} else {
				if (path === undefined) {
					console.error(
						'When using Meshes.custom, path to image must be specified'
					);
					return;
				}

				const img = new Image();
				img.src = path;

				self.Renderer = { render: sprite, image: img };
			}
		}

		function addRigidBody() {
			self.RigidBody = { velocityX: 0, velocityY: 0, gravityX: 0, gravityY: 0 };
		}

		return this;
	}

	Update() {}
}

let Scripts = {};

// Responsiveness
window.addEventListener('resize', gameInit);
