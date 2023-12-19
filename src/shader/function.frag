#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st,float pct){
   return  smoothstep(pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02 , st.y);
//   return  smoothstep(pct-0.02, pct, st.y);
//   return  smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    
    float y_value = pow(st.x,5.0);
    
    vec3 color = vec3(st.x);

    float pct = plot(st,y_value);

    color = (1.0-pct)*color;

    gl_FragColor = vec4(color,1.0);
}