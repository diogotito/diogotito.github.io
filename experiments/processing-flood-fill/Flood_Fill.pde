color bgColor;
color colorToFill;

ArrayList<Point> floodPoints = new ArrayList<Point>();
ArrayList<Point> newPoints;


void setup()
{
  size(500,500);
  noSmooth();
  bgColor = get(0, 0);
}

void clear() {
  background(bgColor);
}

void reset() {
  clear();
  newPoints.clear();
}

void draw()
{
  
  if (floodPoints != null)
  {
    newPoints = new ArrayList<Point>();
    for (Point point : floodPoints)
    {
      markPixel(point.x+1, point.y); // Right
      markPixel(point.x-1, point.y); // Left
      markPixel(point.x, point.y-1); // Up
      markPixel(point.x, point.y+1); // Down
    }
    /* if (newPoints.size() > 0) println(newPoints.size()); */
    floodPoints = newPoints;
  }
  
}

void markPixel(int x, int y)
{
  Point newPoint = new Point(x,y);
  if(newPoint.getColor() == colorToFill /*&& newPoints.size() < 1000*/)
  {
    newPoints.add(newPoint);
    set(newPoint.x, newPoint.y, color(0, 0, 0));
  }
}

void mouseClicked()
{
  floodPoints.add(new Point(mouseX, mouseY));
  color underMouse = get(mouseX, mouseY);
  if (underMouse != color(0, 0, 0))
  {
    colorToFill = underMouse;
  }
}

void mouseDragged()
{
  line(pmouseX, pmouseY, mouseX, mouseY);
}

