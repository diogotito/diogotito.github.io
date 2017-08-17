static final int NUM_BALLS = 50;

int score;

GameWorld gameWorld;

PImage bg;

void setup()
{
  size(540, 660);
    
  //bg = loadImage("background.jpg");
  
  gameWorld = new GameWorld(NUM_BALLS);
  
}

void draw()
{
  //imageMode(CORNER);
  //image(background, 0, 0, width, height);
  background(0);
  
  gameWorld.update();
  gameWorld.draw();

  drawInfo();
}