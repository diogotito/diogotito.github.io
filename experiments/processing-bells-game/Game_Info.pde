int _text_y = 12;

void drawInfo()
{
  stroke(255);
  fill(0, 128);
  rect(0, 0, 132, 14*4);
  fill(255);
  
  displayInfo("Player y:", nfs(gameWorld.player.y, 1, 5));
  displayInfo("Player vy:", nfs(gameWorld.player.velocity_y, 1, 5));
  displayInfo("Scrolling:", nfs(scrollAmount, 1, 5));
  displayInfo("y-scroll:", nfs(gameWorld.player.y + scrollAmount, 1, 5)); 
  _text_y = 12;
  
  stroke(0);
}

void displayInfo(String title, Object value)
{
  text(title, 2, _text_y);
  text(value.toString(), 60, _text_y);
  _text_y += 12;
}