#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 palette( float t ) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263,0.416,0.557);

    return a + b*cos( 6.28318*(c*t+d) );
}

void main(){
    // [0,1]
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
   
    vec3 finalColor = vec3(0.);
    // [-0.5,0.5]
    // uv = uv-0.5;

    // [-1,1]
    uv= uv*2.0 - 1.0;

    vec2 uv0 = uv;

    // fract(x) 函数取小数部分,
    // x<0时候, fract(-1.1) = -(0.1) + 1 = 0.9。  fract(-2.3) = -(0.3) + 1 = 0.7
    // x>0时候, fract(1.1) = 0.1
    
    // uv* 2.0 =>  [-2,2]
    // fract(uv* 2.0)  => [0,1]

    for (float i = 0.0; i < 4.0; i++) {

        uv = fract(uv* 1.5) -0.5;
        // uv = uv-0.5;
        // uv= uv*2.0 - 1.0;


        float d = length(uv) * exp(-length(uv0));


        vec3 col = palette(length(uv0) + i*.4 + u_time*0.1);
        // d-=0.5;

        // d=abs(d);

        // d = step(0.1,d);

        // d = smoothstep(0.0,0.5,d);

        d = sin(d*8.0 + u_time)/8.0;
        d=abs(d);

        d = pow(0.01 / d, 1.2);

       

        finalColor += col * d;
    }
    gl_FragColor = vec4(finalColor,1.0);
}