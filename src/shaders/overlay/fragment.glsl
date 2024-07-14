uniform sampler2D uDisplacementTexture;
uniform sampler2D uOverlayVideo;
uniform float uOffset;

varying vec2 vUv;

void main()
{
    vec4 displacementTexture = texture2D(uDisplacementTexture,vUv);
    float displacementForce = (displacementTexture.r - 0.5) * uOffset * 0.3;
    vec2 uvDisplaced = vec2(vUv.x - displacementForce, vUv.y - displacementForce);
    vec4 video = texture2D(uOverlayVideo,uvDisplaced);

    gl_FragColor = vec4(video.rbg,1.0 - uOffset);
}