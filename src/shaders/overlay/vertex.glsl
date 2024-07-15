varying vec2 vUv;

void main()
{
   gl_Position =  vec4(position, 1.0);
   gl_Position.z -= 0.9;
   // gl_Position.y += 0.2;
   vUv = uv;
}