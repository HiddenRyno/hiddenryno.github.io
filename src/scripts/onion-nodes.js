// Drawing lines between nodes
function connectNodes() {
  const canvas = document.getElementById('nodes-lines-canva');
  const onionNodes = document.querySelectorAll('.onion-nodes');
  const ctx = canvas.getContext('2d');

  canvas.width = onionNodes[0].offsetWidth;
  canvas.height = onionNodes[0].offsetHeight;

  // Get positions of nodes
  const node1 = document.querySelector('.node-1').getBoundingClientRect();
  const node2 = document.querySelector('.node-2').getBoundingClientRect();
  const node3 = document.querySelector('.node-3').getBoundingClientRect();
  const node4 = document.querySelector('.node-4').getBoundingClientRect();

  // Clear the canvas before redrawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw lines
  ctx.beginPath();
  ctx.moveTo(
    node1.x - node1.x + node1.width / 2,
    node1.y - node1.y + node1.height / 2
  );
  ctx.lineTo(
    node2.x - node1.x + node2.width / 2,
    node2.y - node1.y + node2.height / 2
  );
  ctx.lineTo(
    node3.x - node1.x + node3.width / 2,
    node3.y - node1.y + node3.height / 2
  );
  ctx.lineTo(
    node4.x - node1.x + node4.width / 2,
    node4.y - node1.y + node4.height / 2
  );

  ctx.strokeStyle = 'white';
  ctx.stroke();
}

connectNodes();

window.addEventListener('resize', connectNodes);

// Onion Image Animation
const startOnionAnimationBtn = document.getElementById(
  'startOnionAnimation-btn'
);

let currentAnimation = null;

function moveOnion(
  startNode,
  endNode,
  offsetNode,
  onionImage,
  nextImageSrc,
  callback
) {
  const startPos = startNode.getBoundingClientRect();
  const endPos = endNode.getBoundingClientRect();
  const offset = offsetNode.getBoundingClientRect();

  // Set initial position of the onion at startNode
  onionImage.style.left = `${startPos.left - offset.left - 10}px`;
  onionImage.style.top = `${startPos.top - offset.top - 10}px`;

  // Animate the onion to the endNode
  let animation = onionImage.animate(
    [
      { transform: `translate(0px, 0px)` },
      {
        transform: `translate(${endPos.left - startPos.left}px, ${
          endPos.top - startPos.top
        }px)`,
      },
    ],
    {
      duration: 2000,
      fill: 'forwards',
    }
  );

  animation.onfinish = () => {
    // Change the onion image source if provided
    if (nextImageSrc) {
      onionImage.src = nextImageSrc;
    }

    // Callback after the animation is done
    if (callback) callback();
  };

  // Return the animation object
  return animation;
}
startOnionAnimationBtn.addEventListener('click', function () {
  startOnionAnimationBtn.textContent = 'Restart Animation';
  const onionImage = document.getElementById('onionImage');
  const node1 = document.querySelector('.node-1');
  const node2 = document.querySelector('.node-2');
  const node3 = document.querySelector('.node-3');
  const node4 = document.querySelector('.node-4');

  // Cancel the current animation if it's running
  if (currentAnimation) {
    currentAnimation.cancel();
  }

  // Reset the onion image to the first one
  onionImage.src = './src/images/onions/onion1.png';

  // Start the animation sequence
  currentAnimation = moveOnion(
    node1,
    node2,
    node1,
    onionImage,
    './src/images/onions/onion2.png',
    () => {
      currentAnimation = moveOnion(
        node2,
        node3,
        node1,
        onionImage,
        './src/images/onions/onion3.png',
        () => {
          currentAnimation = moveOnion(
            node3,
            node4,
            node1,
            onionImage,
            './src/images/onions/onion4.png',
            () => {
              // Reset currentAnimation when the entire sequence is complete
              currentAnimation = null;
            }
          );
        }
      );
    }
  );
});
