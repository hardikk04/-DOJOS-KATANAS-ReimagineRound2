uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform sampler2D uDisplacmentTexture;
uniform float uOffset;

varying vec2 vUv;

void main()
{
    vec4 displacementTexture = texture2D(uDisplacmentTexture,vUv);

    float displacementForce1 = displacementTexture.r * uOffset * 1.0;
    vec2 uvDisplaced1 = vec2(vUv.x + displacementForce1, vUv.y + displacementForce1);
    vec4 displacementTexture1 = texture2D(uTexture1,uvDisplaced1);

    float displacementForce2 = displacementTexture.r * (1.0 - uOffset) * 2.0;
    vec2 uvDisplaced2 = vec2(vUv.x - displacementForce2, vUv.y - displacementForce2);
    vec4 displacementTexture2 = texture2D(uTexture2,uvDisplaced2);

    gl_FragColor = (displacementTexture1 * (1.0 - uOffset)) + (displacementTexture2 * uOffset);
}