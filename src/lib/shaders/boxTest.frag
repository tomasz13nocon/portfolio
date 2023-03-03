uniform float scrollY;

void main() {
  gl_FragColor = vec4(sin(scrollY) * 0.4 + 0.6, cos(scrollY * 2.3) * 0.4 + 0.6, sin(scrollY * 1.6) * 0.4 + 0.6, 1.0);
}
