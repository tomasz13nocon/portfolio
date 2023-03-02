varying vec2 v_uv;

uniform sampler2D tex1;
uniform float scrollY;
uniform float t;

// void main() {
//   // gl_FragColor = vec4(abs(sin(scrollY * 0.003) * 0.9), 0.0, 0.0, 1.0);
//   // gl_FragColor = vec4(v_uv.xy, sin(t) * 0.5 + 0.5, 1.0);
//
//   float speed = t * 0.15;
//   float strength = 0.03;
//   float freq = 10.0;
//
//   // take a copy of the current texture coordinate so we can modify it
//   vec2 coord = v_uv;
//
//   // offset the coordinate by a small amount in each direction, based on wave frequency and wave strength
//   coord.x += sin((coord.x + speed) * freq) * strength;
//   coord.y += cos((coord.y + speed) * freq) * strength;
//
//   // use the color at the offset location for our new pixel color
//   gl_FragColor = texture2D(tex1, coord);
//   // gl_FragColor = vec4(coord, 0.0, 1.0);
//   // gl_FragColor = texture2D(tex1, v_uv);
// }

const float PI = 3.1415926535;

vec2 Distort(vec2 p)
{
    float theta  = atan(p.y, p.x);
    float radius = length(p);
    radius = pow(radius, 1.5);
    p.x = radius * cos(theta);
    p.y = radius * sin(theta);
    return 0.5 * (p + 1.0);
}

void main()
{
  vec2 xy = 2.0 * v_uv.xy - 1.0;
  vec2 uv;
  float d = length(xy);
  if (d < 1.0)
  {
    uv = Distort(xy);
  }
  else
  {
    uv = v_uv.xy;
  }
  vec4 c = texture2D(tex1, v_uv);
  gl_FragColor = c;
}
