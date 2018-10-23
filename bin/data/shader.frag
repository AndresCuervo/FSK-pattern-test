#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_COLOR_SHADER

uniform vec2 u_resolution;
uniform vec3 u_mouse;
uniform float u_time;

// Set this to 0.5 for gray, 0.0 for black
const float base_float = 0.0;
// Set this to 1.0 to produce a black/white pattern
const float shift_amount = 0.001;
const vec4 base_color = vec4(vec3(base_float), 1.0);
const vec4 shifted_color = vec4(vec3(base_float + shift_amount), 1.0);

// This is an FSK shader, I'm attempting to replicate the gray-

void main() {
    vec2 st = gl_FragCoord.st/u_resolution;
    // Use mod across x coordinate to generate bars for the pattern
    if (mod(st.x, 0.1) < 0.05 ) {
        gl_FragColor = base_color;
    } else {
        // At very fast FPS change the color a tinyyyyy amount to change the frequency of the light signal
        if (mod(u_time, 0.002) < 0.001) {
            // Close gray bars, see if this flicker is noticeable in projected light???
            gl_FragColor = shifted_color;
        } else {
            gl_FragColor = base_color;
        }
    }
}
