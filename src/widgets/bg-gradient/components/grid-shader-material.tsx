import { shaderMaterial } from "@react-three/drei";

export const GridShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: [1, 1],
    uScaleX: 60.0,
    uScaleY: 35.0,
    uDotSize: 0.1,
    uDotColor: [0.0, 0.0, 0.0],
    uGradientColor1: [0.596, 0.522, 1.0],
    uGradientAlpha1: 1.0,
  },

  /* Vertex Shader */
  `
          void main() {
            gl_Position = vec4(position, 1.0);
          }
        `,

  /* Fragment Shader */
  `
          precision mediump float;
    
          uniform float uTime;
          uniform vec2 uResolution;
          uniform float uScaleX;
          uniform float uScaleY;
          uniform float uDotSize;
          uniform vec3 uDotColor;
          uniform vec3 uGradientColor1;
          uniform float uGradientAlpha1;
    
          float drawDots(vec2 uv) {
            vec2 grid = fract(uv * vec2(uScaleX, uScaleY));
            float d = length(grid - 0.5);
            return smoothstep(uDotSize, uDotSize * 0.5, d);
          }
    
          void main() {
            vec2 uv = gl_FragCoord.xy / uResolution.xy;
    
            vec3 bgColor = vec3(1.0, 1.0, 1.0);
    
            float baseBandHeight = 0.35;
            float waveAmplitude = 0.08;
            float waveFrequency = 5.0;
            float waveSpeed = 0.7;

            float primaryWave  = sin(uv.x * waveFrequency + uTime * waveSpeed);
            float secondaryWave = 0.4 * sin(uv.x * waveFrequency * 2.3 - uTime * waveSpeed * 1.6);
            float breathing    = 0.05 * sin(uTime * 0.7);

            float waveOffset = (primaryWave + secondaryWave) * waveAmplitude + breathing;
            float bandHeight = baseBandHeight + waveOffset;

            float t = 1.0 - smoothstep(0.0, bandHeight, uv.y);

            float tStrong = pow(t, 1.4);
    
            vec3 finalBg = mix(bgColor, uGradientColor1, tStrong * uGradientAlpha1);
    
            float dots = drawDots(uv);
    
            vec3 finalColor = mix(finalBg, uDotColor, dots * 0.1);
    
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `
);
